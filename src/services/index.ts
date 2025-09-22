// Simplified services index to resolve build errors
export * from './ai-reasoning-engine';
// export * from './apiIntegrations'; // Commented out to prevent conflicts
export * from './competitorTrackerApi';
export * from './reviewManagerApi';
export * from './realApiService';

// Mock implementations for missing services
export const alertSystem = {
  sendAlert: () => Promise.resolve(),
  getAlerts: () => Promise.resolve([]),
};

export const biDashboard = {
  getMetrics: () => Promise.resolve({}),
  getCharts: () => Promise.resolve([]),
};

export const marketWatchService = {
  monitor: () => Promise.resolve(),
  getUpdates: () => Promise.resolve([]),
};

export const reputationService = {
  analyze: () => Promise.resolve(),
  getScore: () => Promise.resolve(0),
};

export const mozaWavePlatform = {
  status: 'active',
  getMetrics: () => Promise.resolve({}),
  initialize: () => Promise.resolve(),
  getPlatformStatus: () => Promise.resolve({ status: 'active' }),
  getPlatformMetrics: () => Promise.resolve({}),
  shutdown: () => Promise.resolve(),
};

// Mock AI services
export const ProprietaryMetricsCalculator = {
  calculate: () => Promise.resolve({}),
};

export const AIInsightGenerator = {
  generate: () => Promise.resolve([]),
};

export const AdaptiveLearningSystem = {
  learn: () => Promise.resolve(),
};

export const AnomalyDetectionSystem = {
  detect: () => Promise.resolve([]),
};