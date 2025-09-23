// ETL Worker Pipeline for MozaWave
// Handles data ingestion, deduplication, sentiment analysis, and entity extraction

import { PrismaClient } from '@prisma/client';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

// Initialize Redis connection for queue management
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Initialize Prisma client
const prisma = new PrismaClient();

// Queue configuration
const dataQueue = new Queue('data-processing', {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});

// Data Processing Interfaces
interface RawDataItem {
  id: string;
  source: 'google' | 'yelp' | 'twitter' | 'news' | 'competitor_website';
  type: 'review' | 'mention' | 'price_change' | 'new_service' | 'ad_campaign';
  content: string;
  metadata: {
    author?: string;
    rating?: number;
    timestamp: string;
    url?: string;
    location?: string;
    businessId?: string;
    competitorId?: string;
  };
  tenantId: string;
  rawData: any;
}

interface ProcessedDataItem extends RawDataItem {
  sentiment: {
    score: number; // -1 to 1
    magnitude: number; // 0 to 1
    label: 'positive' | 'negative' | 'neutral';
  };
  entities: {
    type: string;
    value: string;
    confidence: number;
  }[];
  normalizedTimestamp: Date;
  deduplicationHash: string;
  insights: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

// Sentiment Analysis Adapter (pluggable for local models or managed APIs)
interface SentimentAnalyzer {
  analyze(text: string): Promise<{
    score: number;
    magnitude: number;
    label: 'positive' | 'negative' | 'neutral';
  }>;
}

// Google Cloud Natural Language API implementation
class GoogleSentimentAnalyzer implements SentimentAnalyzer {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_CLOUD_API_KEY!;
  }

  async analyze(text: string): Promise<{
    score: number;
    magnitude: number;
    label: 'positive' | 'negative' | 'neutral';
  }> {
    try {
      const response = await fetch(
        `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            document: {
              type: 'PLAIN_TEXT',
              content: text,
            },
            encodingType: 'UTF8',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Sentiment analysis failed: ${response.statusText}`);
      }

      const data = await response.json();
      const sentiment = data.documentSentiment;

      return {
        score: sentiment.score,
        magnitude: sentiment.magnitude,
        label: sentiment.score > 0.1 ? 'positive' : 
               sentiment.score < -0.1 ? 'negative' : 'neutral',
      };
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      // Fallback to neutral sentiment
      return {
        score: 0,
        magnitude: 0,
        label: 'neutral',
      };
    }
  }
}

// Entity Extraction Adapter
interface EntityExtractor {
  extract(text: string): Promise<{
    type: string;
    value: string;
    confidence: number;
  }[]>;
}

