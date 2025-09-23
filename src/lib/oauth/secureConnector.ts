// Secure OAuth Connector for MozaWave
// Implements least-privilege scopes, encrypted refresh tokens, safe token rotation, and audit logging

import { encrypt, decrypt } from '@/lib/crypto/encryption';
import { AuditLogger } from '@/lib/audit/logger';

// OAuth Provider Configuration
interface OAuthProvider {
  name: string;
  clientId: string;
  clientSecret: string;
  authUrl: string;
  tokenUrl: string;
  scopes: string[];
  redirectUri: string;
}

// Token Storage Interface
interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  scope: string;
  provider: string;
  userId: string;
  tenantId: string;
}

// OAuth Provider Configurations
const OAUTH_PROVIDERS: Record<string, OAuthProvider> = {
  google: {
    name: 'Google',
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: [
      'https://www.googleapis.com/auth/business.manage', // Google My Business
      'https://www.googleapis.com/auth/plus.business.manage', // Google+ Business
      'https://www.googleapis.com/auth/userinfo.email', // Email access
      'https://www.googleapis.com/auth/userinfo.profile', // Profile access
    ],
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/google/callback`,
  },
  yelp: {
    name: 'Yelp',
    clientId: process.env.YELP_CLIENT_ID!,
    clientSecret: process.env.YELP_CLIENT_SECRET!,
    authUrl: 'https://api.yelp.com/oauth2/authorize',
    tokenUrl: 'https://api.yelp.com/oauth2/token',
    scopes: ['business'],
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/yelp/callback`,
  },
  twitter: {
    name: 'Twitter/X',
    clientId: process.env.TWITTER_CLIENT_ID!,
    clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    scopes: ['tweet.read', 'users.read', 'offline.access'],
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/twitter/callback`,
  },
};

export class SecureOAuthConnector {
  private auditLogger: AuditLogger;
  
  constructor() {
    this.auditLogger = new AuditLogger();
  }

  // Generate OAuth authorization URL
  generateAuthUrl(provider: string, tenantId: string, userId: string): string {
    const config = OAUTH_PROVIDERS[provider];
    if (!config) {
      throw new Error(`Unsupported OAuth provider: ${provider}`);
    }

    const state = this.generateSecureState(tenantId, userId);
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scopes.join(' '),
      state,
      access_type: 'offline',
      prompt: 'consent', // Force consent for refresh token
    });

    // Log OAuth initiation
    this.auditLogger.logEvent('oauth_initiated', {
      provider,
      tenantId,
      userId,
      scopes: config.scopes,
    });

    return `${config.authUrl}?${params.toString()}`;
  }

  // Exchange authorization code for tokens
  async exchangeCodeForTokens(
    provider: string,
    code: string,
    state: string
  ): Promise<TokenData> {
    const config = OAUTH_PROVIDERS[provider];
    if (!config) {
      throw new Error(`Unsupported OAuth provider: ${provider}`);
    }

    // Validate state parameter
    const { tenantId, userId } = this.validateState(state);

    try {
      const response = await fetch(config.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: new URLSearchParams({
          client_id: config.clientId,
          client_secret: config.clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: config.redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error(`OAuth token exchange failed: ${response.statusText}`);
      }

      const tokenData = await response.json();
      
      // Encrypt tokens before storage
      const encryptedTokens: TokenData = {
        accessToken: await encrypt(tokenData.access_token),
        refreshToken: await encrypt(tokenData.refresh_token),
        expiresAt: Date.now() + (tokenData.expires_in * 1000),
        scope: tokenData.scope,
        provider,
        userId,
        tenantId,
      };

      // Store encrypted tokens securely
      await this.storeTokens(encryptedTokens);

      // Log successful OAuth connection
      this.auditLogger.logEvent('oauth_connected', {
        provider,
        tenantId,
        userId,
        scopes: tokenData.scope,
      });

      return encryptedTokens;
    } catch (error) {
      // Log OAuth failure
      this.auditLogger.logEvent('oauth_failed', {
        provider,
        tenantId,
        userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  // Refresh access token using refresh token
  async refreshAccessToken(provider: string, tenantId: string, userId: string): Promise<TokenData> {
    const config = OAUTH_PROVIDERS[provider];
    if (!config) {
      throw new Error(`Unsupported OAuth provider: ${provider}`);
    }

    // Retrieve encrypted refresh token
    const encryptedTokens = await this.getTokens(provider, tenantId, userId);
    if (!encryptedTokens) {
      throw new Error('No stored tokens found');
    }

    const refreshToken = await decrypt(encryptedTokens.refreshToken);

    try {
      const response = await fetch(config.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: new URLSearchParams({
          client_id: config.clientId,
          clientSecret: config.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
      }

      const tokenData = await response.json();
      
      // Update tokens with new access token
      const updatedTokens: TokenData = {
        ...encryptedTokens,
        accessToken: await encrypt(tokenData.access_token),
        expiresAt: Date.now() + (tokenData.expires_in * 1000),
      };

      // Store updated tokens
      await this.storeTokens(updatedTokens);

      // Log token refresh
      this.auditLogger.logEvent('oauth_token_refreshed', {
        provider,
        tenantId,
        userId,
      });

      return updatedTokens;
    } catch (error) {
      // Log refresh failure
      this.auditLogger.logEvent('oauth_refresh_failed', {
        provider,
        tenantId,
        userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  // Disconnect OAuth provider
  async disconnectProvider(provider: string, tenantId: string, userId: string): Promise<void> {
    try {
      // Revoke tokens if possible
      const tokens = await this.getTokens(provider, tenantId, userId);
      if (tokens) {
        await this.revokeTokens(provider, tokens);
      }

      // Remove stored tokens
      await this.removeTokens(provider, tenantId, userId);

      // Log disconnection
      this.auditLogger.logEvent('oauth_disconnected', {
        provider,
        tenantId,
        userId,
      });
    } catch (error) {
      this.auditLogger.logEvent('oauth_disconnect_failed', {
        provider,
        tenantId,
        userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  // Generate secure state parameter
  private generateSecureState(tenantId: string, userId: string): string {
    const stateData = {
      tenantId,
      userId,
      nonce: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    
    return Buffer.from(JSON.stringify(stateData)).toString('base64');
  }

  // Validate state parameter
  private validateState(state: string): { tenantId: string; userId: string } {
    try {
      const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
      
      // Check timestamp (max 10 minutes old)
      if (Date.now() - stateData.timestamp > 10 * 60 * 1000) {
        throw new Error('State parameter expired');
      }
      
      return {
        tenantId: stateData.tenantId,
        userId: stateData.userId,
      };
    } catch (error) {
      throw new Error('Invalid state parameter');
    }
  }

  // Store encrypted tokens (implement with your database)
  private async storeTokens(tokens: TokenData): Promise<void> {
    // TODO: Implement secure token storage in your database
    // Example: await db.oauthTokens.upsert({ ...tokens });
    console.log('Storing encrypted tokens for:', tokens.provider, tokens.tenantId);
  }

  // Retrieve encrypted tokens
  private async getTokens(provider: string, tenantId: string, userId: string): Promise<TokenData | null> {
    // TODO: Implement token retrieval from your database
    // Example: return await db.oauthTokens.findUnique({ where: { provider, tenantId, userId } });
    console.log('Retrieving tokens for:', provider, tenantId, userId);
    return null;
  }

  // Remove tokens
  private async removeTokens(provider: string, tenantId: string, userId: string): Promise<void> {
    // TODO: Implement token removal from your database
    // Example: await db.oauthTokens.delete({ where: { provider, tenantId, userId } });
    console.log('Removing tokens for:', provider, tenantId, userId);
  }

  // Revoke tokens with OAuth provider
  private async revokeTokens(provider: string, tokens: TokenData): Promise<void> {
    const config = OAUTH_PROVIDERS[provider];
    if (!config) {
      return;
    }

    try {
      const accessToken = await decrypt(tokens.accessToken);
      
      // Revoke access token
      await fetch(`${config.tokenUrl}/revoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          token: accessToken,
        }),
      });
    } catch (error) {
      console.warn('Failed to revoke tokens:', error);
    }
  }
}

// Export singleton instance
export const oauthConnector = new SecureOAuthConnector();
