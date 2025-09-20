import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  MessageCircle, 
  BarChart3,
  Target,
  TrendingUp,
  Zap,
  Shield,
  Users,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Star,
  Building2,
  MapPin,
  Mail,
  Slack,
  Bot,
  Settings,
  Play
} from 'lucide-react';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProfessionalCard } from '@/components/ui/professional-card';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 1,
      name: "MozaWave Market Watch",
      description: "Stop losing customers to competitors who are raising prices, adding services, and running ads while you're sleeping. Get weekly intelligence digests that tell you exactly what to do.",
      icon: Eye,
      color: "text-blue-400 bg-blue-600/20",
      features: [
        "Know when competitors raise prices (so you can too)",
        "Get alerts when they launch new services",
        "Track their ad spend and copy what works",
        "Weekly digest email with actionable insights",
        "Never miss a competitive threat again",
        "Turn intelligence into revenue in days"
      ],
      verticals: ["Home Services", "Local Healthcare", "Restaurants"],
      pricing: "Starting at $99/month",
      href: "/services/competitor-tracker",
      stats: {
        competitors: "Unlimited",
        alerts: "Real-time",
        platforms: "10+"
      }
    },
    {
      id: 2,
      name: "MozaWave Reputation",
      description: "Stop losing customers because of bad reviews. AI automatically responds to Google and Yelp reviews in your tone, while nudging happy customers to leave 5-star reviews.",
      icon: MessageCircle,
      color: "text-green-400 bg-green-600/20",
      features: [
        "AI responds to reviews while you sleep",
        "Turn happy customers into 5-star reviewers",
        "Stop bad reviews from killing your business",
        "Increase your average rating by 0.5+ stars",
        "Save 10+ hours per week on reputation management",
        "More reviews = more customers = more revenue"
      ],
      verticals: ["Contractors", "Dentists", "Salons", "Gyms"],
      pricing: "Starting at $79/month",
      href: "/services/review-manager",
      stats: {
        platforms: "Google, Yelp, Facebook",
        responseRate: "95%",
        templates: "Unlimited"
      }
    },
    {
      id: 3,
      name: "Business Intelligence Dashboard",
      description: "Comprehensive analytics and insights combining internal customer data with external competitive intelligence.",
      icon: BarChart3,
      color: "text-purple-400 bg-purple-600/20",
      features: [
        "Unified intelligence platform",
        "Revenue pattern analysis",
        "Customer behavior insights",
        "Competitive positioning",
        "ROI tracking",
        "Custom reporting"
      ],
      verticals: ["All Industries"],
      pricing: "Starting at $149/month",
      href: "/dashboard",
      stats: {
        dataSources: "20+",
        insights: "Daily",
        reports: "Unlimited"
      }
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate manual tasks and focus on growing your business",
      stat: "Save 10+ hours per week"
    },
    {
      icon: DollarSign,
      title: "Increase Revenue",
      description: "Make data-driven decisions that directly impact your bottom line",
      stat: "Average 25% revenue increase"
    },
    {
      icon: Target,
      title: "Stay Competitive",
      description: "Always know what your competitors are doing and stay ahead",
      stat: "Real-time market intelligence"
    },
    {
      icon: Shield,
      title: "Protect Reputation",
      description: "Manage your online reputation with AI-powered responses",
      stat: "95% response rate"
    }
  ];

  const testimonials = [
    {
      quote: "MozaWave caught our biggest competitor raising prices by $5. We matched it the same day and added $2,000 to our monthly revenue.",
      author: "Sarah Johnson",
      company: "Brooklyn Pizza Co",
      industry: "Restaurant"
    },
    {
      quote: "Our Google rating went from 3.8 to 4.6 in 2 months. The AI responses are so good, customers think I wrote them personally.",
      author: "Mike Chen",
      company: "Green Clean Services",
      industry: "Home Services"
    },
    {
      quote: "We found out a competitor was advertising on Facebook for $3,000/month. We copied their strategy and got 40% more leads.",
      author: "Lisa Rodriguez",
      company: "TechStart Solutions",
      industry: "Technology"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">Two Problems. Two Solutions.</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Every week, small business owners face the same two struggles: <strong className="text-white">losing customers to competitors</strong> and <strong className="text-white">managing online reputation.</strong>
            <br /><br />
            We built two focused products to solve exactly these problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ProfessionalButton
              size="lg"
              className="btn-vibrant-primary text-lg px-8 py-4"
            >
              🚀 Start Free Trial
            </ProfessionalButton>
            <ProfessionalButton
              size="lg"
              variant="outline"
              className="btn-vibrant-secondary text-lg px-8 py-4"
            >
              📞 Book Demo Call
            </ProfessionalButton>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-12 mb-16"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <ProfessionalCard key={service.id} className="p-8 hover:bg-dark-700 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-4 rounded-lg ${service.color}`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                        <p className="text-lg text-primary-400">{service.pricing}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 text-lg">{service.description}</p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Key Features:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-success-400 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Perfect for:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.verticals.map((vertical, verticalIndex) => (
                          <span key={verticalIndex} className="px-3 py-1 bg-primary-600/20 text-primary-400 text-sm rounded-full">
                            {vertical}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ProfessionalButton
                      onClick={() => window.location.href = service.href}
                      size="lg"
                      className="btn-vibrant-primary"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </ProfessionalButton>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Service Stats:</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(service.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-dark-700/50 rounded-lg">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-white font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            );
          })}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose MozaWave?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <ProfessionalCard key={index} className="p-6 text-center">
                  <div className="p-4 bg-primary-600/20 rounded-lg w-fit mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-4">{benefit.description}</p>
                  <div className="text-2xl font-bold text-success-400">{benefit.stat}</div>
                </ProfessionalCard>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ProfessionalCard key={index} className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  <span className="inline-block px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded mt-2">
                    {testimonial.industry}
                  </span>
                </div>
              </ProfessionalCard>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <ProfessionalCard className="p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Stop Losing Money to Competitors</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 500+ small businesses who've turned competitive intelligence into real revenue. 
              <strong className="text-white"> Average customer sees $50K+ annual revenue increase.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProfessionalButton
                onClick={() => window.location.href = '/'}
                size="lg"
                className="btn-vibrant-primary"
              >
                🚀 Start Free Trial
              </ProfessionalButton>
              <ProfessionalButton
                size="lg"
                variant="outline"
              >
                📞 Book Demo Call
              </ProfessionalButton>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              ✓ Cancel anytime • ✓ First 2 weeks free • ✓ Setup in 5 minutes
            </p>
          </ProfessionalCard>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
