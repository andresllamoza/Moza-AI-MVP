// Analytics store for conversion tracking
// Tracks user interactions and conversion events

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AnalyticsEvent {
  id: string;
  type: string;
  name: string;
  properties: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  page: string;
  referrer?: string;
}

export interface ConversionFunnel {
  step: string;
  name: string;
  events: string[];
  conversionRate: number;
  dropOffRate: number;
}

export interface HeatmapData {
  element: string;
  selector: string;
  clicks: number;
  hovers: number;
  scrollDepth: number;
  page: string;
}

interface AnalyticsState {
  events: AnalyticsEvent[];
  sessions: string[];
  currentSession: string;
  heatmapData: HeatmapData[];
  conversionFunnels: ConversionFunnel[];
  
  // Actions
  trackEvent: (name: string, properties?: Record<string, any>, type?: string) => void;
  trackPageView: (page: string, referrer?: string) => void;
  trackCTA: (ctaName: string, location: string) => void;
  trackScroll: (depth: number, page: string) => void;
  trackHeatmap: (element: string, selector: string, action: 'click' | 'hover', page: string) => void;
  getConversionMetrics: () => Record<string, any>;
  getHeatmapData: (page: string) => HeatmapData[];
  exportAnalytics: () => string;
  clearAnalytics: () => void;
}

