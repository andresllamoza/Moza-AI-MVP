// MozaWave Internationalization System
// Sistema de internacionalización para soporte multiidioma

export type SupportedLanguage = 'en' | 'es';
export type LanguageDirection = 'ltr' | 'rtl';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: LanguageDirection;
  flag: string;
  locale: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
}

export interface TranslationKeys {
  // Navigation
  nav: {
    home: string;
    marketWatch: string;
    reputation: string;
    businessIntelligence: string;
    pricing: string;
    demo: string;
    contact: string;
    login: string;
  };
  
  // Common CTAs
  cta: {
    startFreeTrial: string;
    bookDemo: string;
    seeHowItWorks: string;
    learnMore: string;
    getStarted: string;
    tryFree: string;
    contactUs: string;
    scheduleCall: string;
  };
  
  // Trust signals
  trust: {
    cancelAnytime: string;
    firstTwoWeeksFree: string;
    setupIn5Minutes: string;
    noCreditCard: string;
    bankLevelSecurity: string;
    gdprCompliant: string;
    trustedByBusinesses: string;
    customerRating: string;
  };
  
  // Common benefits
  benefits: {
    saveTime: string;
    increaseRevenue: string;
    protectReputation: string;
    automateTasks: string;
    realTimeAlerts: string;
    aiPowered: string;
    unlimitedTracking: string;
    professionalSupport: string;
  };
  
  // Common pain points
  painPoints: {
    losingCustomers: string;
    missingOpportunities: string;
    wastingTime: string;
    flyingBlind: string;
    reactiveNotProactive: string;
    dataScattered: string;
    poorOnlinePresence: string;
    competitiveThreats: string;
  };
  
  // Dashboard
  dashboard: {
    overview: string;
    insights: string;
    alerts: string;
    analytics: string;
    settings: string;
    profile: string;
    logout: string;
    loading: string;
    error: string;
    success: string;
  };
  
  // Forms
  forms: {
    name: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    businessSize: string;
    location: string;
    message: string;
    submit: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    required: string;
    invalidEmail: string;
    invalidPhone: string;
  };
  
  // Business types
  businessTypes: {
    restaurant: string;
    retail: string;
    healthcare: string;
    fitness: string;
    beauty: string;
    contractor: string;
    professional: string;
    other: string;
  };
  
  // Business sizes
  businessSizes: {
    small: string;
    medium: string;
    large: string;
    enterprise: string;
  };
  
  // Time periods
  timePeriods: {
    daily: string;
    weekly: string;
    monthly: string;
    quarterly: string;
    yearly: string;
    realTime: string;
  };
  
  // Metrics
  metrics: {
    revenue: string;
    customers: string;
    reviews: string;
    rating: string;
    responseRate: string;
    sentiment: string;
    competitors: string;
    alerts: string;
    insights: string;
    growth: string;
    decline: string;
    stable: string;
  };
}

// Language configurations
export const LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
    locale: 'en-US',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    flag: '🇪🇸',
    locale: 'es-ES',
    currency: 'USD',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  }
};

