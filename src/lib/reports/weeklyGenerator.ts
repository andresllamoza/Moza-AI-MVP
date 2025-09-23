// Weekly Report Generator for MozaWave
// Tenant-scoped data fetching, insights ranking, PDF generation, and email delivery

import { PrismaClient } from '@prisma/client';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Initialize Prisma client
const prisma = new PrismaClient();

// Report Configuration
interface ReportConfig {
  tenantId: string;
  weekStart: Date;
  weekEnd: Date;
  recipientEmail: string;
  includeCharts: boolean;
  includeCompetitorAnalysis: boolean;
  includeSentimentAnalysis: boolean;
  includeRecommendations: boolean;
}

// Report Data Interfaces
interface CompetitorInsight {
  competitorName: string;
  priceChanges: number;
  newServices: number;
  adCampaigns: number;
  marketShare: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

interface SentimentTrend {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

interface BusinessMetric {
  metric: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  trend: 'up' | 'down' | 'flat';
  significance: 'high' | 'medium' | 'low';
}

interface WeeklyReport {
  tenantId: string;
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalInsights: number;
    criticalAlerts: number;
    competitorChanges: number;
    sentimentScore: number;
  };
  competitorAnalysis: CompetitorInsight[];
  sentimentTrends: SentimentTrend[];
  businessMetrics: BusinessMetric[];
  topInsights: string[];
  recommendations: string[];
  generatedAt: Date;
}

export class WeeklyReportGenerator {
  private config: ReportConfig;

  constructor(config: ReportConfig) {
    this.config = config;
  }

  // Main report generation function
  async generateReport(): Promise<WeeklyReport> {
    try {
      console.log(`Generating weekly report for tenant: ${this.config.tenantId}`);

      // 1. Fetch tenant-scoped data
      const [
        competitorData,
        sentimentData,
        businessMetrics,
        insights
      ] = await Promise.all([
        this.fetchCompetitorData(),
        this.fetchSentimentData(),
        this.fetchBusinessMetrics(),
        this.fetchTopInsights()
      ]);

      // 2. Process and rank insights
      const rankedInsights = this.rankInsights(insights);
      const recommendations = this.generateRecommendations(
        competitorData,
        sentimentData,
        businessMetrics
      );

      // 3. Calculate summary metrics
      const summary = this.calculateSummary(
        competitorData,
        sentimentData,
        insights
      );

      // 4. Build report object
      const report: WeeklyReport = {
        tenantId: this.config.tenantId,
        period: {
          start: this.config.weekStart,
          end: this.config.weekEnd,
        },
        summary,
        competitorAnalysis: competitorData,
        sentimentTrends: sentimentData,
        businessMetrics,
        topInsights: rankedInsights,
        recommendations,
        generatedAt: new Date(),
      };

      // 5. Generate PDF if requested
      if (this.config.includeCharts) {
        await this.generatePDFReport(report);
      }

      // 6. Send email notification
      await this.sendEmailReport(report);

      // 7. Store report in database
      await this.storeReport(report);

      return report;
    } catch (error) {
      console.error('Report generation error:', error);
      throw error;
    }
  }

  // Fetch competitor analysis data
  private async fetchCompetitorData(): Promise<CompetitorInsight[]> {
    const competitors = await prisma.competitor.findMany({
      where: {
        tenantId: this.config.tenantId,
        trackingEnabled: true,
        deletedAt: null,
      },
      include: {
        dataPoints: {
          where: {
            createdAt: {
              gte: this.config.weekStart,
              lte: this.config.weekEnd,
            },
          },
        },
      },
    });

    return competitors.map(competitor => {
      const priceChanges = competitor.dataPoints.filter(
        dp => dp.type === 'price_change'
      ).length;
      
      const newServices = competitor.dataPoints.filter(
        dp => dp.type === 'new_service'
      ).length;
      
      const adCampaigns = competitor.dataPoints.filter(
        dp => dp.type === 'ad_campaign'
      ).length;

      const threatLevel = this.calculateThreatLevel(
        priceChanges,
        newServices,
        adCampaigns
      );

      return {
        competitorName: competitor.name,
        priceChanges,
        newServices,
        adCampaigns,
        marketShare: competitor.marketShare || 0,
        threatLevel,
        recommendations: this.generateCompetitorRecommendations(
          competitor,
          priceChanges,
          newServices,
          adCampaigns
        ),
      };
    });
  }

