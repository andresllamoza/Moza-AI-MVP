import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Bot, Target, Clock, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 300,
    suffix: "%",
    label: "Lead Increase",
    description: "Average growth in qualified leads within first 90 days",
    color: "text-success"
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Happy Clients",
    description: "Businesses trust our AI platform worldwide",
    color: "text-primary"
  },
  {
    icon: Bot,
    value: 24,
    suffix: "/7",
    label: "AI Automation",
    description: "Round-the-clock intelligent customer service",
    color: "text-accent"
  },
  {
    icon: Target,
    value: 98,
    suffix: "%",
    label: "Accuracy Rate",
    description: "Precision in lead qualification and routing",
    color: "text-warning"
  },
  {
    icon: Clock,
    value: 5,
    suffix: "min",
    label: "Response Time",
    description: "Average time for AI to engage with leads",
    color: "text-urgent"
  },
  {
    icon: CheckCircle,
    value: 50,
    suffix: "k+",
    label: "Tasks Automated",
    description: "Monthly automated customer interactions",
    color: "text-success"
  }
];

export const InteractiveStats = () => {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger the animation of stats
          stats.forEach((_, index) => {
            setTimeout(() => {
              setVisibleStats(prev => [...prev, index]);
              animateValue(index);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateValue = (index: number) => {
    const targetValue = stats[index].value;
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentValue = Math.min(increment * currentStep, targetValue);
      
      setAnimatedValues(prev => {
        const newValues = [...prev];
        newValues[index] = Math.floor(currentValue);
        return newValues;
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Proven Results Across Industries
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real metrics from businesses that transformed their operations with our AI platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isVisible = visibleStats.includes(index);
            
            return (
              <div
                key={index}
                className={`group relative bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-700 hover:scale-105 hover:shadow-elegant ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl p-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                      <Icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                  </div>
                </div>

                {/* Animated value */}
                <div className="mb-4">
                  <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 font-mono`}>
                    {isVisible ? animatedValues[index].toLocaleString() : 0}{stat.suffix}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Progress bar effect */}
                <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-2000 ease-out ${
                      isVisible ? 'w-full' : 'w-0'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 500}ms` }}
                  />
                </div>

                {/* Floating indicator */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <TrendingUp className="w-3 h-3 text-primary-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-elegant">
            <div className="text-lg font-semibold text-foreground">
              Ready to join these success stories?
            </div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};