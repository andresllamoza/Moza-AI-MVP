import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Competitor,
  CompetitorComplaint,
  CompetitorProductLaunch,
  MarketingTrend,
  PricingIntelligence,
  MarketOpportunity,
  CompetitiveThreat,
  IntelligenceInsight,
  MarketBenchmark,
  StrategicRecommendation,
  CompetitiveIntelligenceDashboard,
  DualIntelligenceInsight,
  CompetitiveFilter,
  MarketOpportunityFilter
} from '@/types/competitiveIntelligence';
import {
  Customer,
  CustomerInteraction,
  Complaint,
  Review,
  RevenueIntelligence,
  DashboardMetrics
} from '@/types/moza-intelligence';

interface DualIntelligenceState {
  // Internal Intelligence Data
  customers: Customer[];
  interactions: CustomerInteraction[];
  complaints: Complaint[];
  reviews: Review[];
  revenueIntelligence: RevenueIntelligence[];
  internalMetrics: DashboardMetrics | null;
  
  // External Intelligence Data
  competitors: Competitor[];
  competitorComplaints: CompetitorComplaint[];
  competitorProductLaunches: CompetitorProductLaunch[];
  marketingTrends: MarketingTrend[];
  pricingIntelligence: PricingIntelligence[];
  marketOpportunities: MarketOpportunity[];
  competitiveThreats: CompetitiveThreat[];
  intelligenceInsights: IntelligenceInsight[];
  marketBenchmarks: MarketBenchmark[];
  strategicRecommendations: StrategicRecommendation[];
  dualIntelligenceInsights: DualIntelligenceInsight[];
  competitiveDashboard: CompetitiveIntelligenceDashboard | null;
  
  // UI State
  selectedCompetitor: Competitor | null;
  selectedOpportunity: MarketOpportunity | null;
  selectedThreat: CompetitiveThreat | null;
  selectedInsight: DualIntelligenceInsight | null;
  
  // Filters
  competitiveFilter: CompetitiveFilter;
  opportunityFilter: MarketOpportunityFilter;
  
  // View State
  currentView: 'overview' | 'competitive' | 'opportunities' | 'threats' | 'insights' | 'strategy';
  sidebarOpen: boolean;
  loading: boolean;
  
  // Actions - Internal Data Management
  setInternalData: (data: {
    customers: Customer[];
    interactions: CustomerInteraction[];
    complaints: Complaint[];
    reviews: Review[];
    revenueIntelligence: RevenueIntelligence[];
    metrics: DashboardMetrics;
  }) => void;
  
  // Actions - External Data Management
  setExternalData: (data: {
    competitors: Competitor[];
    competitorComplaints: CompetitorComplaint[];
    competitorProductLaunches: CompetitorProductLaunch[];
    marketingTrends: MarketingTrend[];
    pricingIntelligence: PricingIntelligence[];
    marketOpportunities: MarketOpportunity[];
    competitiveThreats: CompetitiveThreat[];
    intelligenceInsights: IntelligenceInsight[];
    marketBenchmarks: MarketBenchmark[];
    strategicRecommendations: StrategicRecommendation[];
    dualIntelligenceInsights: DualIntelligenceInsight[];
    dashboard: CompetitiveIntelligenceDashboard;
  }) => void;
  
  // Actions - Selection
  selectCompetitor: (competitor: Competitor | null) => void;
  selectOpportunity: (opportunity: MarketOpportunity | null) => void;
  selectThreat: (threat: CompetitiveThreat | null) => void;
  selectInsight: (insight: DualIntelligenceInsight | null) => void;
  
  // Actions - Filtering
  setCompetitiveFilter: (filter: Partial<CompetitiveFilter>) => void;
  setOpportunityFilter: (filter: Partial<MarketOpportunityFilter>) => void;
  clearFilters: () => void;
  
  // Actions - View Management
  setCurrentView: (view: 'overview' | 'competitive' | 'opportunities' | 'threats' | 'insights' | 'strategy') => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  
  // Computed Properties - Filtered Data
  getFilteredCompetitors: () => Competitor[];
  getFilteredOpportunities: () => MarketOpportunity[];
  getFilteredThreats: () => CompetitiveThreat[];
  getFilteredInsights: () => DualIntelligenceInsight[];
  
  // Computed Properties - Intelligence Analysis
  getCompetitiveAdvantages: () => string[];
  getMarketGaps: () => MarketOpportunity[];
  getHighPriorityThreats: () => CompetitiveThreat[];
  getRevenueOpportunities: () => DualIntelligenceInsight[];
  getStrategicRecommendations: () => StrategicRecommendation[];
  