const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const generateEventId = () => {
  return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      events: [],
      sessions: [],
      currentSession: generateSessionId(),
      heatmapData: [],
      conversionFunnels: [
        {
          step: 'homepage_visit',
          name: 'Homepage Visit',
          events: ['page_view'],
          conversionRate: 100,
          dropOffRate: 0
        },
        {
          step: 'hero_cta_click',
          name: 'Hero CTA Click',
          events: ['cta_click'],
          conversionRate: 0,
          dropOffRate: 0
        },
        {
          step: 'pricing_view',
          name: 'Pricing Page View',
          events: ['page_view'],
          conversionRate: 0,
          dropOffRate: 0
        },
        {
          step: 'plan_selection',
          name: 'Plan Selection',
          events: ['plan_select'],
          conversionRate: 0,
          dropOffRate: 0
        },
        {
          step: 'checkout_start',
          name: 'Checkout Started',
          events: ['checkout_start'],
          conversionRate: 0,
          dropOffRate: 0
        }
      ],

      trackEvent: (name: string, properties = {}, type = 'custom') => {
        const event: AnalyticsEvent = {
          id: generateEventId(),
          type,
          name,
          properties,
          timestamp: new Date(),
          sessionId: get().currentSession,
          page: window.location.pathname,
          referrer: document.referrer || undefined
        };

        set(state => ({
          events: [...state.events, event],
          sessions: state.sessions.includes(state.currentSession) 
            ? state.sessions 
            : [...state.sessions, state.currentSession]
        }));

        // Update conversion funnels
        const { updateConversionFunnels } = get();
        updateConversionFunnels(event);
      },

      trackPageView: (page: string, referrer?: string) => {
        get().trackEvent('page_view', { page, referrer }, 'page_view');
      },

      trackCTA: (ctaName: string, location: string) => {
        get().trackEvent('cta_click', { cta_name: ctaName, location }, 'cta_click');
      },

      trackScroll: (depth: number, page: string) => {
        get().trackEvent('scroll', { depth, page }, 'scroll');
      },

      trackHeatmap: (element: string, selector: string, action: 'click' | 'hover', page: string) => {
        const state = get();
        const existingData = state.heatmapData.find(
          h => h.element === element && h.selector === selector && h.page === page
        );

        if (existingData) {
          set(state => ({
            heatmapData: state.heatmapData.map(h =>
              h.element === element && h.selector === selector && h.page === page
                ? {
                    ...h,
                    clicks: action === 'click' ? h.clicks + 1 : h.clicks,
                    hovers: action === 'hover' ? h.hovers + 1 : h.hovers
                  }
                : h
            )
          }));
        } else {
          set(state => ({
            heatmapData: [
              ...state.heatmapData,
              {
                element,
                selector,
                clicks: action === 'click' ? 1 : 0,
                hovers: action === 'hover' ? 1 : 0,
                scrollDepth: 0,
                page
              }
            ]
          }));
        }

        get().trackEvent('heatmap_interaction', { element, selector, action, page }, 'heatmap');
      },

      getConversionMetrics: () => {
        const state = get();
        const events = state.events;
        const sessions = state.sessions;

        const totalPageViews = events.filter(e => e.name === 'page_view').length;
        const totalCTAClicks = events.filter(e => e.name === 'cta_click').length;
        const totalPlanSelections = events.filter(e => e.name === 'plan_select').length;
        const totalCheckouts = events.filter(e => e.name === 'checkout_start').length;

        const uniqueVisitors = new Set(events.map(e => e.sessionId)).size;
        const avgEventsPerSession = events.length / sessions.length || 0;
        const bounceRate = sessions.filter(session => {
          const sessionEvents = events.filter(e => e.sessionId === session);
          return sessionEvents.length === 1; // Only page view
        }).length / sessions.length * 100 || 0;

        return {
          totalEvents: events.length,
          uniqueSessions: sessions.length,
          uniqueVisitors,
          totalPageViews,
          totalCTAClicks,
          totalPlanSelections,
          totalCheckouts,
          avgEventsPerSession: Math.round(avgEventsPerSession * 100) / 100,
          bounceRate: Math.round(bounceRate * 100) / 100,
          ctaClickRate: totalPageViews > 0 ? Math.round((totalCTAClicks / totalPageViews) * 10000) / 100 : 0,
          conversionRate: totalPageViews > 0 ? Math.round((totalCheckouts / totalPageViews) * 10000) / 100 : 0
        };
      },

      getHeatmapData: (page: string) => {
        return get().heatmapData.filter(h => h.page === page);
      },

      exportAnalytics: () => {
        const state = get();
        const metrics = state.getConversionMetrics();
        
        const csvData = [
          ['Metric', 'Value'],
          ['Total Events', metrics.totalEvents],
          ['Unique Sessions', metrics.uniqueSessions],
          ['Unique Visitors', metrics.uniqueVisitors],
          ['Total Page Views', metrics.totalPageViews],
          ['Total CTA Clicks', metrics.totalCTAClicks],
          ['Total Plan Selections', metrics.totalPlanSelections],
          ['Total Checkouts', metrics.totalCheckouts],
          ['Average Events per Session', metrics.avgEventsPerSession],
          ['Bounce Rate (%)', metrics.bounceRate],
          ['CTA Click Rate (%)', metrics.ctaClickRate],
          ['Conversion Rate (%)', metrics.conversionRate]
        ];

        return csvData.map(row => row.join(',')).join('\n');
      },

      clearAnalytics: () => {
        set({
          events: [],
          sessions: [],
          currentSession: generateSessionId(),
          heatmapData: []
        });
      }
    }),
    {
      name: 'moza-analytics-storage',
      partialize: (state) => ({
        events: state.events,
        sessions: state.sessions,
        heatmapData: state.heatmapData
      })
    }
  )
);

// Helper function to update conversion funnels
const updateConversionFunnels = (event: AnalyticsEvent) => {
  const state = useAnalyticsStore.getState();
  const events = state.events;
  
  // Calculate conversion rates for each funnel step
  const updatedFunnels = state.conversionFunnels.map(funnel => {
    const stepEvents = events.filter(e => funnel.events.includes(e.name));
    const totalEvents = events.filter(e => e.name === 'page_view').length;
    const conversionRate = totalEvents > 0 ? (stepEvents.length / totalEvents) * 100 : 0;
    
    return {
      ...funnel,
      conversionRate: Math.round(conversionRate * 100) / 100
    };
  });

  useAnalyticsStore.setState({ conversionFunnels: updatedFunnels });
};

// Initialize analytics tracking
if (typeof window !== 'undefined') {
  // Track initial page view
  useAnalyticsStore.getState().trackPageView(window.location.pathname);
  
  // Track scroll depth
  let maxScrollDepth = 0;
  window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
      useAnalyticsStore.getState().trackScroll(scrollDepth, window.location.pathname);
    }
  });

  // Track page changes (for SPA)
  window.addEventListener('popstate', () => {
    useAnalyticsStore.getState().trackPageView(window.location.pathname);
  });
}
