import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Bot, TrendingUp, Play, CheckCircle, Brain, Zap, Target, Clock, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function PremiumHeroSection() {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "300%", label: "Lead Increase", icon: TrendingUp },
    { value: "24/7", label: "AI Automation", icon: Bot },
    { value: "10k+", label: "Happy Clients", icon: CheckCircle }
  ];

  const features = [
    "AI-powered lead qualification",
    "Automated customer responses", 
    "Industry-specific workflows",
    "Real-time analytics dashboard"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-primary-glow/20 rounded-full blur-2xl animate-bounce delay-500" />
        
        {/* Floating cards */}
        <div className="absolute top-20 right-20 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 shadow-elegant animate-float hidden lg:block">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium">AI Active</span>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-20 bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-4 shadow-elegant animate-float delay-1000 hidden lg:block">
          <div className="text-2xl font-bold text-accent">98%</div>
          <div className="text-xs text-muted-foreground">Accuracy Rate</div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Brand header */}
          <div className={`flex items-center justify-center gap-3 mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-foreground">Moza AI</h2>
              <p className="text-sm text-muted-foreground">Enterprise Automation Platform</p>
            </div>
          </div>

          {/* Main heading with typewriter effect */}
          <h1 className={`text-6xl md:text-8xl font-extrabold mb-6 leading-tight transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Never Miss Another
            <br />
            <span className="relative bg-gradient-primary bg-clip-text text-transparent">
              Lead
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-primary rounded-full transform scale-x-0 animate-[scaleX_2s_ease-in-out_1s_forwards]" />
            </span>
          </h1>

          {/* Enhanced subheading */}
          <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            AI-powered email and SMS automation that captures, nurtures, and converts every customer inquiry. 
            Built specifically for businesses who can't afford to lose opportunities.
          </p>

          {/* Feature highlights */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-primary/10">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA section */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Button size="lg" className="group shadow-elegant hover:shadow-glow transition-all duration-500 bg-gradient-primary hover:scale-105 px-8 py-4 text-lg" asChild>
              <Link to="/onboarding">
                Get Started Free
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="group hover:bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300 px-8 py-4 text-lg" asChild>
              <Link to="/dashboard">
                <Play className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className={`flex flex-wrap items-center justify-center gap-8 mb-16 text-sm text-muted-foreground transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              No Setup Required
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-warning" />
              4.9/5 Customer Rating
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              40% More Leads Captured
            </div>
          </div>

          {/* Feature cards */}
          <div className={`grid md:grid-cols-3 gap-8 max-w-6xl mx-auto transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 text-center hover:shadow-elegant hover:scale-105 transition-all duration-300">
              <div className="p-4 rounded-xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Instant Response</h3>
              <p className="text-muted-foreground mb-4">
                AI responds within seconds of receiving an inquiry, ensuring no lead goes cold.
              </p>
              <div className="text-sm font-semibold text-success">
                Average response: &lt;30 seconds
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 text-center hover:shadow-elegant hover:scale-105 transition-all duration-300">
              <div className="p-4 rounded-xl bg-urgent/10 text-urgent w-fit mx-auto mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Smart Routing</h3>
              <p className="text-muted-foreground mb-4">
                Automatically categorizes and routes leads to the right team member.
              </p>
              <div className="text-sm font-semibold text-success">
                99.2% routing accuracy
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 text-center hover:shadow-elegant hover:scale-105 transition-all duration-300">
              <div className="p-4 rounded-xl bg-warning/10 text-warning w-fit mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">24/7 Operation</h3>
              <p className="text-muted-foreground mb-4">
                Captures leads around the clock, even when your team is off-site.
              </p>
              <div className="text-sm font-semibold text-success">
                Never miss weekend leads
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}