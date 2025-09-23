// Enterprise Security Middleware for MozaWave
// Implements JWT validation, RBAC, tenant-aware rate limiting, and security headers

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { RateLimiter } from 'limiter';

// Security Configuration
const SECURITY_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  RATE_LIMITS: {
    PER_TENANT: 1000, // requests per hour per tenant
    PER_IP: 100, // requests per hour per IP
    BURST: 20, // burst requests allowed
  },
  JWT_EXPIRY: '15m', // Short expiry for security
  REFRESH_EXPIRY: '7d',
  COOKIE_CONFIG: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  }
};

// Rate Limiter Storage (in production, use Redis)
const rateLimiters = new Map<string, RateLimiter>();

// JWT Token Validation
async function validateJWT(token: string): Promise<{ valid: boolean; payload?: any; error?: string }> {
  try {
    const secret = new TextEncoder().encode(SECURITY_CONFIG.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Check token expiry
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return { valid: false, error: 'Token expired' };
    }
    
    return { valid: true, payload };
  } catch (error) {
    return { valid: false, error: 'Invalid token' };
  }
}

// Role-Based Access Control
function checkRBAC(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    'admin': 4,
    'manager': 3,
    'user': 2,
    'viewer': 1,
    'guest': 0
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Tenant-aware Rate Limiting
function checkRateLimit(identifier: string, limit: number): boolean {
  if (!rateLimiters.has(identifier)) {
    rateLimiters.set(identifier, new RateLimiter(limit, 'hour'));
  }
  
  const limiter = rateLimiters.get(identifier)!;
  return limiter.tryRemoveTokens(1);
}

// Security Headers
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://vercel.live https://vercel-insights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.mozawave.com https://analytics.mozawave.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
    "block-all-mixed-content"
  ].join('; '),
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

// Main Security Middleware
export async function securityMiddleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  
  // Skip security for public routes
  const publicRoutes = ['/', '/auth', '/demo', '/health'];
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return addSecurityHeaders(NextResponse.next());
  }
  
  // Extract JWT token
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  // Validate JWT
  const jwtResult = await validateJWT(token);
  if (!jwtResult.valid) {
    return NextResponse.json(
      { error: 'Invalid authentication', details: jwtResult.error },
      { status: 401 }
    );
  }
  
  const { tenantId, userId, role } = jwtResult.payload;
  
  // Tenant isolation check
  if (!tenantId) {
    return NextResponse.json(
      { error: 'Tenant identification required' },
      { status: 400 }
    );
  }
  
  // Rate limiting per tenant and IP
  const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const tenantKey = `tenant:${tenantId}`;
  const ipKey = `ip:${clientIP}`;
  
  if (!checkRateLimit(tenantKey, SECURITY_CONFIG.RATE_LIMITS.PER_TENANT)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded for tenant' },
      { status: 429 }
    );
  }
  
  if (!checkRateLimit(ipKey, SECURITY_CONFIG.RATE_LIMITS.PER_IP)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded for IP' },
      { status: 429 }
    );
  }
  
  // RBAC check for protected routes
  const protectedRoutes = {
    '/admin': 'admin',
    '/api/admin': 'admin',
    '/settings': 'manager',
    '/api/settings': 'manager',
  };
  
  for (const [route, requiredRole] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route) && !checkRBAC(role, requiredRole)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }
  }
  
  // Add security context to request headers
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenantId);
  response.headers.set('x-user-id', userId);
  response.headers.set('x-user-role', role);
  
  return addSecurityHeaders(response);
}

// Add security headers to response
function addSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Audit logging for security events
export function logSecurityEvent(event: string, details: any, request: NextRequest): void {
  const auditLog = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip || request.headers.get('x-forwarded-for'),
    path: request.nextUrl.pathname,
    method: request.method,
  };
  
  // In production, send to secure audit logging service
  console.log('Security Audit:', JSON.stringify(auditLog));
}

// Export security utilities
export const securityUtils = {
  validateJWT,
  checkRBAC,
  checkRateLimit,
  addSecurityHeaders,
  logSecurityEvent,
  SECURITY_CONFIG,
};
