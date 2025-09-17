import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { DemoSection } from "@/components/DemoSection";
import { ChefHat, MessageSquare, Star, TrendingUp, Calendar, Users, Clock, Utensils, Pizza, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export function RestaurantsLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AI Reservation & Order Management for Restaurants | Moza AI"
        description="Handle reservations, takeout orders, and customer inquiries 24/7. AI that speaks your restaurant's language and increases bookings by 50%."
        canonical="/restaurants"
      />
      <Header />
      
      <section className="relative min-h-screen bg-restaurant-bg overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0 bg-gradient-restaurant opacity-10"></div>
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl" style={{backgroundColor: 'hsl(var(--restaurant-primary) / 0.15)'}}></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: 'hsl(var(--restaurant-accent) / 0.15)'}}></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-restaurant shadow-restaurant">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-foreground">Moza AI</h2>
                <p className="text-sm text-muted-foreground">Restaurant Intelligence</p>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-foreground leading-tight">
              Fill Every Table with
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Smart Reservations</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI that handles reservations, takeout orders, menu questions, and dietary requests 24/7. 
              Turn every customer interaction into a booking opportunity.
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
                <Utensils className="h-4 w-4 text-success" />
                50% More Reservations
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                1,200+ Restaurants Trust Us
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                Zero No-Shows with Reminders
              </div>
            </div>
          </div>

          {/* Restaurant-Specific Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-restaurant">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--restaurant-accent) / 0.1)', color: 'hsl(var(--restaurant-accent))'}}>
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Smart Table Management</h3>
                <p className="text-muted-foreground">
                  Books reservations based on real-time availability, party size, and special requests. 
                  Optimizes seating for maximum revenue.
                </p>
                <div className="text-sm font-semibold text-success">
                  30% better table turnover
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-restaurant">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--restaurant-primary) / 0.1)', color: 'hsl(var(--restaurant-primary))'}}>
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Menu Intelligence</h3>
                <p className="text-muted-foreground">
                  Answers questions about ingredients, allergens, and dietary restrictions. 
                  Suggests dishes and handles special requests perfectly.
                </p>
                <div className="text-sm font-semibold text-success">
                  95% accurate recommendations
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-all duration-300 shadow-restaurant">
              <GlassCardContent className="space-y-4">
                <div className="p-4 rounded-xl w-fit mx-auto" style={{backgroundColor: 'hsl(var(--restaurant-secondary) / 0.1)', color: 'hsl(var(--restaurant-secondary))'}}>
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Order Coordination</h3>
                <p className="text-muted-foreground">
                  Manages takeout and delivery orders, estimates prep times, 
                  and coordinates with your kitchen workflow seamlessly.
                </p>
                <div className="text-sm font-semibold text-success">
                  Faster order processing
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Restaurant Types Section */}
          <div className="max-w-4xl mx-auto mt-24 text-center space-y-12">
            <h2 className="text-4xl font-bold text-foreground">
              Built for Every Type of Restaurant
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-card border border-border rounded-lg">
                <Pizza className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Fast Casual & QSR</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Order-ahead and pickup times</li>
                  <li>• Loyalty program sign-ups</li>
                  <li>• Location and hours info</li>
                  <li>• Nutritional information</li>
                </ul>
              </div>
              
              <div className="p-6 bg-card border border-border rounded-lg">
                <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Fine Dining</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Premium reservation management</li>
                  <li>• Wine pairing suggestions</li>
                  <li>• Special occasion planning</li>
                  <li>• Private dining coordination</li>
                </ul>
              </div>

              <div className="p-6 bg-card border border-border rounded-lg">
                <Coffee className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Cafes & Bistros</h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Coffee customization options</li>
                  <li>• Event space bookings</li>
                  <li>• Catering inquiries</li>
                  <li>• Daily specials updates</li>
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