import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Type, 
  Ruler, 
  CornerDownRight,
  Sun,
  Moon,
  Monitor,
  Sparkles,
  Zap,
  Heart,
  Star
} from 'lucide-react';
import { GlassmorphismCard, CompactGlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { EnhancedThemeToggle, CompactThemeToggle, ThemeIndicator } from '@/components/ui/enhanced-theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CompetitorComparisonChart, 
  SentimentDonutChart, 
  AlertIndicator 
} from '@/components/ui/animated-charts';

export const DesignSystemDemo: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const competitorData = [
    { name: 'MozaWave', score: 95, color: '#4F46E5' },
    { name: 'Competitor A', score: 82, color: '#10B981' },
    { name: 'Competitor B', score: 74, color: '#F59E0B' },
    { name: 'Competitor C', score: 68, color: '#EF4444' },
  ];

  const sentimentData = [
    { name: 'Positive', value: 85, color: '#10B981' },
    { name: 'Neutral', value: 12, color: '#F59E0B' },
    { name: 'Negative', value: 3, color: '#EF4444' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 glass-card border-b border-border/50 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center"
              >
                <Palette className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MozaWave Design System</h1>
                <p className="text-sm text-muted-foreground">Modern SaaS Dashboard Components</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeIndicator />
              <EnhancedThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Design Tokens Section */}
          <motion.section variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Design Tokens</h2>
              <p className="text-muted-foreground">Comprehensive design system with colors, typography, spacing, and more.</p>
            </div>

            {/* Color Palette */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <GlassmorphismCard
                title="Primary Colors"
                value=""
                icon={Palette}
                iconColor="primary"
                className="h-32"
              >
                <div className="flex space-x-2 mt-4">
                  <div className="w-8 h-8 rounded-lg bg-primary"></div>
                  <div className="w-8 h-8 rounded-lg bg-success"></div>
                  <div className="w-8 h-8 rounded-lg bg-warning"></div>
                  <div className="w-8 h-8 rounded-lg bg-error"></div>
                </div>
              </GlassmorphismCard>

              <GlassmorphismCard
                title="Typography"
                value=""
                icon={Type}
                iconColor="success"
                className="h-32"
              >
                <div className="space-y-1 mt-4">
                  <div className="text-xs">Inter Font Family</div>
                  <div className="text-sm font-medium">6 Text Sizes</div>
                  <div className="text-xs">Light to Bold Weights</div>
                </div>
              </GlassmorphismCard>

              <GlassmorphismCard
                title="Spacing"
                value=""
                icon={Ruler}
                iconColor="warning"
                className="h-32"
              >
                <div className="space-y-1 mt-4">
                  <div className="text-xs">4px Base Unit</div>
                  <div className="text-sm">4-96px Scale</div>
                  <div className="text-xs">Consistent Rhythm</div>
                </div>
              </GlassmorphismCard>

              <GlassmorphismCard
                title="Border Radius"
                value=""
                icon={CornerDownRight}
                iconColor="error"
                className="h-32"
              >
                <div className="space-y-1 mt-4">
                  <div className="text-xs">4px to 24px</div>
                  <div className="text-sm">5 Variants</div>
                  <div className="text-xs">Smooth Curves</div>
                </div>
              </GlassmorphismCard>
            </div>

            {/* Typography Scale */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Typography Scale</h3>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-foreground">Heading 1 - 36px</div>
                <div className="text-3xl font-semibold text-foreground">Heading 2 - 30px</div>
                <div className="text-2xl font-semibold text-foreground">Heading 3 - 24px</div>
                <div className="text-xl font-medium text-foreground">Heading 4 - 20px</div>
                <div className="text-lg font-medium text-foreground">Heading 5 - 18px</div>
                <div className="text-base text-foreground">Body Text - 16px</div>
                <div className="text-sm text-muted-foreground">Small Text - 14px</div>
                <div className="text-xs text-muted-foreground">Caption - 12px</div>
              </div>
            </div>
          </motion.section>

          {/* Glassmorphism Cards Section */}
          <motion.section variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Glassmorphism Cards</h2>
              <p className="text-muted-foreground">Semi-transparent cards with backdrop blur and smooth animations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <GlassmorphismCard
                title="Revenue Growth"
                value="$284,392"
                change={{ value: 12.5, type: 'increase', period: 'vs last month' }}
                icon={Zap}
                iconColor="success"
                trend={{ data: [20, 25, 30, 35, 40, 45, 42], type: 'line' }}
              />
              <GlassmorphismCard
                title="User Engagement"
                value="94.2%"
                change={{ value: 3.8, type: 'increase', period: 'vs last week' }}
                icon={Heart}
                iconColor="primary"
                trend={{ data: [85, 88, 90, 92, 94, 93, 94], type: 'bar' }}
              />
              <GlassmorphismCard
                title="Customer Rating"
                value="4.8"
                change={{ value: 0.2, type: 'increase', period: 'vs last month' }}
                icon={Star}
                iconColor="warning"
                trend={{ data: [4.5, 4.6, 4.7, 4.8, 4.8, 4.8, 4.8], type: 'line' }}
              />
            </div>

            {/* Compact Cards */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Compact Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CompactGlassmorphismCard
                  title="Conversion Rate"
                  value="24.3%"
                  change={{ value: 3.2, type: 'increase' }}
                  icon={Zap}
                  iconColor="success"
                  subtitle="Website visitors to customers"
                />
                <CompactGlassmorphismCard
                  title="Active Users"
                  value="12,847"
                  change={{ value: 8.2, type: 'increase' }}
                  icon={Heart}
                  iconColor="primary"
                  subtitle="Monthly active users"
                />
                <CompactGlassmorphismCard
                  title="Response Time"
                  value="1.2s"
                  change={{ value: -15.3, type: 'increase' }}
                  icon={Sparkles}
                  iconColor="success"
                  subtitle="Average API response"
                />
                <CompactGlassmorphismCard
                  title="Uptime"
                  value="99.9%"
                  change={{ value: 0.1, type: 'increase' }}
                  icon={Zap}
                  iconColor="primary"
                  subtitle="System availability"
                />
              </div>
            </div>
          </motion.section>

          {/* Data Visualization Section */}
          <motion.section variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Data Visualization</h2>
              <p className="text-muted-foreground">Animated charts and graphs with smooth transitions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <CompetitorComparisonChart data={competitorData} />
              <SentimentDonutChart data={sentimentData} />
            </div>

            {/* Alert Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AlertIndicator
                type="success"
                message="All systems operational"
                count={0}
              />
              <AlertIndicator
                type="warning"
                message="5 reviews pending response"
                count={5}
              />
              <AlertIndicator
                type="info"
                message="New competitor analysis available"
                count={1}
              />
            </div>
          </motion.section>

          {/* Theme Toggle Section */}
          <motion.section variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Theme System</h2>
              <p className="text-muted-foreground">Dark mode support with smooth transitions and localStorage persistence.</p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <Sun className="h-8 w-8 mx-auto mb-2 text-warning" />
                  <div className="text-sm font-medium">Light Mode</div>
                </div>
                <div className="text-center">
                  <Moon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Dark Mode</div>
                </div>
                <div className="text-center">
                  <Monitor className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-sm font-medium">System</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mt-6">
                <CompactThemeToggle />
                <ThemeIndicator />
                <EnhancedThemeToggle />
              </div>
            </div>
          </motion.section>

          {/* Component Showcase */}
          <motion.section variants={itemVariants}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Component Showcase</h2>
              <p className="text-muted-foreground">Buttons, badges, and interactive elements.</p>
            </div>

            <div className="space-y-6">
              {/* Buttons */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button className="glass-card">Glass</Button>
                </div>
              </div>

              {/* Badges */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Badges</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-success text-success-foreground">Success</Badge>
                  <Badge className="bg-warning text-warning-foreground">Warning</Badge>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-16 glass-card border-t border-border/50"
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="glass-card">
                Enterprise Ready
              </Badge>
              <Badge variant="outline" className="glass-card">
                TypeScript
              </Badge>
              <Badge variant="outline" className="glass-card">
                Framer Motion
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              MozaWave Design System • Modern SaaS Dashboard
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
