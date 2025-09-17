import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { DemoSection } from "@/components/DemoSection";
import { Car, Droplets, Star, TrendingUp, Calendar, Users, Clock, Sparkles, CreditCard, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function CarWashLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AI Customer Management for Car Washes | Moza AI"
        description="Automate bookings, manage memberships, and increase customer retention. AI that handles scheduling, reminders, and upsells for car wash businesses."
        canonical="/car-wash"
      />
      <Header />
      
      <section className="relative min-h-screen bg-carwash-bg overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0 bg-gradient-carwash opacity-10"></div>
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl" style={{backgroundColor: 'hsl(var(--carwash-primary) / 0.15)'}}></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: 'hsl(var(--carwash-accent) / 0.15)'}}></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-carwash shadow-carwash">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-foreground">Moza AI</h2>
                <p className="text-sm text-muted-foreground">Car Wash Automation</p>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-foreground leading-tight">
              Keep Your Customers
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Coming Back</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI that manages memberships, schedules appointments, sends wash reminders, 
              and upsells services automatically. Turn one-time customers into loyal members.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/onboarding">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/dashboard">See Live Demo</Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-success" />
                50% More Repeat Customers
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                Used by 300+ Car Washes
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                35% Revenue Increase
              </div>
            </div>
          </div>

          {/* Car Wash-Specific Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-carwash">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--carwash-primary) / 0.1)', color: 'hsl(var(--carwash-primary))'}}>
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Smart Scheduling</h3>
                <p className="text-muted-foreground">
                  Book appointments for detailing, oil changes, and specialty services. 
                  Manage capacity and reduce wait times automatically.
                </p>
                <div className="text-sm font-semibold text-success">
                  40% better time management
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-carwash">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--carwash-secondary) / 0.1)', color: 'hsl(var(--carwash-secondary))'}}>
                  <CreditCard className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Membership Management</h3>
                <p className="text-muted-foreground">
                  Convert customers to unlimited wash plans, track usage, 
                  and send renewal reminders. Maximize lifetime value.
                </p>
                <div className="text-sm font-semibold text-success">
                  60% membership conversion
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-carwash">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--carwash-accent) / 0.1)', color: 'hsl(var(--carwash-accent))'}}>
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Smart Upselling</h3>
                <p className="text-muted-foreground">
                  Suggest wax, tire shine, and interior cleaning based on weather, 
                  season, and customer history. Increase average ticket size.
                </p>
                <div className="text-sm font-semibold text-success">
                  25% higher average sale
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Car Wash Benefits Section */}
          <div className="max-w-4xl mx-auto mt-24 text-center space-y-12">
            <h2 className="text-4xl font-bold text-foreground">
              Perfect for Every Car Wash Business
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-card border border-border rounded-lg">
                <Droplets className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Automatic & Self-Service</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Membership sign-up and management</li>
                  <li>• Weather-based wash reminders</li>
                  <li>• Equipment issue reporting</li>
                  <li>• Loyalty program automation</li>
                  <li>• Payment failure notifications</li>
                </ul>
              </div>
              
              <div className="p-6 bg-card border border-border rounded-lg">
                <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Full-Service & Detailing</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Appointment booking and confirmations</li>
                  <li>• Service package recommendations</li>
                  <li>• Quality follow-up and reviews</li>
                  <li>• Seasonal service promotions</li>
                  <li>• VIP customer recognition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <DemoSection />
    </div>
  );
}