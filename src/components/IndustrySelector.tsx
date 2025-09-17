import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Hammer, Hotel, Car, UtensilsCrossed, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: Hammer,
    title: "General Contractors",
    description: "Stop losing jobs to slow responses. AI that captures, qualifies, and schedules contractor leads 24/7.",
    href: "/contractors",
    gradient: "from-orange-500 to-amber-500",
    shadowColor: "shadow-contractor",
    stats: { projects: "2,500+", leads: "300%", time: "40%" },
    features: ["Project Tracking", "Lead Scoring", "Bid Management"]
  },
  {
    icon: Hotel,
    title: "Hospitality",
    description: "Enhance guest experience with instant AI responses. Handle reservations, complaints, and inquiries 24/7.",
    href: "/hospitality", 
    gradient: "from-amber-500 to-yellow-500",
    shadowColor: "shadow-hospitality",
    stats: { bookings: "5,000+", satisfaction: "98%", response: "24/7" },
    features: ["Guest Communication", "Booking Automation", "Review Management"]
  },
  {
    icon: Car,
    title: "Car Washes",
    description: "Automate bookings, manage memberships, and increase customer retention with intelligent follow-up.",
    href: "/carwash",
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-carwash",
    stats: { customers: "10k+", retention: "85%", automation: "24/7" },
    features: ["Queue Management", "Subscription Billing", "Customer Alerts"]
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    description: "Handle reservations, takeout orders, and customer inquiries. Turn every interaction into a booking.",
    href: "/restaurants",
    gradient: "from-red-500 to-pink-500",
    shadowColor: "shadow-restaurant",
    stats: { orders: "50k+", efficiency: "60%", reviews: "4.8★" },
    features: ["Order Automation", "Customer Support", "Feedback Management"]
  }
];

export function IndustrySelector() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCard(index);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Industry-Specific Solutions</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-8 leading-tight">
            Built for Your
            <br />
            <span className="relative">
              Industry
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-primary rounded-full" />
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our AI platform adapts to your specific industry with specialized workflows, 
            custom automation, and proven results across thousands of businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Cursor follower effect */}
          {hoveredCard !== null && (
            <div 
              className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-all duration-500 z-0"
              style={{
                left: mousePosition.x - 192,
                top: mousePosition.y - 192,
              }}
            />
          )}

          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div 
                key={index} 
                className={`group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 rounded-2xl transition-all duration-500 hover:scale-105 z-10 ${
                  isHovered ? industry.shadowColor : 'hover:shadow-elegant'
                }`}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                
                <div className="p-8 relative z-10">
                  {/* Icon with animated background */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${industry.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-card rounded-3xl flex items-center justify-center">
                        <Icon className="w-10 h-10 text-foreground group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    {/* Floating badge */}
                    <div className="absolute -top-2 -right-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <TrendingUp className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {industry.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {industry.description}
                  </p>

                  {/* Feature highlights */}
                  <div className="space-y-2 mb-6">
                    {industry.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats preview */}
                  <div className="grid grid-cols-3 gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {Object.entries(industry.stats).map(([key, value], sIndex) => (
                      <div key={sIndex} className="text-center p-2 bg-muted/50 rounded-lg">
                        <div className="text-sm font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Link to={industry.href}>
                    <Button 
                      variant="outline" 
                      className={`group-hover:bg-gradient-to-r ${industry.gradient} group-hover:text-white group-hover:border-transparent transition-all duration-300 w-full group-hover:shadow-lg`}
                    >
                      Explore Solutions
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call-to-action section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-elegant">
            <div className="text-sm text-muted-foreground">
              Don't see your industry? We customize solutions for any business.
            </div>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground" asChild>
              <Link to="/onboarding">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}