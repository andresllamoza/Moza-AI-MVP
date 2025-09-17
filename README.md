# EmailFlow AI - Email Automation Demo

A professional, demo-ready application that showcases email automation capabilities for small businesses. Built with modern React technologies and designed to win consulting clients.

## 🚀 Features

### Core Functionality
- **Interactive Email Demo** - Drag-and-drop email sorting with real-time filtering
- **Smart Dashboard** - Analytics and insights with beautiful charts
- **ROI Calculator** - Interactive calculator showing potential savings
- **Professional Landing Page** - Modern design with clear value proposition
- **Multi-Business Support** - Tailored for contractors, restaurants, and e-commerce

### Technical Features
- **Drag & Drop Interface** - Powered by @dnd-kit for smooth interactions
- **Real-time Analytics** - Charts and metrics using Recharts
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for professional feel
- **State Management** - Zustand for efficient state handling
- **TypeScript** - Full type safety throughout the application

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **React Router** for navigation
- **Recharts** for data visualization
- **@dnd-kit** for drag-and-drop
- **Lucide React** for icons
- **Radix UI** for accessible components

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Radix UI)
│   ├── demo/         # Demo-specific components
│   └── layout/       # Layout components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── store/            # Zustand state management
├── data/             # Mock data and generators
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/andresllamoza/Moza-AI-MVP.git
   cd Moza-AI-MVP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 📱 Pages & Features

### Landing Page (`/`)
- Professional hero section with value proposition
- Problem/solution showcase
- Interactive demo preview
- Business type selection
- Clear call-to-action buttons

### Email Demo (`/demo`)
- Interactive email sorting interface
- Drag-and-drop functionality
- Real-time filtering and search
- Business type switching
- Email categorization and prioritization

### Smart Dashboard (`/dashboard`)
- Email volume charts
- Processing time metrics
- Category breakdown pie charts
- Time savings visualization
- Performance insights

### ROI Calculator (`/roi-calculator`)
- Interactive input sliders
- Real-time cost calculations
- Projected savings display
- Business-specific metrics
- Export and share functionality

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible contrast

### Components
- Consistent spacing and sizing
- Hover states and transitions
- Loading states and micro-interactions
- Mobile-responsive design

## 📊 Mock Data

The application includes realistic sample data for three business types:

### Contractor Business
- Kitchen renovation quotes
- Bathroom remodeling estimates
- Roof repair requests
- Electrical work inquiries
- Plumbing issues

### Restaurant Business
- Table reservations
- Catering inquiries
- Supplier emails
- Customer reviews
- Job applications

### E-commerce Business
- Order confirmations
- Return requests
- Customer service tickets
- Product inquiries
- Marketing emails

## 🔧 Customization

### Adding New Business Types
1. Update the `BusinessType` enum in `src/types/index.ts`
2. Add mock data in `src/data/mockData.ts`
3. Update the business profiles object
4. Add UI components as needed

### Modifying Email Categories
1. Update the `EmailCategory` type in `src/types/index.ts`
2. Add category colors in the store
3. Update mock data generation
4. Modify UI components

### Styling Changes
- All styles use Tailwind CSS classes
- Custom colors defined in `tailwind.config.ts`
- Component variants in `src/lib/utils.ts`

## 📈 Performance

- **Bundle Size**: Optimized with Vite
- **Loading Time**: < 2 seconds initial load
- **Animations**: 60fps smooth transitions
- **Responsive**: Works on all device sizes
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🎯 Business Value

This demo application is designed to:

1. **Showcase Technical Expertise** - Demonstrates modern React development skills
2. **Prove ROI** - Interactive calculator shows clear business value
3. **Engage Prospects** - Interactive demo keeps visitors engaged
4. **Close Deals** - Professional design builds trust and credibility

## 📞 Support

For questions or support:
- Email: support@emailflowai.com
- Documentation: [docs.emailflowai.com](https://docs.emailflowai.com)
- Issues: [GitHub Issues](https://github.com/andresllamoza/Moza-AI-MVP/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for small businesses who want to automate their email management.**# Enterprise-Grade Update - Wed Sep 17 03:41:28 EDT 2025