  // Computed Properties - Dual Intelligence
  getDualIntelligenceInsights: () => DualIntelligenceInsight[];
  getCompetitivePositioning: () => {
    ourStrengths: string[];
    competitorWeaknesses: string[];
    marketOpportunities: string[];
    threats: string[];
  };
  getRevenueOptimizationOpportunities: () => {
    internal: string[];
    competitive: string[];
    combined: string[];
  };
  
  // Analytics
  getMarketTrendAnalysis: () => {
    trendingUp: MarketingTrend[];
    trendingDown: MarketingTrend[];
    emerging: MarketingTrend[];
  };
  getCompetitiveThreatAnalysis: () => {
    immediate: CompetitiveThreat[];
    mediumTerm: CompetitiveThreat[];
    longTerm: CompetitiveThreat[];
  };
  getOpportunityAnalysis: () => {
    quickWins: MarketOpportunity[];
    strategic: MarketOpportunity[];
    longTerm: MarketOpportunity[];
  };
  
  // Intelligence Generation
  generateDualIntelligenceInsights: () => void;
  updateCompetitivePositioning: () => void;
  analyzeMarketOpportunities: () => void;
  assessCompetitiveThreats: () => void;
}

export const useDualIntelligenceStore = create<DualIntelligenceState>()(
  persist(
    (set, get) => ({
      // Initial state
      customers: [],
      interactions: [],
      complaints: [],
      reviews: [],
      revenueIntelligence: [],
      internalMetrics: null,
      
      competitors: [],
      competitorComplaints: [],
      competitorProductLaunches: [],
      marketingTrends: [],
      pricingIntelligence: [],
      marketOpportunities: [],
      competitiveThreats: [],
      intelligenceInsights: [],
      marketBenchmarks: [],
      strategicRecommendations: [],
      dualIntelligenceInsights: [],
      competitiveDashboard: null,
      
      selectedCompetitor: null,
      selectedOpportunity: null,
      selectedThreat: null,
      selectedInsight: null,
      
      competitiveFilter: {},
      opportunityFilter: {},
      
      currentView: 'overview',
      sidebarOpen: true,
      loading: false,
      
      // Internal Data Management
      setInternalData: (data) => set({
        customers: data.customers,
        interactions: data.interactions,
        complaints: data.complaints,
        reviews: data.reviews,
        revenueIntelligence: data.revenueIntelligence,
        internalMetrics: data.metrics
      }),
      
      // External Data Management
      setExternalData: (data) => set({
        competitors: data.competitors,
        competitorComplaints: data.competitorComplaints,
        competitorProductLaunches: data.competitorProductLaunches,
        marketingTrends: data.marketingTrends,
        pricingIntelligence: data.pricingIntelligence,
        marketOpportunities: data.marketOpportunities,
        competitiveThreats: data.competitiveThreats,
        intelligenceInsights: data.intelligenceInsights,
        marketBenchmarks: data.marketBenchmarks,
        strategicRecommendations: data.strategicRecommendations,
        dualIntelligenceInsights: data.dualIntelligenceInsights,
        competitiveDashboard: data.dashboard
      }),
      
      // Selection Actions
      selectCompetitor: (competitor) => set({ selectedCompetitor: competitor }),
      selectOpportunity: (opportunity) => set({ selectedOpportunity: opportunity }),
      selectThreat: (threat) => set({ selectedThreat: threat }),
      selectInsight: (insight) => set({ selectedInsight: insight }),
      
      // Filter Actions
      setCompetitiveFilter: (filter) => set((state) => ({
        competitiveFilter: { ...state.competitiveFilter, ...filter }
      })),
      setOpportunityFilter: (filter) => set((state) => ({
        opportunityFilter: { ...state.opportunityFilter, ...filter }
      })),
      clearFilters: () => set({
        competitiveFilter: {},
        opportunityFilter: {}
      }),
      
      // View Management
      setCurrentView: (view) => set({ currentView: view }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setLoading: (loading) => set({ loading }),
      
      // Computed Properties - Filtered Data
      getFilteredCompetitors: () => {
        const { competitors, competitiveFilter } = get();
        let filtered = [...competitors];
        
        if (competitiveFilter.threatLevel) {
          filtered = filtered.filter(c => c.threatLevel === competitiveFilter.threatLevel);
        }
        
        if (competitiveFilter.dateRange) {
          filtered = filtered.filter(c => 
            c.lastUpdated >= competitiveFilter.dateRange!.start &&
            c.lastUpdated <= competitiveFilter.dateRange!.end
          );
        }
        
        return filtered;
      },
      
      getFilteredOpportunities: () => {
        const { marketOpportunities, opportunityFilter } = get();
        let filtered = [...marketOpportunities];
        
        if (opportunityFilter.category) {
          filtered = filtered.filter(o => o.category === opportunityFilter.category);
        }
        
        if (opportunityFilter.opportunityScore) {
          filtered = filtered.filter(o => 
            o.opportunityScore >= opportunityFilter.opportunityScore!.min &&
            o.opportunityScore <= opportunityFilter.opportunityScore!.max
          );
        }
        
        if (opportunityFilter.marketSize) {
          filtered = filtered.filter(o => o.marketSize === opportunityFilter.marketSize);
        }
        
        if (opportunityFilter.competitionLevel) {
          filtered = filtered.filter(o => o.competitionLevel === opportunityFilter.competitionLevel);
        }
        
        if (opportunityFilter.status) {
          filtered = filtered.filter(o => o.status === opportunityFilter.status);
        }
        
        return filtered.sort((a, b) => b.opportunityScore - a.opportunityScore);
      },
      
      getFilteredThreats: () => {
        const { competitiveThreats } = get();
        return competitiveThreats
          .filter(t => t.status !== 'resolved')
          .sort((a, b) => {
            const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
          });
      },
      
      getFilteredInsights: () => {
        const { dualIntelligenceInsights } = get();
        return dualIntelligenceInsights
          .filter(i => i.status !== 'completed')
          .sort((a, b) => {
            const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          });
      },
      
      // Computed Properties - Intelligence Analysis
      getCompetitiveAdvantages: () => {
        const { marketBenchmarks, competitors } = get();
        const advantages = [];
        
        // Find metrics where we outperform industry average
        marketBenchmarks.forEach(benchmark => {
          if (benchmark.ourValue > benchmark.industryAverage) {
            advantages.push(`${benchmark.metric}: ${benchmark.ourValue} vs ${benchmark.industryAverage} industry average`);
          }
        });
        
        // Find competitor weaknesses
        competitors.forEach(competitor => {
          if (competitor.weaknesses.length > 0) {
            advantages.push(`${competitor.name} weaknesses: ${competitor.weaknesses.join(', ')}`);
          }
        });
        
        return advantages;
      },
      
      getMarketGaps: () => {
        const { marketOpportunities = [] } = get();
        return marketOpportunities
          .filter(o => o.competitionLevel === 'low' && o.opportunityScore > 80)
          .sort((a, b) => b.opportunityScore - a.opportunityScore);
      },
      
      getHighPriorityThreats: () => {
        const { competitiveThreats } = get();
        return competitiveThreats
          .filter(t => t.severity === 'high' || t.severity === 'critical')
          .sort((a, b) => {
            const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
          });
      },
      
      getRevenueOpportunities: () => {
        const { dualIntelligenceInsights } = get();
        return dualIntelligenceInsights
          .filter(i => i.internalData.revenueImpact > 100000)
          .sort((a, b) => b.internalData.revenueImpact - a.internalData.revenueImpact);
      },
      
      getStrategicRecommendations: () => {
        const { strategicRecommendations } = get();
        return strategicRecommendations
          .filter(r => r.status === 'draft' || r.status === 'approved')
          .sort((a, b) => {
            const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          });
      },
      
      // Computed Properties - Dual Intelligence
      getDualIntelligenceInsights: () => {
        const { dualIntelligenceInsights } = get();
        return dualIntelligenceInsights
          .filter(i => i.status !== 'completed')
          .sort((a, b) => b.confidence - a.confidence);
      },
      
      getCompetitivePositioning: () => {
        const { marketBenchmarks = [], competitors = [], marketOpportunities = [] } = get();
        
        const ourStrengths = marketBenchmarks
          .filter(b => b.ourValue > b.industryAverage)
          .map(b => b.metric);
        
        const competitorWeaknesses = competitors
          .flatMap(c => c.weaknesses)
          .filter((weakness, index, arr) => arr.indexOf(weakness) === index);
        
        const highValueOpportunities = marketOpportunities
          .filter(o => o.opportunityScore > 80)
          .map(o => o.title);
        
        const threats = get().getHighPriorityThreats().map(t => t.title);
        
        return {
          ourStrengths,
          competitorWeaknesses,
          marketOpportunities: highValueOpportunities,
          threats
        };
      },
      
      getRevenueOptimizationOpportunities: () => {
        const { dualIntelligenceInsights, marketOpportunities, pricingIntelligence = [] } = get();
        
        const internal = dualIntelligenceInsights
          .filter(i => i.internalData.revenueImpact > 50000)
          .map(i => i.title);
        
        const competitive = [
          ...(marketOpportunities || []).filter(o => o.opportunityScore > 80).map(o => o.title),
          ...(pricingIntelligence || []).filter(p => p.opportunity === 'raise_prices').map(p => p.service)
        ];
        
        const combined = dualIntelligenceInsights
          .filter(i => i.internalData.revenueImpact > 100000 && i.externalData.opportunitySize > 200000)
          .map(i => i.title);
        
        return { internal, competitive, combined };
      },
      
      // Analytics
      getMarketTrendAnalysis: () => {
        const { marketingTrends } = get();
        
        const trendingUp = marketingTrends
          .filter(t => t.trend === 'improving' || t.adoptionRate > 60)
          .sort((a, b) => b.adoptionRate - a.adoptionRate);
        
        const trendingDown = marketingTrends
          .filter(t => t.trend === 'declining' || t.adoptionRate < 30)
          .sort((a, b) => a.adoptionRate - b.adoptionRate);
        
        const emerging = marketingTrends
          .filter(t => t.adoptionRate < 40 && t.effectivenessScore > 70)
          .sort((a, b) => b.effectivenessScore - a.effectivenessScore);
        
        return { trendingUp, trendingDown, emerging };
      },
      
      getCompetitiveThreatAnalysis: () => {
        const { competitiveThreats } = get();
        
        const immediate = competitiveThreats
          .filter(t => t.severity === 'critical' && t.status !== 'resolved')
          .sort((a, b) => new Date(a.detectedAt).getTime() - new Date(b.detectedAt).getTime());
        
        const mediumTerm = competitiveThreats
          .filter(t => t.severity === 'high' && t.status !== 'resolved')
          .sort((a, b) => new Date(a.detectedAt).getTime() - new Date(b.detectedAt).getTime());
        
        const longTerm = competitiveThreats
          .filter(t => t.severity === 'medium' && t.status !== 'resolved')
          .sort((a, b) => new Date(a.detectedAt).getTime() - new Date(b.detectedAt).getTime());
        
        return { immediate, mediumTerm, longTerm };
      },
      
      getOpportunityAnalysis: () => {
        const { marketOpportunities = [] } = get();
        
        const quickWins = marketOpportunities
          .filter(o => o.timeToMarket < 30 && o.investmentRequired === 'low')
          .sort((a, b) => b.opportunityScore - a.opportunityScore);
        
        const strategic = marketOpportunities
          .filter(o => o.timeToMarket >= 30 && o.timeToMarket < 90 && o.investmentRequired === 'medium')
          .sort((a, b) => b.opportunityScore - a.opportunityScore);
        
        const longTerm = marketOpportunities
          .filter(o => o.timeToMarket >= 90 && o.investmentRequired === 'high')
          .sort((a, b) => b.opportunityScore - a.opportunityScore);
        
        return { quickWins, strategic, longTerm };
      },
      
      // Intelligence Generation
      generateDualIntelligenceInsights: () => {
        // This would typically call an AI service to generate insights
        // For now, we'll use the existing insights
        console.log('Generating dual intelligence insights...');
      },
      
      updateCompetitivePositioning: () => {
        // This would update competitive positioning based on latest data
        console.log('Updating competitive positioning...');
      },
      
      analyzeMarketOpportunities: () => {
        // This would analyze market opportunities based on combined data
        console.log('Analyzing market opportunities...');
      },
      
      assessCompetitiveThreats: () => {
        // This would assess competitive threats based on latest intelligence
        console.log('Assessing competitive threats...');
      }
    }),
    {
      name: 'dual-intelligence-storage',
      partialize: (state) => ({
        customers: state.customers,
        interactions: state.interactions,
        complaints: state.complaints,
        reviews: state.reviews,
        revenueIntelligence: state.revenueIntelligence,
        internalMetrics: state.internalMetrics,
        competitors: state.competitors,
        competitorComplaints: state.competitorComplaints,
        competitorProductLaunches: state.competitorProductLaunches,
        marketingTrends: state.marketingTrends,
        pricingIntelligence: state.pricingIntelligence,
        marketOpportunities: state.marketOpportunities,
        competitiveThreats: state.competitiveThreats,
        intelligenceInsights: state.intelligenceInsights,
        marketBenchmarks: state.marketBenchmarks,
        strategicRecommendations: state.strategicRecommendations,
        dualIntelligenceInsights: state.dualIntelligenceInsights,
        competitiveDashboard: state.competitiveDashboard
      })
    }
  )
);
