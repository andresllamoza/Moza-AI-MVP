# 🚀 Vercel Deployment Instructions

## Quick Setup

1. **Login to Vercel CLI**:
   ```bash
   npx vercel login
   ```

2. **Deploy the project**:
   ```bash
   npx vercel --prod
   ```

3. **Follow the prompts**:
   - Link to existing project? **No** (create new)
   - Project name: **mozawave**
   - Directory: **./** (current directory)
   - Override settings? **No**

## Manual GitHub Integration

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import `andresllamoza/Moza-AI-MVP`
4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click "Deploy"

## Expected URLs After Deployment

- **Main App**: `https://[project-name].vercel.app`
- **Industry Selector**: `https://[project-name].vercel.app/industry-selector`
- **Design System**: `https://[project-name].vercel.app/design-system`
- **Security Dashboard**: `https://[project-name].vercel.app/security`

## Troubleshooting

If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify `vercel.json` configuration
4. Check for TypeScript errors with `npm run build`

## Environment Variables

The app works without environment variables for demo purposes, but you can add:
- `VITE_SUPABASE_URL` (for real data)
- `VITE_SUPABASE_ANON_KEY` (for real data)
- `VITE_OPENAI_API_KEY` (for AI features)