// English translations
export const englishTranslations: TranslationKeys = {
  nav: {
    home: 'Home',
    marketWatch: 'Market Watch',
    reputation: 'Reputation',
    businessIntelligence: 'Business Intelligence',
    pricing: 'Pricing',
    demo: 'Demo',
    contact: 'Contact',
    login: 'Login'
  },
  cta: {
    startFreeTrial: '🚀 Start Free Trial',
    bookDemo: '📞 Book Demo Call',
    seeHowItWorks: '💡 See How It Works',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    tryFree: 'Try Free',
    contactUs: 'Contact Us',
    scheduleCall: 'Schedule Call'
  },
  trust: {
    cancelAnytime: '✓ Cancel anytime',
    firstTwoWeeksFree: '✓ First 2 weeks free',
    setupIn5Minutes: '✓ Setup in 5 minutes',
    noCreditCard: '✓ No credit card required',
    bankLevelSecurity: '✓ Bank-level security',
    gdprCompliant: '✓ GDPR compliant',
    trustedByBusinesses: '✓ 500+ businesses trust us',
    customerRating: '✓ 4.8/5 customer rating'
  },
  benefits: {
    saveTime: 'Save Time',
    increaseRevenue: 'Increase Revenue',
    protectReputation: 'Protect Reputation',
    automateTasks: 'Automate Tasks',
    realTimeAlerts: 'Real-time Alerts',
    aiPowered: 'AI-Powered',
    unlimitedTracking: 'Unlimited Tracking',
    professionalSupport: 'Professional Support'
  },
  painPoints: {
    losingCustomers: 'Losing Customers',
    missingOpportunities: 'Missing Opportunities',
    wastingTime: 'Wasting Time',
    flyingBlind: 'Flying Blind',
    reactiveNotProactive: 'Reactive Not Proactive',
    dataScattered: 'Data Scattered',
    poorOnlinePresence: 'Poor Online Presence',
    competitiveThreats: 'Competitive Threats'
  },
  dashboard: {
    overview: 'Overview',
    insights: 'Insights',
    alerts: 'Alerts',
    analytics: 'Analytics',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  },
  forms: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company',
    industry: 'Industry',
    businessSize: 'Business Size',
    location: 'Location',
    message: 'Message',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    required: 'Required',
    invalidEmail: 'Invalid email address',
    invalidPhone: 'Invalid phone number'
  },
  businessTypes: {
    restaurant: 'Restaurant',
    retail: 'Retail',
    healthcare: 'Healthcare',
    fitness: 'Fitness',
    beauty: 'Beauty',
    contractor: 'Contractor',
    professional: 'Professional Services',
    other: 'Other'
  },
  businessSizes: {
    small: 'Small (1-10 employees)',
    medium: 'Medium (11-50 employees)',
    large: 'Large (51-200 employees)',
    enterprise: 'Enterprise (200+ employees)'
  },
  timePeriods: {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    realTime: 'Real-time'
  },
  metrics: {
    revenue: 'Revenue',
    customers: 'Customers',
    reviews: 'Reviews',
    rating: 'Rating',
    responseRate: 'Response Rate',
    sentiment: 'Sentiment',
    competitors: 'Competitors',
    alerts: 'Alerts',
    insights: 'Insights',
    growth: 'Growth',
    decline: 'Decline',
    stable: 'Stable'
  }
};