  // Fetch sentiment trend data
  private async fetchSentimentData(): Promise<SentimentTrend[]> {
    const sentimentData = await prisma.processedData.findMany({
      where: {
        tenantId: this.config.tenantId,
        type: 'review',
        normalizedTimestamp: {
          gte: this.config.weekStart,
          lte: this.config.weekEnd,
        },
      },
      select: {
        normalizedTimestamp: true,
        sentiment: true,
      },
    });

    // Group by date and calculate sentiment distribution
    const dailySentiment = new Map<string, { positive: number; negative: number; neutral: number; total: number }>();

    sentimentData.forEach(item => {
      const date = item.normalizedTimestamp.toISOString().split('T')[0];
      if (!dailySentiment.has(date)) {
        dailySentiment.set(date, { positive: 0, negative: 0, neutral: 0, total: 0 });
      }
      
      const dayData = dailySentiment.get(date)!;
      dayData.total++;
      
      switch (item.sentiment.label) {
        case 'positive':
          dayData.positive++;
          break;
        case 'negative':
          dayData.negative++;
          break;
        case 'neutral':
          dayData.neutral++;
          break;
      }
    });

    return Array.from(dailySentiment.entries())
      .map(([date, sentiment]) => ({
        date,
        ...sentiment,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // Fetch business metrics
  private async fetchBusinessMetrics(): Promise<BusinessMetric[]> {
    // This would typically come from your business intelligence system
    // For now, we'll generate sample metrics based on available data
    
    const totalReviews = await prisma.processedData.count({
      where: {
        tenantId: this.config.tenantId,
        type: 'review',
        normalizedTimestamp: {
          gte: this.config.weekStart,
          lte: this.config.weekEnd,
        },
      },
    });

    const avgSentiment = await prisma.processedData.aggregate({
      where: {
        tenantId: this.config.tenantId,
        type: 'review',
        normalizedTimestamp: {
          gte: this.config.weekStart,
          lte: this.config.weekEnd,
        },
      },
      _avg: {
        sentimentScore: true,
      },
    });

    const competitorMentions = await prisma.processedData.count({
      where: {
        tenantId: this.config.tenantId,
        entities: {
          path: '$[*].type',
          equals: 'ORGANIZATION',
        },
        normalizedTimestamp: {
          gte: this.config.weekStart,
          lte: this.config.weekEnd,
        },
      },
    });

    return [
      {
        metric: 'Total Reviews',
        value: totalReviews,
        change: 12, // This would be calculated vs previous week
        changeType: 'increase',
        trend: 'up',
        significance: 'high',
      },
      {
        metric: 'Average Sentiment Score',
        value: avgSentiment._avg.sentimentScore || 0,
        change: 0.1,
        changeType: 'increase',
        trend: 'up',
        significance: 'medium',
      },
      {
        metric: 'Competitor Mentions',
        value: competitorMentions,
        change: -5,
        changeType: 'decrease',
        trend: 'down',
        significance: 'low',
      },
    ];
  }

  // Fetch top insights
  private async fetchTopInsights(): Promise<string[]> {
    const insights = await prisma.processedData.findMany({
      where: {
        tenantId: this.config.tenantId,
        normalizedTimestamp: {
          gte: this.config.weekStart,
          lte: this.config.weekEnd,
        },
        insights: {
          not: [],
        },
      },
      select: {
        insights: true,
        priority: true,
        source: true,
        type: true,
      },
      orderBy: {
        priority: 'desc',
      },
      take: 50,
    });

    return insights.flatMap(item => item.insights);
  }

  // Rank insights by importance
  private rankInsights(insights: string[]): string[] {
    // Simple ranking based on keywords and frequency
    const keywordWeights = {
      'critical': 10,
      'urgent': 8,
      'important': 6,
      'opportunity': 5,
      'threat': 7,
      'recommendation': 4,
    };

    const rankedInsights = insights.map(insight => ({
      text: insight,
      score: Object.entries(keywordWeights).reduce(
        (score, [keyword, weight]) => 
          insight.toLowerCase().includes(keyword) ? score + weight : score,
        0
      ),
    }));

    return rankedInsights
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(item => item.text);
  }

  // Generate business recommendations
  private generateRecommendations(
    competitors: CompetitorInsight[],
    sentiment: SentimentTrend[],
    metrics: BusinessMetric[]
  ): string[] {
    const recommendations: string[] = [];

    // Competitor-based recommendations
    const highThreatCompetitors = competitors.filter(c => c.threatLevel === 'high' || c.threatLevel === 'critical');
    if (highThreatCompetitors.length > 0) {
      recommendations.push(
        `Monitor ${highThreatCompetitors.map(c => c.name).join(', ')} closely - they show high competitive activity`
      );
    }

    // Sentiment-based recommendations
    const avgSentiment = sentiment.reduce((sum, day) => sum + (day.positive - day.negative) / day.total, 0) / sentiment.length;
    if (avgSentiment < -0.2) {
      recommendations.push('Negative sentiment trend detected - consider reputation management strategy');
    } else if (avgSentiment > 0.2) {
      recommendations.push('Positive sentiment trend - leverage for marketing and customer acquisition');
    }

    // Metric-based recommendations
    const reviewMetric = metrics.find(m => m.metric === 'Total Reviews');
    if (reviewMetric && reviewMetric.changeType === 'increase') {
      recommendations.push('Review volume increasing - ensure timely response to maintain engagement');
    }

    return recommendations;
  }

  // Calculate summary metrics
  private calculateSummary(
    competitors: CompetitorInsight[],
    sentiment: SentimentTrend[],
    insights: string[]
  ) {
    return {
      totalInsights: insights.length,
      criticalAlerts: insights.filter(i => i.toLowerCase().includes('critical')).length,
      competitorChanges: competitors.reduce((sum, c) => sum + c.priceChanges + c.newServices + c.adCampaigns, 0),
      sentimentScore: sentiment.length > 0 
        ? sentiment.reduce((sum, day) => sum + (day.positive - day.negative) / day.total, 0) / sentiment.length
        : 0,
    };
  }

  // Generate PDF report
  private async generatePDFReport(report: WeeklyReport): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Standard letter size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let yPosition = 750;

    // Title
    page.drawText('MozaWave Weekly Intelligence Report', {
      x: 50,
      y: yPosition,
      size: 24,
      font: boldFont,
      color: rgb(0, 0.4, 0.8),
    });
    yPosition -= 40;

    // Period
    page.drawText(`Report Period: ${report.period.start.toLocaleDateString()} - ${report.period.end.toLocaleDateString()}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
    });
    yPosition -= 30;

    // Summary
    page.drawText('Executive Summary', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
    });
    yPosition -= 25;

    page.drawText(`• Total Insights: ${report.summary.totalInsights}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: font,
    });
    yPosition -= 20;

    page.drawText(`• Critical Alerts: ${report.summary.criticalAlerts}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: font,
    });
    yPosition -= 20;

    page.drawText(`• Competitor Changes: ${report.summary.competitorChanges}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: font,
    });
    yPosition -= 30;

    // Top Insights
    page.drawText('Key Insights', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
    });
    yPosition -= 25;

    report.topInsights.slice(0, 5).forEach(insight => {
      page.drawText(`• ${insight}`, {
        x: 70,
        y: yPosition,
        size: 10,
        font: font,
      });
      yPosition -= 15;
    });

    yPosition -= 20;

    // Recommendations
    page.drawText('Recommendations', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
    });
    yPosition -= 25;

