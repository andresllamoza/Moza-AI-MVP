# 🚀 MozaWave - Enterprise AI Intelligence Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

> **The world's first dual intelligence platform combining external competitive intelligence with internal customer data for enterprise-grade business insights.**

## 🌟 Overview

MozaWave is a comprehensive SaaS platform that empowers businesses to dominate their markets through AI-powered competitive intelligence, reputation management, and unified business analytics. Built with enterprise-grade security and scalability in mind.

### 🎯 Key Features

- **🔍 Competitive Intelligence**: Real-time competitor monitoring with AI-powered insights
- **⭐ Reputation Management**: AI-driven review responses and sentiment analysis  
- **📊 Business Analytics**: Unified dashboard combining internal and external data
- **🔒 Enterprise Security**: SOC 2, GDPR, CCPA compliant with advanced encryption
- **🎨 Modern Design**: Glassmorphism UI with dark mode and responsive design
- **🚀 Performance**: <1s load times, <200ms interactions, optimized for scale

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: Zustand, TanStack Query
- **UI Components**: Radix UI, Custom Design System
- **Charts**: Recharts with custom animations
- **Deployment**: Vercel with edge functions

### Security & Compliance

- ✅ **SOC 2 Type II** compliant
- ✅ **GDPR** and **CCPA** compliant  
- ✅ **Multi-factor authentication** (TOTP, SMS, Email)
- ✅ **Role-based access control** (RBAC)
- ✅ **End-to-end encryption** (AES-256-GCM)
- ✅ **Audit logging** and anomaly detection
- ✅ **Data retention policies** with automated cleanup

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/MozaWave.git
cd MozaWave

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Live Demo

- **Main Application**: [https://mozawave.vercel.app](https://mozawave.vercel.app)
- **Design System**: [https://mozawave.vercel.app/design-system](https://mozawave.vercel.app/design-system)
- **Modern Dashboard**: [https://mozawave.vercel.app/modern-dashboard](https://mozawave.vercel.app/modern-dashboard)

## 🎨 Design System

MozaWave features a comprehensive design system with:

- **Color Palette**: Primary (#4F46E5), Success (#10B981), Warning (#F59E0B), Error (#EF4444)
- **Typography**: Inter font family with 6 text sizes
- **Spacing**: 4px base unit scaling system
- **Components**: Glassmorphism cards, animated charts, theme toggle
- **Dark Mode**: Full support with smooth transitions

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── security/       # Security components (MFA, RBAC, etc.)
│   ├── onboarding/     # User onboarding flows
│   └── dashboard/      # Dashboard-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Route components
├── services/           # API services and integrations
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## 🔐 Security Features

### Multi-Factor Authentication
- TOTP (Time-based One-Time Password)
- SMS verification
- Email verification
- Backup codes

### Role-Based Access Control
- Administrator, Manager, Analyst, Viewer roles
- Granular permissions system
- User management interface

### Data Protection
- Field-level encryption for PII
- AES-256-GCM encryption at rest
- Automatic key rotation
- Data retention policies

### Compliance
- SOC 2 Type II certification
- GDPR compliance tools
- CCPA privacy controls
- Automated audit logging

## 📊 Performance Metrics

- **Initial Load**: <1 second
- **Interaction Times**: <200ms
- **Bundle Size**: <500KB main bundle
- **Core Web Vitals**: All green scores
- **Accessibility**: WCAG 2.1 AA compliant

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- **Website**: [https://mozawave.ai](https://mozawave.ai)
- **Documentation**: [https://docs.mozawave.ai](https://docs.mozawave.ai)
- **Support**: [support@mozawave.ai](mailto:support@mozawave.ai)
- **LinkedIn**: [MozaWave](https://linkedin.com/company/mozawave)

## 🙏 Acknowledgments

- Built with ❤️ by the MozaWave team
- Powered by [Supabase](https://supabase.com)
- Deployed on [Vercel](https://vercel.com)
- UI components from [Radix UI](https://radix-ui.com)

---

**Ready to transform your business intelligence?** [Start your free trial today](https://mozawave.vercel.app) 🚀