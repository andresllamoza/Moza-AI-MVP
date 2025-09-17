import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Customer,
  CustomerInteraction,
  Complaint,
  Review,
  RevenueIntelligence,
  DashboardMetrics,
  Alert,
  InteractionFilter,
  ComplaintFilter,
  ReviewFilter,
  BusinessIndustry,
  CustomerType,
  CustomerStatus,
  InteractionType,
  InteractionChannel,
  InteractionStatus,
  Priority,
  Sentiment,
  ComplaintCategory,
  ComplaintSeverity,
  ComplaintStatus,
  ReviewPlatform,
  ReviewStatus
} from '@/types/moza-intelligence';

interface MozaIntelligenceState {
  // Data
  customers: Customer[];
  interactions: CustomerInteraction[];
  complaints: Complaint[];
  reviews: Review[];
  revenueIntelligence: RevenueIntelligence[];
  dashboardMetrics: DashboardMetrics | null;
  alerts: Alert[];
  
  // UI State
  selectedCustomer: Customer | null;
  selectedInteraction: CustomerInteraction | null;
  selectedComplaint: Complaint | null;
  selectedReview: Review | null;
  
  // Filters
  interactionFilter: InteractionFilter;
  complaintFilter: ComplaintFilter;
  reviewFilter: ReviewFilter;
  
  // View State
  currentView: 'dashboard' | 'interactions' | 'complaints' | 'reviews' | 'analytics';
  sidebarOpen: boolean;
  loading: boolean;
  
  // Actions - Data Management
  setCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  setInteractions: (interactions: CustomerInteraction[]) => void;
  addInteraction: (interaction: CustomerInteraction) => void;
  updateInteraction: (id: string, updates: Partial<CustomerInteraction>) => void;
  deleteInteraction: (id: string) => void;
  
  setComplaints: (complaints: Complaint[]) => void;
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  deleteComplaint: (id: string) => void;
  
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  
  setRevenueIntelligence: (revenueIntelligence: RevenueIntelligence[]) => void;
  setDashboardMetrics: (metrics: DashboardMetrics) => void;
  setAlerts: (alerts: Alert[]) => void;
  
  // Actions - Selection
  selectCustomer: (customer: Customer | null) => void;
  selectInteraction: (interaction: CustomerInteraction | null) => void;
  selectComplaint: (complaint: Complaint | null) => void;
  selectReview: (review: Review | null) => void;
  
  // Actions - Filtering
  setInteractionFilter: (filter: Partial<InteractionFilter>) => void;
  setComplaintFilter: (filter: Partial<ComplaintFilter>) => void;
  setReviewFilter: (filter: Partial<ReviewFilter>) => void;
  clearFilters: () => void;
  
  // Actions - View Management
  setCurrentView: (view: 'dashboard' | 'interactions' | 'complaints' | 'reviews' | 'analytics') => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  
  // Computed Properties
  getFilteredInteractions: () => CustomerInteraction[];
  getFilteredComplaints: () => Complaint[];
  getFilteredReviews: () => Review[];
  getCustomerInteractions: (customerId: string) => CustomerInteraction[];
  getCustomerComplaints: (customerId: string) => Complaint[];
  getCustomerReviews: (customerId: string) => Review[];
  getCustomerRevenueIntelligence: (customerId: string) => RevenueIntelligence | undefined;
  
  // Analytics
  getCustomerSatisfactionTrend: () => { date: Date; score: number }[];
  getRevenueTrend: () => { date: Date; revenue: number }[];
  getComplaintTrends: () => { date: Date; count: number }[];
  getReviewTrends: () => { date: Date; averageRating: number }[];
  
  // Alerts
  markAlertAsRead: (alertId: string) => void;
  dismissAlert: (alertId: string) => void;
  getUnreadAlerts: () => Alert[];
  getCriticalAlerts: () => Alert[];
}

