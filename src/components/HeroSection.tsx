import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Target, Clock, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              AI-Powered Email
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Classification</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Automatically categorize, prioritize, and route your emails with advanced AI. 
              Reduce response times by 75% and never miss an urgent email again.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="gap-2">
              See Live Demo
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="xl">
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Instant Classification</h3>
              <p className="text-muted-foreground text-sm">
                AI analyzes and categorizes emails in milliseconds
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Smart Routing</h3>
              <p className="text-muted-foreground text-sm">
                Automatically routes to the right department and priority level
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">24/7 Processing</h3>
              <p className="text-muted-foreground text-sm">
                Never stops working, even outside business hours
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}