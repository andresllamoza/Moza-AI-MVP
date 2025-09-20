# MozaWave API Configuration Guide

This guide explains how to configure the API keys for MozaWave's integrated services.

## Required API Keys

### 1. Google APIs

#### Google Places API
- **Purpose**: Competitor location and business data
- **Setup**: 
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Enable the Places API
  3. Create an API key
  4. Restrict the key to your domain
- **Environment Variable**: `VITE_GOOGLE_PLACES_API_KEY`

#### Google My Business API
- **Purpose**: Manage business reviews and respond to customers
- **Setup**:
  1. Enable Google My Business API in Google Cloud Console
  2. Set up OAuth 2.0 credentials
  3. Get your business account ID
- **Environment Variables**: 
  - `VITE_GOOGLE_MY_BUSINESS_API_KEY`
  - `VITE_GOOGLE_BUSINESS_ACCOUNT_ID`

### 2. Yelp Fusion API

- **Purpose**: Restaurant and business review data
- **Setup**:
  1. Go to [Yelp Fusion](https://www.yelp.com/developers/documentation/v3/authentication)
  2. Create a Yelp app
  3. Get your API key
- **Environment Variable**: `VITE_YELP_API_KEY`

### 3. Facebook Ad Library API

- **Purpose**: Track competitor advertising spend and campaigns
- **Setup**:
  1. Go to [Facebook Developers](https://developers.facebook.com/)
  2. Create a Facebook app
  3. Get an access token with ads_read permission
- **Environment Variable**: `VITE_FACEBOOK_API_KEY`

### 4. OpenAI API

- **Purpose**: Generate AI responses for review management
- **Setup**:
  1. Go to [OpenAI Platform](https://platform.openai.com/)
  2. Create an API key
  3. Add billing information
- **Environment Variable**: `VITE_OPENAI_API_KEY`

## Configuration Steps

### 1. Create Environment File

Create a `.env.local` file in your project root:

```bash
# Google APIs
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
VITE_GOOGLE_MY_BUSINESS_API_KEY=your_google_my_business_api_key_here
VITE_GOOGLE_BUSINESS_ACCOUNT_ID=your_google_business_account_id_here

# Yelp Fusion API
VITE_YELP_API_KEY=your_yelp_fusion_api_key_here

# Facebook Ad Library API
VITE_FACEBOOK_API_KEY=your_facebook_app_access_token_here

# OpenAI API
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 2. API Usage Limits

#### Google Places API
- **Free Tier**: 1,000 requests/day
- **Paid Tier**: $0.032 per request after free tier

#### Yelp Fusion API
- **Free Tier**: 500 requests/day
- **Paid Tier**: Contact Yelp for enterprise pricing

#### Facebook Ad Library API
- **Free Tier**: 200 requests/hour
- **Rate Limits**: Vary by endpoint

#### OpenAI API
- **GPT-3.5-turbo**: $0.002 per 1K tokens
- **Rate Limits**: 3,500 requests/minute

### 3. Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all API keys
3. **Restrict API keys** to specific domains/IPs when possible
4. **Monitor usage** regularly to prevent unexpected charges
5. **Rotate keys** periodically for security

### 4. Fallback Behavior

If API keys are not configured, MozaWave will:
- Display mock data for demonstration purposes
- Show warning messages in the console
- Continue to function for demo/preview purposes

### 5. Testing API Integration

To test if your APIs are working:

1. Check the browser console for any API errors
2. Look for "API key not configured" warnings
3. Verify that real data appears instead of mock data
4. Test the AI response generation feature

## Troubleshooting

### Common Issues

1. **CORS Errors**: Some APIs require server-side implementation
2. **Rate Limiting**: Implement caching and request throttling
3. **Authentication**: Ensure OAuth tokens are properly refreshed
4. **Billing**: Check that billing is enabled for paid APIs

### Support

For API-specific issues, consult the official documentation:
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3)
- [Facebook Ad Library API](https://developers.facebook.com/docs/marketing-api/adlibrary)
- [OpenAI API](https://platform.openai.com/docs)
