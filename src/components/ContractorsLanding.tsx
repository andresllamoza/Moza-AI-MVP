import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { DemoSection } from "@/components/DemoSection";
import { Hammer, Clock, Shield, TrendingUp, Star, Zap, Target, Users, Calendar, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export function ContractorsLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AI Lead Management for General Contractors | Moza AI"
        description="Stop losing jobs to slow responses. AI that captures, qualifies, and schedules contractor leads 24/7. Get 40% more bookings with instant customer responses."
        canonical="/contractors"
      />
      <Header />
      
      <section className="relative min-h-screen bg-contractor-bg overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0 bg-gradient-contractor opacity-10"></div>
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl" style={{backgroundColor: 'hsl(var(--contractor-primary) / 0.15)'}}></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: 'hsl(var(--contractor-accent) / 0.15)'}}></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-contractor shadow-contractor">
                <Hammer className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-foreground">Moza AI</h2>
                <p className="text-sm text-muted-foreground">Built for Contractors</p>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-foreground leading-tight">
              Stop Losing Jobs to
              <span className="bg-gradient-contractor bg-clip-text text-transparent"> Slow Responses</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI that responds to every lead within 30 seconds, qualifies homeowners instantly, 
              and books estimates while you're on the job site. Never miss another project again.
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
                <Shield className="h-4 w-4 text-success" />
                No Setup - Works in 5 Minutes
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                Trusted by 2,000+ Contractors
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-urgent" />
                40% More Jobs Booked
              </div>
            </div>
          </div>

          {/* Contractor-Specific Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-contractor">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--contractor-primary) / 0.1)', color: 'hsl(var(--contractor-primary))'}}>
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Instant Lead Response</h3>
                <p className="text-muted-foreground">
                  Responds to every HomeAdvisor, Angie's List, and website lead in under 30 seconds. 
                  Beat your competition every time.
                </p>
                <div className="text-sm font-semibold text-success">
                  Response time: &lt;30 seconds
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-contractor">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--contractor-secondary) / 0.1)', color: 'hsl(var(--contractor-secondary))'}}>
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Auto-Schedule Estimates</h3>
                <p className="text-muted-foreground">
                  Qualifies homeowners and books estimate appointments directly to your calendar. 
                  No back-and-forth phone tag.
                </p>
                <div className="text-sm font-semibold text-success">
                  60% more estimates booked
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-contractor">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--contractor-accent) / 0.1)', color: 'hsl(var(--contractor-accent))'}}>
                  <Wrench className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Trade-Specific Intelligence</h3>
                <p className="text-muted-foreground">
                  Understands roofing, plumbing, HVAC, and construction terms. 
                  Qualifies leads with the right questions for your trade.
                </p>
                <div className="text-sm font-semibold text-success">
                  Better qualified leads
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Problem/Solution Section */}
          <div className="max-w-4xl mx-auto mt-24 text-center space-y-12">
            <h2 className="text-4xl font-bold text-foreground">
              The Problem Every Contractor Faces
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-lg">
                <h3 className="text-xl font-semibold text-destructive mb-4">Without Moza AI</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Miss 67% of leads because you're on job sites</li>
                  <li>• Lose jobs to contractors who respond faster</li>
                  <li>• Spend hours playing phone tag with homeowners</li>
                  <li>• Weekend and evening leads go unanswered</li>
                  <li>• Manual follow-up that never happens</li>
                </ul>
              </div>
              
              <div className="p-6 bg-success/5 border border-success/20 rounded-lg">
                <h3 className="text-xl font-semibold text-success mb-4">With Moza AI</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Capture 98% of leads automatically</li>
                  <li>• Be first to respond, every single time</li>
                  <li>• Qualified leads with appointment times</li>
                  <li>• Work 24/7, even when you're sleeping</li>
                  <li>• Automated follow-up that converts</li>
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