export const useMozaIntelligenceStore = create<MozaIntelligenceState>()(
  persist(
    (set, get) => ({
      // Initial state
      customers: [],
      interactions: [],
      complaints: [],
      reviews: [],
      revenueIntelligence: [],
      dashboardMetrics: null,
      alerts: [],
      
      selectedCustomer: null,
      selectedInteraction: null,
      selectedComplaint: null,
      selectedReview: null,
      
      interactionFilter: {},
      complaintFilter: {},
      reviewFilter: {},
      
      currentView: 'dashboard',
      sidebarOpen: true,
      loading: false,
      
      // Data Management Actions
      setCustomers: (customers) => set({ customers }),
      addCustomer: (customer) => set((state) => ({
        customers: [...state.customers, customer]
      })),
      updateCustomer: (id, updates) => set((state) => ({
        customers: state.customers.map(customer =>
          customer.id === id ? { ...customer, ...updates } : customer
        )
      })),
      deleteCustomer: (id) => set((state) => ({
        customers: state.customers.filter(customer => customer.id !== id)
      })),
      
      setInteractions: (interactions) => set({ interactions }),
      addInteraction: (interaction) => set((state) => ({
        interactions: [...state.interactions, interaction]
      })),
      updateInteraction: (id, updates) => set((state) => ({
        interactions: state.interactions.map(interaction =>
          interaction.id === id ? { ...interaction, ...updates } : interaction
        )
      })),
      deleteInteraction: (id) => set((state) => ({
        interactions: state.interactions.filter(interaction => interaction.id !== id)
      })),
      
      setComplaints: (complaints) => set({ complaints }),
      addComplaint: (complaint) => set((state) => ({
        complaints: [...state.complaints, complaint]
      })),
      updateComplaint: (id, updates) => set((state) => ({
        complaints: state.complaints.map(complaint =>
          complaint.id === id ? { ...complaint, ...updates } : complaint
        )
      })),
      deleteComplaint: (id) => set((state) => ({
        complaints: state.complaints.filter(complaint => complaint.id !== id)
      })),
      
      setReviews: (reviews) => set({ reviews }),
      addReview: (review) => set((state) => ({
        reviews: [...state.reviews, review]
      })),
      updateReview: (id, updates) => set((state) => ({
        reviews: state.reviews.map(review =>
          review.id === id ? { ...review, ...updates } : review
        )
      })),
      deleteReview: (id) => set((state) => ({
        reviews: state.reviews.filter(review => review.id !== id)
      })),
      
      setRevenueIntelligence: (revenueIntelligence) => set({ revenueIntelligence }),
      setDashboardMetrics: (metrics) => set({ dashboardMetrics: metrics }),
      setAlerts: (alerts) => set({ alerts }),
      
      // Selection Actions
      selectCustomer: (customer) => set({ selectedCustomer: customer }),
      selectInteraction: (interaction) => set({ selectedInteraction: interaction }),
      selectComplaint: (complaint) => set({ selectedComplaint: complaint }),
      selectReview: (review) => set({ selectedReview: review }),
      
      // Filter Actions
      setInteractionFilter: (filter) => set((state) => ({
        interactionFilter: { ...state.interactionFilter, ...filter }
      })),
      setComplaintFilter: (filter) => set((state) => ({
        complaintFilter: { ...state.complaintFilter, ...filter }
      })),
      setReviewFilter: (filter) => set((state) => ({
        reviewFilter: { ...state.reviewFilter, ...filter }
      })),
      clearFilters: () => set({
        interactionFilter: {},
        complaintFilter: {},
        reviewFilter: {}
      }),
      
      // View Management
      setCurrentView: (view) => set({ currentView: view }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setLoading: (loading) => set({ loading }),
      
      // Computed Properties
      getFilteredInteractions: () => {
        const { interactions, interactionFilter } = get();
        let filtered = [...interactions];
        
        if (interactionFilter.dateRange) {
          filtered = filtered.filter(interaction =>
            interaction.timestamp >= interactionFilter.dateRange!.start &&
            interaction.timestamp <= interactionFilter.dateRange!.end
          );
        }
        
        if (interactionFilter.customerId) {
          filtered = filtered.filter(interaction =>
            interaction.customerId === interactionFilter.customerId
          );
        }
        
        if (interactionFilter.type) {
          filtered = filtered.filter(interaction =>
            interaction.type === interactionFilter.type
          );
        }
        
        if (interactionFilter.channel) {
          filtered = filtered.filter(interaction =>
            interaction.channel === interactionFilter.channel
          );
        }
        
        if (interactionFilter.status) {
          filtered = filtered.filter(interaction =>
            interaction.status === interactionFilter.status
          );
        }
        
        if (interactionFilter.priority) {
          filtered = filtered.filter(interaction =>
            interaction.priority === interactionFilter.priority
          );
        }
        
        if (interactionFilter.sentiment) {
          filtered = filtered.filter(interaction =>
            interaction.sentiment === interactionFilter.sentiment
          );
        }
        
        if (interactionFilter.assignedTo) {
          filtered = filtered.filter(interaction =>
            interaction.assignedTo === interactionFilter.assignedTo
          );
        }
        
        if (interactionFilter.tags && interactionFilter.tags.length > 0) {
          filtered = filtered.filter(interaction =>
            interactionFilter.tags!.some(tag => interaction.tags.includes(tag))
          );
        }
        
        return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },
      
      getFilteredComplaints: () => {
        const { complaints, complaintFilter } = get();
        let filtered = [...complaints];
        
        if (complaintFilter.dateRange) {
          filtered = filtered.filter(complaint =>
            complaint.createdAt >= complaintFilter.dateRange!.start &&
            complaint.createdAt <= complaintFilter.dateRange!.end
          );
        }
        
        if (complaintFilter.customerId) {
          filtered = filtered.filter(complaint =>
            complaint.customerId === complaintFilter.customerId
          );
        }
        
        if (complaintFilter.category) {
          filtered = filtered.filter(complaint =>
            complaint.category === complaintFilter.category
          );
        }
        
        if (complaintFilter.severity) {
          filtered = filtered.filter(complaint =>
            complaint.severity === complaintFilter.severity
          );
        }
        
        if (complaintFilter.status) {
          filtered = filtered.filter(complaint =>
            complaint.status === complaintFilter.status
          );
        }
        
        if (complaintFilter.assignedTo) {
          filtered = filtered.filter(complaint =>
            complaint.assignedTo === complaintFilter.assignedTo
          );
        }
        
        if (complaintFilter.tags && complaintFilter.tags.length > 0) {
          filtered = filtered.filter(complaint =>
            complaintFilter.tags!.some(tag => complaint.tags.includes(tag))
          );
        }
        
        return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      },
      
      getFilteredReviews: () => {
        const { reviews, reviewFilter } = get();
        let filtered = [...reviews];
        
        if (reviewFilter.dateRange) {
          filtered = filtered.filter(review =>
            review.publishedAt >= reviewFilter.dateRange!.start &&
            review.publishedAt <= reviewFilter.dateRange!.end
          );
        }
        
        if (reviewFilter.customerId) {
          filtered = filtered.filter(review =>
            review.customerId === reviewFilter.customerId
          );
        }
        
        if (reviewFilter.platform) {
          filtered = filtered.filter(review =>
            review.platform === reviewFilter.platform
          );
        }
        
        if (reviewFilter.rating) {
          filtered = filtered.filter(review =>
            review.rating >= reviewFilter.rating!
          );
        }
        
        if (reviewFilter.sentiment) {
          filtered = filtered.filter(review =>
            review.sentiment === reviewFilter.sentiment
          );
        }
        
        if (reviewFilter.status) {
          filtered = filtered.filter(review =>
            review.status === reviewFilter.status
          );
        }
        
        if (reviewFilter.verified !== undefined) {
          filtered = filtered.filter(review =>
            review.verified === reviewFilter.verified
          );
        }
        
        return filtered.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      },
      
      getCustomerInteractions: (customerId) => {
        const { interactions } = get();
        return interactions
          .filter(interaction => interaction.customerId === customerId)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },
      
      getCustomerComplaints: (customerId) => {
        const { complaints } = get();
        return complaints
          .filter(complaint => complaint.customerId === customerId)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      },
      
      getCustomerReviews: (customerId) => {
        const { reviews } = get();
        return reviews
          .filter(review => review.customerId === customerId)
          .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      },
      
      getCustomerRevenueIntelligence: (customerId) => {
        const { revenueIntelligence } = get();
        return revenueIntelligence.find(ri => ri.customerId === customerId);
      },
      
      // Analytics
      getCustomerSatisfactionTrend: () => {
        const { customers } = get();
        const days = 30;
        const trend = [];
        
        for (let i = 0; i < days; i++) {
          const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
          const dayCustomers = customers.filter(c => 
            c.lastInteraction.toDateString() === date.toDateString()
          );
          const averageScore = dayCustomers.length > 0 
            ? dayCustomers.reduce((sum, c) => sum + c.satisfactionScore, 0) / dayCustomers.length
            : 0;
          
          trend.push({ date, score: averageScore });
        }
        
        return trend;
      },
      
      getRevenueTrend: () => {
        const { customers } = get();
        const months = 12;
        const trend = [];
        
        for (let i = 0; i < months; i++) {
          const date = new Date(Date.now() - (months - i) * 30 * 24 * 60 * 60 * 1000);
          const monthCustomers = customers.filter(c => 
            c.acquisitionDate <= date && c.lastInteraction >= date
          );
          const revenue = monthCustomers.reduce((sum, c) => sum + c.lifetimeValue * 0.1, 0);
          
          trend.push({ date, revenue });
        }
        
        return trend;
      },
      
      getComplaintTrends: () => {
        const { complaints } = get();
        const days = 30;
        const trend = [];
        
        for (let i = 0; i < days; i++) {
          const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
          const dayComplaints = complaints.filter(c => 
            c.createdAt.toDateString() === date.toDateString()
          );
          
          trend.push({ date, count: dayComplaints.length });
        }
        
        return trend;
      },
      
      getReviewTrends: () => {
        const { reviews } = get();
        const days = 30;
        const trend = [];
        
        for (let i = 0; i < days; i++) {
          const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
          const dayReviews = reviews.filter(r => 
            r.publishedAt.toDateString() === date.toDateString()
          );
          const averageRating = dayReviews.length > 0 
            ? dayReviews.reduce((sum, r) => sum + r.rating, 0) / dayReviews.length
            : 0;
          
          trend.push({ date, averageRating });
        }
        
        return trend;
      },
      
      // Alert Management
      markAlertAsRead: (alertId) => set((state) => ({
        alerts: state.alerts.map(alert =>
          alert.id === alertId ? { ...alert, read: true } : alert
        )
      })),
      
      dismissAlert: (alertId) => set((state) => ({
        alerts: state.alerts.filter(alert => alert.id !== alertId)
      })),
      
      getUnreadAlerts: () => {
        const { alerts } = get();
        return alerts.filter(alert => !alert.read);
      },
      
      getCriticalAlerts: () => {
        const { alerts } = get();
        return alerts.filter(alert => alert.severity === 'critical' || alert.severity === 'urgent');
      }
    }),
    {
      name: 'moza-intelligence-storage',
      partialize: (state) => ({
        customers: state.customers,
        interactions: state.interactions,
        complaints: state.complaints,
        reviews: state.reviews,
        revenueIntelligence: state.revenueIntelligence,
        dashboardMetrics: state.dashboardMetrics,
        alerts: state.alerts
      })
    }
  )
);
