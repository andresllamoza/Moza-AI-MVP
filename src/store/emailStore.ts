import { create } from 'zustand';
import { Email, EmailRule, DashboardMetrics, ROICalculation, BusinessType } from '@/types';

interface EmailState {
  // Email data
  emails: Email[];
  filteredEmails: Email[];
  selectedEmails: string[];
  
  // UI state
  currentBusinessType: BusinessType;
  currentFilter: string;
  currentCategory: string | null;
  isDemoMode: boolean;
  
  // Rules
  rules: EmailRule[];
  
  // Dashboard data
  metrics: DashboardMetrics | null;
  
  // ROI Calculator
  roiCalculation: ROICalculation | null;
  
  // Actions
  setEmails: (emails: Email[]) => void;
  setFilteredEmails: (emails: Email[]) => void;
  addEmail: (email: Email) => void;
  updateEmail: (id: string, updates: Partial<Email>) => void;
  deleteEmail: (id: string) => void;
  selectEmail: (id: string) => void;
  deselectEmail: (id: string) => void;
  selectAllEmails: () => void;
  deselectAllEmails: () => void;
  
  // Filtering
  setCurrentBusinessType: (type: BusinessType) => void;
  setCurrentFilter: (filter: string) => void;
  setCurrentCategory: (category: string | null) => void;
  applyFilters: () => void;
  
  // Rules
  addRule: (rule: EmailRule) => void;
  updateRule: (id: string, updates: Partial<EmailRule>) => void;
  deleteRule: (id: string) => void;
  toggleRule: (id: string) => void;
  
  // Demo mode
  setDemoMode: (isDemo: boolean) => void;
  
  // Metrics
  setMetrics: (metrics: DashboardMetrics) => void;
  updateMetrics: () => void;
  
  // ROI Calculator
  setROICalculation: (calculation: ROICalculation) => void;
  calculateROI: (volume: number, timePerEmail: number, hourlyRate: number) => void;
}