    report.recommendations.forEach(rec => {
      page.drawText(`• ${rec}`, {
        x: 70,
        y: yPosition,
        size: 10,
        font: font,
      });
      yPosition -= 15;
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  // Send email report
  private async sendEmailReport(report: WeeklyReport): Promise<void> {
    // TODO: Implement email delivery using SES, SendGrid, or similar
    console.log('Sending weekly report email to:', this.config.recipientEmail);
    console.log('Report summary:', report.summary);
  }

  // Store report in database
  private async storeReport(report: WeeklyReport): Promise<void> {
    await prisma.weeklyReport.create({
      data: {
        tenantId: report.tenantId,
        periodStart: report.period.start,
        periodEnd: report.period.end,
        summary: report.summary,
        competitorAnalysis: report.competitorAnalysis,
        sentimentTrends: report.sentimentTrends,
        businessMetrics: report.businessMetrics,
        topInsights: report.topInsights,
        recommendations: report.recommendations,
        generatedAt: report.generatedAt,
      },
    });
  }

  // Helper methods
  private calculateThreatLevel(
    priceChanges: number,
    newServices: number,
    adCampaigns: number
  ): 'low' | 'medium' | 'high' | 'critical' {
    const totalActivity = priceChanges + newServices + adCampaigns;
    
    if (totalActivity >= 10) return 'critical';
    if (totalActivity >= 5) return 'high';
    if (totalActivity >= 2) return 'medium';
    return 'low';
  }

  private generateCompetitorRecommendations(
    competitor: any,
    priceChanges: number,
    newServices: number,
    adCampaigns: number
  ): string[] {
    const recommendations: string[] = [];

    if (priceChanges > 0) {
      recommendations.push(`Monitor ${competitor.name}'s pricing strategy - ${priceChanges} changes detected`);
    }

    if (newServices > 0) {
      recommendations.push(`Analyze ${competitor.name}'s new services - ${newServices} launches detected`);
    }

    if (adCampaigns > 0) {
      recommendations.push(`Review ${competitor.name}'s marketing campaigns - ${adCampaigns} active campaigns`);
    }

    return recommendations;
  }
}

// Scheduled report generation
export async function generateWeeklyReports(): Promise<void> {
  const tenants = await prisma.tenant.findMany({
    where: {
      weeklyReportsEnabled: true,
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      contactEmail: true,
    },
  });

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weekEnd = new Date();

  for (const tenant of tenants) {
    try {
      const generator = new WeeklyReportGenerator({
        tenantId: tenant.id,
        weekStart,
        weekEnd,
        recipientEmail: tenant.contactEmail,
        includeCharts: true,
        includeCompetitorAnalysis: true,
        includeSentimentAnalysis: true,
        includeRecommendations: true,
      });

      await generator.generateReport();
      console.log(`Weekly report generated for tenant: ${tenant.name}`);
    } catch (error) {
      console.error(`Failed to generate report for tenant ${tenant.name}:`, error);
    }
  }
}
