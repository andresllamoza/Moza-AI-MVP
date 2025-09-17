import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { DemoSection } from "@/components/DemoSection";
import { Utensils, MessageSquare, Star, TrendingUp, Calendar, Users, Clock, Heart, Coffee, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function HospitalityLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AI Guest Communication for Hotels & Restaurants | Moza AI"
        description="Enhance guest experience with instant AI responses. Handle reservations, complaints, and inquiries 24/7. Increase guest satisfaction by 45%."
        canonical="/hospitality"
      />
      <Header />
      
      <section className="relative min-h-screen bg-hospitality-bg overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0 bg-gradient-hospitality opacity-10"></div>
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl" style={{backgroundColor: 'hsl(var(--hospitality-primary) / 0.15)'}}></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: 'hsl(var(--hospitality-accent) / 0.15)'}}></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-hospitality shadow-hospitality">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-foreground">Moza AI</h2>
                <p className="text-sm text-muted-foreground">Hospitality Excellence</p>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-foreground leading-tight">
              Delight Every Guest with
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Instant Service</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI-powered guest communication that handles reservations, answers questions, 
              manages complaints, and creates memorable experiences 24/7. Perfect for hotels, restaurants, and venues.
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
                <Heart className="h-4 w-4 text-success" />
                45% Higher Guest Satisfaction
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                Trusted by 500+ Properties
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                30% More Reservations
              </div>
            </div>
          </div>

          {/* Hospitality-Specific Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-hospitality">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--hospitality-primary) / 0.1)', color: 'hsl(var(--hospitality-primary))'}}>
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Instant Guest Support</h3>
                <p className="text-muted-foreground">
                  Respond to guest inquiries, room service requests, and special needs immediately. 
                  Turn every interaction into a 5-star experience.
                </p>
                <div className="text-sm font-semibold text-success">
                  Response time: &lt;15 seconds
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-hospitality">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--hospitality-accent) / 0.1)', color: 'hsl(var(--hospitality-accent))'}}>
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Smart Reservations</h3>
                <p className="text-muted-foreground">
                  Handle table bookings, room reservations, and event inquiries automatically. 
                  Sync with your existing booking system seamlessly.
                </p>
                <div className="text-sm font-semibold text-success">
                  Zero double-bookings
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-hospitality">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--hospitality-secondary) / 0.1)', color: 'hsl(var(--hospitality-secondary))'}}>
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Review Management</h3>
                <p className="text-muted-foreground">
                  Proactively address concerns before they become negative reviews. 
                  Encourage happy guests to share their experience online.
                </p>
                <div className="text-sm font-semibold text-success">
                  40% more positive reviews
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Industry Benefits Section */}
          <div className="max-w-4xl mx-auto mt-24 text-center space-y-12">
            <h2 className="text-4xl font-bold text-foreground">
              Built for Hospitality Excellence
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-card border border-border rounded-lg">
                <Coffee className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Restaurants & Cafes</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Instant table reservation confirmations</li>
                  <li>• Menu questions and dietary restrictions</li>
                  <li>• Special event bookings and catering</li>
                  <li>• Wait time updates and order status</li>
                  <li>• Feedback collection and review requests</li>
                </ul>
              </div>
              
              <div className="p-6 bg-card border border-border rounded-lg">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Hotels & Resorts</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Room availability and booking assistance</li>
                  <li>• Concierge services and local recommendations</li>
                  <li>• Housekeeping and maintenance requests</li>
                  <li>• Check-in/check-out support</li>
                  <li>• Guest experience follow-up</li>
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