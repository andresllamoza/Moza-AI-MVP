# MozaWave Design System

A comprehensive, modern SaaS dashboard design system built with React 18, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Design Tokens

### Color Palette
- **Primary**: `#4F46E5` (Indigo) - Main brand color
- **Success**: `#10B981` (Emerald) - Positive actions and states
- **Warning**: `#F59E0B` (Amber) - Caution and attention needed
- **Error**: `#EF4444` (Red) - Errors and destructive actions

### Typography
- **Font Family**: Inter (Google Fonts)
- **Text Sizes**: 6 variants (12px to 36px)
- **Font Weights**: Light (300) to Bold (700)
- **Line Heights**: Tight (1.25), Normal (1.5), Relaxed (1.75)

### Spacing Scale
Based on 4px base unit:
- `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px`

### Border Radius
- `4px`, `8px`, `12px`, `16px`, `24px`, `full`

## 🪟 Glassmorphism Components

### GlassmorphismCard
Semi-transparent metric cards with:
- Backdrop blur effects
- Subtle borders with rgba opacity
- Hover animations with smooth transitions
- Drop shadows with multiple layers for depth
- Trend indicators with animated charts

### CompactGlassmorphismCard
Smaller variant for secondary metrics with:
- Condensed layout
- Essential information only
- Same glassmorphism effects

## 📊 Data Visualization

### CompetitorComparisonChart
Animated bar charts for competitor analysis:
- Smooth bar animations
- Color-coded competitors
- Percentage-based scoring

### SentimentDonutChart
Review sentiment visualization:
- Gradient-filled donut charts
- Animated data entry
- Legend with percentages

### RevenueImpactChart
Time-series revenue tracking:
- Dual-line charts (Revenue vs Impact)
- Responsive design
- Interactive tooltips

### AlertIndicator
System status indicators with:
- Pulse animations
- Color-coded alert types
- Count badges

### MetricTrendChart
Performance tracking with:
- Area charts with gradients
- Target line overlays
- Smooth animations

## 🌙 Dark Mode Support

### Enhanced Theme System
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Modern dark theme with proper contrast
- **System Mode**: Automatically follows OS preference
- **localStorage Persistence**: Remembers user preference
- **Smooth Transitions**: 300ms ease transitions between themes

### Theme Toggle Components
- **EnhancedThemeToggle**: Full dropdown with all options
- **CompactThemeToggle**: Cycle through themes
- **ThemeIndicator**: Visual theme status

## 🚀 Getting Started

### Installation
The design system is already integrated into the MozaWave project. No additional installation required.

### Usage

#### Basic Glassmorphism Card
```tsx
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';

<GlassmorphismCard
  title="Total Revenue"
  value="$284,392"
  change={{ value: 12.5, type: 'increase', period: 'vs last month' }}
  icon={DollarSign}
  iconColor="success"
  trend={{ data: [20, 25, 30, 35, 40, 45, 42], type: 'line' }}
/>
```

#### Theme Toggle
```tsx
import { EnhancedThemeToggle } from '@/components/ui/enhanced-theme-toggle';

<EnhancedThemeToggle />
```

#### Data Visualization
```tsx
import { CompetitorComparisonChart } from '@/components/ui/animated-charts';

<CompetitorComparisonChart 
  data={[
    { name: 'MozaWave', score: 95, color: '#4F46E5' },
    { name: 'Competitor A', score: 82, color: '#10B981' }
  ]} 
/>
```

## 🎯 Available Routes

- `/design-system` - Complete design system showcase
- `/modern-dashboard` - Full dashboard implementation

## 🛠️ Technical Stack

- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icon library
- **Radix UI** - Accessible component primitives

## 📱 Responsive Design

The design system is fully responsive with:
- Mobile-first approach
- Breakpoint-aware layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## ♿ Accessibility

Built with accessibility in mind:
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## 🎨 Customization

All design tokens are defined as CSS custom properties in `src/index.css`:
- Easy theme customization
- Consistent spacing and typography
- Scalable color system
- Flexible component variants

## 🔧 Development

### Adding New Components
1. Create component in `src/components/ui/`
2. Use design tokens from CSS custom properties
3. Add Framer Motion animations
4. Include TypeScript interfaces
5. Test in both light and dark modes

### Theme Customization
Modify CSS custom properties in `src/index.css`:
```css
:root {
  --primary: 238 100% 67%; /* Your primary color */
  --success: 160 84% 39%;  /* Your success color */
  /* ... other tokens */
}
```

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ for MozaWave by the development team.