// Spanish translations
export const spanishTranslations: TranslationKeys = {
  nav: {
    home: 'Inicio',
    marketWatch: 'Market Watch',
    reputation: 'Reputación',
    businessIntelligence: 'Inteligencia de Negocio',
    pricing: 'Precios',
    demo: 'Demo',
    contact: 'Contacto',
    login: 'Iniciar Sesión'
  },
  cta: {
    startFreeTrial: '🚀 Inicia Prueba Gratis',
    bookDemo: '📞 Reserva Llamada Demo',
    seeHowItWorks: '💡 Ver Cómo Funciona',
    learnMore: 'Aprende Más',
    getStarted: 'Comenzar',
    tryFree: 'Prueba Gratis',
    contactUs: 'Contáctanos',
    scheduleCall: 'Programar Llamada'
  },
  trust: {
    cancelAnytime: '✓ Cancela cuando quieras',
    firstTwoWeeksFree: '✓ Primeras 2 semanas gratis',
    setupIn5Minutes: '✓ Configuración en 5 minutos',
    noCreditCard: '✓ Sin tarjeta de crédito requerida',
    bankLevelSecurity: '✓ Seguridad bancaria',
    gdprCompliant: '✓ Cumple GDPR',
    trustedByBusinesses: '✓ 500+ negocios confían en nosotros',
    customerRating: '✓ 4.8/5 calificación de clientes'
  },
  benefits: {
    saveTime: 'Ahorrar Tiempo',
    increaseRevenue: 'Aumentar Ingresos',
    protectReputation: 'Proteger Reputación',
    automateTasks: 'Automatizar Tareas',
    realTimeAlerts: 'Alertas en Tiempo Real',
    aiPowered: 'Impulsado por IA',
    unlimitedTracking: 'Seguimiento Ilimitado',
    professionalSupport: 'Soporte Profesional'
  },
  painPoints: {
    losingCustomers: 'Perdiendo Clientes',
    missingOpportunities: 'Perdiendo Oportunidades',
    wastingTime: 'Perdiendo Tiempo',
    flyingBlind: 'Volando a Ciegas',
    reactiveNotProactive: 'Reactivo No Proactivo',
    dataScattered: 'Datos Dispersos',
    poorOnlinePresence: 'Mala Presencia en Línea',
    competitiveThreats: 'Amenazas Competitivas'
  },
  dashboard: {
    overview: 'Resumen',
    insights: 'Insights',
    alerts: 'Alertas',
    analytics: 'Analíticas',
    settings: 'Configuración',
    profile: 'Perfil',
    logout: 'Cerrar Sesión',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito'
  },
  forms: {
    name: 'Nombre',
    email: 'Email',
    phone: 'Teléfono',
    company: 'Empresa',
    industry: 'Industria',
    businessSize: 'Tamaño del Negocio',
    location: 'Ubicación',
    message: 'Mensaje',
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    required: 'Requerido',
    invalidEmail: 'Dirección de email inválida',
    invalidPhone: 'Número de teléfono inválido'
  },
  businessTypes: {
    restaurant: 'Restaurante',
    retail: 'Retail',
    healthcare: 'Salud',
    fitness: 'Fitness',
    beauty: 'Belleza',
    contractor: 'Contratista',
    professional: 'Servicios Profesionales',
    other: 'Otro'
  },
  businessSizes: {
    small: 'Pequeño (1-10 empleados)',
    medium: 'Mediano (11-50 empleados)',
    large: 'Grande (51-200 empleados)',
    enterprise: 'Empresa (200+ empleados)'
  },
  timePeriods: {
    daily: 'Diario',
    weekly: 'Semanal',
    monthly: 'Mensual',
    quarterly: 'Trimestral',
    yearly: 'Anual',
    realTime: 'Tiempo Real'
  },
  metrics: {
    revenue: 'Ingresos',
    customers: 'Clientes',
    reviews: 'Reseñas',
    rating: 'Calificación',
    responseRate: 'Tasa de Respuesta',
    sentiment: 'Sentimiento',
    competitors: 'Competidores',
    alerts: 'Alertas',
    insights: 'Insights',
    growth: 'Crecimiento',
    decline: 'Declive',
    stable: 'Estable'
  }
};

// Translation function
export function getTranslations(language: SupportedLanguage): TranslationKeys {
  switch (language) {
    case 'es':
      return spanishTranslations;
    case 'en':
    default:
      return englishTranslations;
  }
}

// Language detection
export function detectLanguage(): SupportedLanguage {
  // Check localStorage first
  const stored = localStorage.getItem('moza-wave-language') as SupportedLanguage;
  if (stored && (stored === 'en' || stored === 'es')) {
    return stored;
  }
  
  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  
  // Default to English
  return 'en';
}

// Language persistence
export function setLanguage(language: SupportedLanguage): void {
  localStorage.setItem('moza-wave-language', language);
  document.documentElement.lang = language;
  document.documentElement.dir = LANGUAGES[language].direction;
}

// Currency formatting
export function formatCurrency(amount: number, language: SupportedLanguage): string {
  const config = LANGUAGES[language];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency
  }).format(amount);
}

// Date formatting
export function formatDate(date: Date, language: SupportedLanguage): string {
  const config = LANGUAGES[language];
  return new Intl.DateTimeFormat(config.locale).format(date);
}

// Number formatting
export function formatNumber(number: number, language: SupportedLanguage): string {
  const config = LANGUAGES[language];
  return new Intl.NumberFormat(config.locale).format(number);
}

// Percentage formatting
export function formatPercentage(value: number, language: SupportedLanguage): string {
  const config = LANGUAGES[language];
  return new Intl.NumberFormat(config.locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
}

// Export default language configuration
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'es'];

export default {
  LANGUAGES,
  getTranslations,
  detectLanguage,
  setLanguage,
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercentage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES
};