export const useEmailStore = create<EmailState>((set, get) => ({
  // Initial state
  emails: [],
  filteredEmails: [],
  selectedEmails: [],
  currentBusinessType: 'contractor',
  currentFilter: '',
  currentCategory: null,
  isDemoMode: true,
  rules: [],
  metrics: null,
  roiCalculation: null,
  
  // Email actions
  setEmails: (emails) => set({ emails, filteredEmails: emails }),
  
  setFilteredEmails: (emails) => set({ filteredEmails: emails }),
  
  addEmail: (email) => set((state) => ({
    emails: [...state.emails, email],
    filteredEmails: [...state.filteredEmails, email]
  })),
  
  updateEmail: (id, updates) => set((state) => ({
    emails: state.emails.map(email => 
      email.id === id ? { ...email, ...updates } : email
    ),
    filteredEmails: state.filteredEmails.map(email => 
      email.id === id ? { ...email, ...updates } : email
    )
  })),
  
  deleteEmail: (id) => set((state) => ({
    emails: state.emails.filter(email => email.id !== id),
    filteredEmails: state.filteredEmails.filter(email => email.id !== id),
    selectedEmails: state.selectedEmails.filter(emailId => emailId !== id)
  })),
  
  selectEmail: (id) => set((state) => ({
    selectedEmails: [...state.selectedEmails, id]
  })),
  
  deselectEmail: (id) => set((state) => ({
    selectedEmails: state.selectedEmails.filter(emailId => emailId !== id)
  })),
  
  selectAllEmails: () => set((state) => ({
    selectedEmails: state.filteredEmails.map(email => email.id)
  })),
  
  deselectAllEmails: () => set({ selectedEmails: [] }),
  
  // Filtering
  setCurrentBusinessType: (type) => {
    set({ currentBusinessType: type });
    get().applyFilters();
  },
  
  setCurrentFilter: (filter) => {
    set({ currentFilter: filter });
    get().applyFilters();
  },
  
  setCurrentCategory: (category) => {
    set({ currentCategory: category });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { emails, currentFilter, currentCategory, currentBusinessType } = get();
    
    let filtered = emails.filter(email => email.businessType === currentBusinessType);
    
    if (currentFilter) {
      const filter = currentFilter.toLowerCase();
      filtered = filtered.filter(email => 
        email.subject.toLowerCase().includes(filter) ||
        email.sender.toLowerCase().includes(filter) ||
        email.content.toLowerCase().includes(filter)
      );
    }
    
    if (currentCategory) {
      filtered = filtered.filter(email => email.category === currentCategory);
    }
    
    set({ filteredEmails: filtered });
  },
  
  // Rules
  addRule: (rule) => set((state) => ({
    rules: [...state.rules, rule]
  })),
  
  updateRule: (id, updates) => set((state) => ({
    rules: state.rules.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    )
  })),
  
  deleteRule: (id) => set((state) => ({
    rules: state.rules.filter(rule => rule.id !== id)
  })),
  
  toggleRule: (id) => set((state) => ({
    rules: state.rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    )
  })),
  
  // Demo mode
  setDemoMode: (isDemo) => set({ isDemoMode: isDemo }),
  
  // Metrics
  setMetrics: (metrics) => set({ metrics }),
  
  updateMetrics: () => {
    const { emails, currentBusinessType } = get();
    const businessEmails = emails.filter(email => email.businessType === currentBusinessType);
    
    const totalEmails = businessEmails.length;
    const processedEmails = businessEmails.filter(email => email.isProcessed).length;
    const timeSaved = businessEmails
      .filter(email => email.isProcessed)
      .reduce((total, email) => total + email.estimatedTimeToProcess, 0);
    
    const averageProcessingTime = businessEmails.length > 0 
      ? businessEmails.reduce((total, email) => total + email.estimatedTimeToProcess, 0) / businessEmails.length
      : 0;
    
    // Category breakdown
    const categoryCounts = businessEmails.reduce((acc, email) => {
      acc[email.category] = (acc[email.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const categoryBreakdown = Object.entries(categoryCounts).map(([category, count]) => ({
      category: category as any,
      count,
      percentage: (count / totalEmails) * 100,
      color: getCategoryColor(category)
    }));
    
    const metrics: DashboardMetrics = {
      totalEmails,
      processedEmails,
      timeSaved,
      averageProcessingTime,
      categoryBreakdown,
      weeklyVolume: [], // Will be calculated separately
      topSenders: [] // Will be calculated separately
    };
    
    set({ metrics });
  },
  
  // ROI Calculator
  setROICalculation: (calculation) => set({ roiCalculation: calculation }),
  
  calculateROI: (volume, timePerEmail, hourlyRate) => {
    const currentTimeSpent = volume * timePerEmail;
    const projectedTimeSaved = currentTimeSpent * 0.7; // Assume 70% time savings
    const projectedCostSavings = (projectedTimeSaved / 60) * hourlyRate;
    const roiPercentage = (projectedCostSavings / (currentTimeSpent / 60 * hourlyRate)) * 100;
    
    const calculation: ROICalculation = {
      currentEmailVolume: volume,
      currentTimePerEmail: timePerEmail,
      currentHourlyRate: hourlyRate,
      projectedTimeSaved,
      projectedCostSavings,
      roiPercentage
    };
    
    set({ roiCalculation: calculation });
  }
}));

// Helper function for category colors
function getCategoryColor(category: string): string {
  const colors = {
    invoices: '#3B82F6',
    estimates: '#10B981',
    customer_inquiries: '#F59E0B',
    reservations: '#8B5CF6',
    supplier_emails: '#EF4444',
    reviews: '#06B6D4',
    orders: '#84CC16',
    returns: '#F97316',
    customer_service: '#EC4899',
    marketing: '#6366F1',
    other: '#6B7280'
  };
  return colors[category as keyof typeof colors] || '#6B7280';
}
