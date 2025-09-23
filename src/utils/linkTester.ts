// Link Testing Utility for MozaWave
// Tests all main navigation links to ensure they work properly

export interface LinkTest {
  path: string;
  name: string;
  expectedStatus: number;
  description: string;
}

export const mainLinks: LinkTest[] = [
  {
    path: '/',
    name: 'Home',
    expectedStatus: 200,
    description: 'Main homepage with one-scroll design'
  },
  {
    path: '/account',
    name: 'Account',
    expectedStatus: 200,
    description: 'Account page (redirects to home)'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    expectedStatus: 200,
    description: 'Main dashboard page'
  },
  {
    path: '/services',
    name: 'Services',
    expectedStatus: 200,
    description: 'Services overview page'
  },
  {
    path: '/services/competitor-tracker',
    name: 'Competitor Tracker',
    expectedStatus: 200,
    description: 'Competitor tracking service page'
  },
  {
    path: '/services/review-manager',
    name: 'Review Manager',
    expectedStatus: 200,
    description: 'Review management service page'
  },
  {
    path: '/demo-center',
    name: 'Demo Center',
    expectedStatus: 200,
    description: 'Demo launcher page'
  },
  {
    path: '/contractors',
    name: 'Contractors',
    expectedStatus: 200,
    description: 'Contractors industry landing page'
  },
  {
    path: '/restaurants',
    name: 'Restaurants',
    expectedStatus: 200,
    description: 'Restaurants industry landing page'
  },
  {
    path: '/reports',
    name: 'Reports',
    expectedStatus: 200,
    description: 'Reports and analytics page'
  },
  {
    path: '/insights',
    name: 'Insights',
    expectedStatus: 200,
    description: 'Business insights page'
  },
  {
    path: '/integrations',
    name: 'Integrations',
    expectedStatus: 200,
    description: 'Third-party integrations page'
  }
];

export const testLink = async (link: LinkTest): Promise<{ success: boolean; status?: number; error?: string }> => {
  try {
    const response = await fetch(link.path, { method: 'HEAD' });
    return {
      success: response.status === link.expectedStatus,
      status: response.status
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const testAllLinks = async (): Promise<{ total: number; passed: number; failed: LinkTest[] }> => {
  const results = await Promise.all(
    mainLinks.map(async (link) => ({
      link,
      result: await testLink(link)
    }))
  );

  const passed = results.filter(r => r.result.success).length;
  const failed = results.filter(r => !r.result.success).map(r => r.link);

  return {
    total: mainLinks.length,
    passed,
    failed
  };
};

// Navigation link validation
export const validateNavigation = (path: string): boolean => {
  const validPaths = mainLinks.map(link => link.path);
  return validPaths.includes(path);
};

// Console logging for development
export const logLinkStatus = (path: string, status: number): void => {
  const link = mainLinks.find(l => l.path === path);
  if (link) {
    const statusEmoji = status === 200 ? '✅' : '❌';
    console.log(`${statusEmoji} ${link.name} (${path}): ${status}`);
  }
};