class GoogleEntityExtractor implements EntityExtractor {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_CLOUD_API_KEY!;
  }

  async extract(text: string): Promise<{
    type: string;
    value: string;
    confidence: number;
  }[]> {
    try {
      const response = await fetch(
        `https://language.googleapis.com/v1/documents:analyzeEntities?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            document: {
              type: 'PLAIN_TEXT',
              content: text,
            },
            encodingType: 'UTF8',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Entity extraction failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.entities.map((entity: any) => ({
        type: entity.type,
        value: entity.name,
        confidence: entity.salience,
      }));
    } catch (error) {
      console.error('Entity extraction error:', error);
      return [];
    }
  }
}

// ETL Pipeline Processor
export class ETLPipeline {
  private sentimentAnalyzer: SentimentAnalyzer;
  private entityExtractor: EntityExtractor;

  constructor() {
    // Initialize analyzers (can be swapped for different providers)
    this.sentimentAnalyzer = new GoogleSentimentAnalyzer();
    this.entityExtractor = new GoogleEntityExtractor();
  }

  // Main processing function
  async processDataItem(item: RawDataItem): Promise<ProcessedDataItem> {
    try {
      // 1. Deduplication check
      const deduplicationHash = await this.generateDeduplicationHash(item);
      const existing = await this.checkForDuplicates(deduplicationHash, item.tenantId);
      
      if (existing) {
        console.log('Duplicate data item found, skipping:', item.id);
        throw new Error('Duplicate data item');
      }

      // 2. Timestamp normalization
      const normalizedTimestamp = this.normalizeTimestamp(item.metadata.timestamp);

      // 3. Sentiment analysis
      const sentiment = await this.sentimentAnalyzer.analyze(item.content);

      // 4. Entity extraction
      const entities = await this.entityExtractor.extract(item.content);

      // 5. Insight generation
      const insights = await this.generateInsights(item, sentiment, entities);

      // 6. Priority calculation
      const priority = this.calculatePriority(item, sentiment, insights);

      const processedItem: ProcessedDataItem = {
        ...item,
        sentiment,
        entities,
        normalizedTimestamp,
        deduplicationHash,
        insights,
        priority,
      };

      // 7. Store processed data
      await this.storeProcessedData(processedItem);

      return processedItem;
    } catch (error) {
      console.error('ETL processing error:', error);
      throw error;
    }
  }

  // Generate deduplication hash
  private async generateDeduplicationHash(item: RawDataItem): Promise<string> {
    const crypto = await import('crypto');
    const hashContent = `${item.source}-${item.type}-${item.content}-${item.metadata.businessId || item.metadata.competitorId}`;
    return crypto.createHash('sha256').update(hashContent).digest('hex');
  }

  // Check for duplicates
  private async checkForDuplicates(hash: string, tenantId: string): Promise<boolean> {
    const existing = await prisma.processedData.findFirst({
      where: {
        deduplicationHash: hash,
        tenantId, // Tenant isolation
      },
    });
    return !!existing;
  }

  // Normalize timestamp
  private normalizeTimestamp(timestamp: string): Date {
    try {
      return new Date(timestamp);
    } catch (error) {
      console.warn('Invalid timestamp, using current time:', timestamp);
      return new Date();
    }
  }

  // Generate insights from data
  private async generateInsights(
    item: RawDataItem,
    sentiment: any,
    entities: any[]
  ): Promise<string[]> {
    const insights: string[] = [];

    // Sentiment-based insights
    if (sentiment.label === 'negative' && sentiment.magnitude > 0.5) {
      insights.push('High negative sentiment detected - immediate attention required');
    } else if (sentiment.label === 'positive' && sentiment.magnitude > 0.5) {
      insights.push('Strong positive sentiment - potential marketing opportunity');
    }

    // Entity-based insights
    const competitorEntities = entities.filter(e => 
      e.type === 'ORGANIZATION' && e.confidence > 0.7
    );
    if (competitorEntities.length > 0) {
      insights.push(`Competitor mentions detected: ${competitorEntities.map(e => e.value).join(', ')}`);
    }

    // Type-specific insights
    if (item.type === 'price_change') {
      insights.push('Competitor pricing change detected - market analysis recommended');
    } else if (item.type === 'new_service') {
      insights.push('New competitor service launched - competitive analysis required');
    }

    return insights;
  }

  // Calculate priority based on various factors
  private calculatePriority(
    item: RawDataItem,
    sentiment: any,
    insights: string[]
  ): 'low' | 'medium' | 'high' | 'critical' {
    let score = 0;

    // Sentiment impact
    if (sentiment.magnitude > 0.8) score += 2;
    else if (sentiment.magnitude > 0.5) score += 1;

    // Type impact
    if (item.type === 'price_change') score += 2;
    else if (item.type === 'new_service') score += 1;

    // Insight impact
    if (insights.some(i => i.includes('immediate attention'))) score += 3;
    else if (insights.some(i => i.includes('recommended'))) score += 1;

    // Source reliability
    if (item.source === 'google' || item.source === 'yelp') score += 1;

    if (score >= 5) return 'critical';
    if (score >= 3) return 'high';
    if (score >= 1) return 'medium';
    return 'low';
  }

  // Store processed data securely
  private async storeProcessedData(item: ProcessedDataItem): Promise<void> {
    try {
      await prisma.processedData.create({
        data: {
          id: item.id,
          source: item.source,
          type: item.type,
          content: item.content,
          metadata: item.metadata,
          tenantId: item.tenantId, // CRITICAL: Tenant isolation
          rawData: item.rawData,
          sentiment: item.sentiment,
          entities: item.entities,
          normalizedTimestamp: item.normalizedTimestamp,
          deduplicationHash: item.deduplicationHash,
          insights: item.insights,
          priority: item.priority,
          processedAt: new Date(),
        },
      });

      // Trigger real-time notifications for high-priority items
      if (item.priority === 'critical' || item.priority === 'high') {
        await this.triggerNotification(item);
      }
    } catch (error) {
      console.error('Failed to store processed data:', error);
      throw error;
    }
  }

  // Trigger notifications for high-priority items
  private async triggerNotification(item: ProcessedDataItem): Promise<void> {
    // TODO: Implement notification system (email, Slack, etc.)
    console.log('High priority alert:', {
      tenantId: item.tenantId,
      priority: item.priority,
      insights: item.insights,
    });
  }

  // Queue management
  async addToQueue(data: RawDataItem[]): Promise<void> {
    for (const item of data) {
      await dataQueue.add('process-data', item, {
        priority: this.getQueuePriority(item),
      });
    }
  }

  private getQueuePriority(item: RawDataItem): number {
    // Higher priority for real-time sources
    if (item.source === 'twitter' || item.source === 'news') return 10;
    if (item.source === 'google' || item.source === 'yelp') return 5;
    return 1;
  }

  // Start queue processing
  async startProcessing(): Promise<void> {
    dataQueue.process('process-data', async (job) => {
      const item = job.data as RawDataItem;
      return await this.processDataItem(item);
    });

    console.log('ETL Pipeline started - processing queue...');
  }

  // Graceful shutdown
  async shutdown(): Promise<void> {
    await dataQueue.close();
    await redis.quit();
    await prisma.$disconnect();
  }
}

// Export singleton instance
export const etlPipeline = new ETLPipeline();
