# 🚀 MozaWave Deployment Guide

This guide covers deploying MozaWave to production environments.

## 📋 Prerequisites

- Node.js 18+ and npm 8+
- Supabase account and project
- Vercel account (recommended) or other hosting platform
- Domain name (optional)

## 🔧 Environment Setup

### 1. Clone and Install

```bash
git clone https://github.com/your-username/MozaWave.git
cd MozaWave
npm install
```

### 2. Environment Variables

Copy the example environment file and configure:

```bash
cp env.example .env.local
```

Required environment variables:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API (Required for AI features)
VITE_OPENAI_API_KEY=your_openai_api_key

# Application Configuration
VITE_APP_NAME=MozaWave
VITE_APP_VERSION=2.0.0
VITE_APP_ENVIRONMENT=production

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_SECURITY_FEATURES=true
VITE_ENABLE_COMPLIANCE_FEATURES=true
```

## 🏗️ Build Process

### Local Build

```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Build Verification

The build should complete successfully with:
- ✅ No TypeScript errors
- ✅ All imports resolved
- ✅ Bundle size under 2MB
- ✅ All security components included

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect GitHub Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel --prod
   ```

2. **Environment Variables in Vercel**
   - Go to your project dashboard
   - Navigate to Settings → Environment Variables
   - Add all required environment variables
   - Redeploy after adding variables

3. **Custom Domain (Optional)**
   - Add domain in Vercel dashboard
   - Update DNS records as instructed
   - Enable SSL (automatic)

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Environment Variables**: Add in Netlify dashboard

### Option 3: Self-Hosted

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Serve the dist folder** using any static hosting solution:
   - Nginx
   - Apache
   - Node.js static server
   - Docker container

## 🔒 Security Configuration

### Supabase Setup

1. **Enable Authentication**
   - Go to Authentication → Settings
   - Enable email authentication
   - Configure email templates

2. **Row Level Security (RLS)**
   - Enable RLS on all tables
   - Create appropriate policies

3. **API Security**
   - Configure CORS settings
   - Set up rate limiting
   - Enable audit logging

### Environment Security

- ✅ Never commit `.env.local` to version control
- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS in production
- ✅ Configure proper CORS settings

## 📊 Performance Optimization

### Bundle Optimization

The build includes:
- Code splitting for routes
- Tree shaking for unused code
- Image optimization
- CSS purging

### Monitoring

Consider adding:
- Web Vitals monitoring
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Uptime monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🧪 Testing Deployment

### Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] Build completes successfully
- [ ] No console errors in development
- [ ] All routes accessible
- [ ] Authentication flow works
- [ ] Security features functional
- [ ] Mobile responsiveness verified

### Post-deployment Testing

- [ ] Main application loads
- [ ] Authentication works
- [ ] Dashboard accessible
- [ ] Security dashboard functional
- [ ] All modals and components work
- [ ] Performance metrics acceptable

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **Runtime Errors**
   - Verify environment variables
   - Check Supabase configuration
   - Review browser console

3. **Performance Issues**
   - Enable gzip compression
   - Configure CDN
   - Optimize images

### Support

- 📧 Email: support@mozawave.ai
- 📚 Documentation: [docs.mozawave.ai](https://docs.mozawave.ai)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/MozaWave/issues)

## 📈 Production Monitoring

### Key Metrics to Monitor

- **Performance**: Load times, Core Web Vitals
- **Security**: Failed login attempts, suspicious activity
- **Usage**: Active users, feature adoption
- **Errors**: JavaScript errors, API failures

### Recommended Tools

- **Analytics**: Google Analytics 4
- **Error Tracking**: Sentry
- **Performance**: Vercel Analytics
- **Uptime**: UptimeRobot

---

**Ready to deploy?** Follow this guide step by step for a successful MozaWave deployment! 🚀
