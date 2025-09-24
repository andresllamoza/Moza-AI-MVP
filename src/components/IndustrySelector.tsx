import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Users, 
  CheckCircle,
  Loader2,
  Star,
  Building2,
  Wrench,
  Smartphone
} from 'lucide-react';

interface IndustryCard {
  id: string;
  icon: React.ReactNode;
  headline: string;
  previewMetrics: string;
  sampleInsight: string;
  valueProp: string;
  cta: string;
  competitors: string[];
  color: string;
  gradient: string;
}

const industries: IndustryCard[] = [
  {
    id: 'restaurants',
    icon: <Building2 className="w-8 h-8" />,
    headline: "Restaurant & Food Service Intelligence",
    previewMetrics: "Track 12+ competitors like Olive Garden, Applebee's, Chili's",
    sampleInsight: "Chili's 2-for-$25 promotion detected - revenue impact analysis ready",
    valueProp: "Never miss a competitor's promotion or price change again",
    cta: "See Restaurant Demo",
    competitors: ["Olive Garden", "Applebee's", "Chili's", "Outback", "Red Lobster", "Buffalo Wild Wings"],
    color: "from-orange-500 to-red-500",
    gradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10"
  },
  {
    id: 'home-services',
    icon: <Wrench className="w-8 h-8" />,
    headline: "Home Services Competitive Intelligence",
    previewMetrics: "Monitor Roto-Rooter, Benjamin Franklin Plumbing, Mr. Rooter + more",
    sampleInsight: "Emergency service rates increased 25% - pricing opportunity detected",
    valueProp: "Dominate your service area with real-time competitor insights",
    cta: "See Home Services Demo",
    competitors: ["Roto-Rooter", "Benjamin Franklin", "Mr. Rooter", "ServiceTitan", "Angi", "HomeAdvisor"],
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 'electronics',
    icon: <Smartphone className="w-8 h-8" />,
    headline: "Electronics Retail Market Intelligence",
    previewMetrics: "Compete with Best Buy, Target, Amazon pricing + inventory",
    sampleInsight: "iPhone prices dropped 10% at Best Buy - price match recommended",
    valueProp: "Stay competitive against big box stores and online giants",
    cta: "See Retail Demo",
    competitors: ["Best Buy", "Target", "Amazon", "Walmart", "Costco", "Micro Center"],
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
  }
];

interface IndustrySelectorProps {
  onIndustrySelect: (industry: string) => void;
}

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({ onIndustrySelect }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleIndustryClick = async (industryId: string) => {
    setSelectedIndustry(industryId);
    setLoading(true);
    
    // Simulate loading process with progress indicators
    const loadingSteps = [
      "Analyzing market data...",
      "Loading competitor information...",
      "Generating insights...",
      "Preparing your dashboard..."
    ];
    
    for (let i = 0; i < loadingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (i === loadingSteps.length - 1) {
        setLoading(false);
        onIndustrySelect(industryId);
      }
    }
  };

  if (loading && selectedIndustry) {
    const industry = industries.find(i => i.id === selectedIndustry);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Loader2 className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Analyzing {industry?.headline.split(' ')[0]} Market
            </h2>
            <p className="text-gray-600">Loading competitor data and generating insights...</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <div className="space-y-4">
              {[
                "Analyzing market data...",
                "Loading competitor information...", 
                "Generating insights...",
                "Preparing your dashboard..."
              ].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.5 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: index * 0.5 
                    }}
                    className="w-3 h-3 bg-blue-500 rounded-full"
                  />
                  <span className="text-gray-700">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Trusted by 2,847+ businesses nationwide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Industry
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant competitive intelligence tailored to your business. 
              See how MozaWave helps companies like yours dominate their market.
            </p>
          </motion.div>

          {/* Credibility Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>As seen in TechCrunch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Featured in Forbes</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>SOC 2 Compliant</span>
            </div>
          </motion.div>
        </div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(industry.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleIndustryClick(industry.id)}
              className="group cursor-pointer"
            >
              <div className={`
                relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 
                hover:shadow-2xl transition-all duration-300 h-full
                ${hoveredCard === industry.id ? 'transform -translate-y-2' : ''}
              `}>
                {/* Industry Icon */}
                <div className={`
                  w-16 h-16 rounded-2xl bg-gradient-to-r ${industry.color} 
                  flex items-center justify-center text-white mb-6
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  {industry.icon}
                </div>

                {/* Headline */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {industry.headline}
                </h3>

                {/* Preview Metrics */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Live Metrics:</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {industry.previewMetrics}
                  </p>
                </div>

                {/* Sample Insight */}
                <div className={`${industry.gradient} rounded-lg p-4 mb-6`}>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Real-time Insight:</span>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    "{industry.sampleInsight}"
                  </p>
                </div>

                {/* Value Proposition */}
                <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                  {industry.valueProp}
                </p>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full py-3 px-6 rounded-lg font-medium text-white
                      bg-gradient-to-r ${industry.color} hover:shadow-lg
                      transition-all duration-300 flex items-center justify-center gap-2
                      group-hover:shadow-xl
                    `}
                  >
                    {industry.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onIndustrySelect(industry.id)}
                    className="w-full py-2 px-6 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Launch Visual Demo
                  </motion.button>
                </div>

                {/* Competitor Logos on Hover */}
                <AnimatePresence>
                  {hoveredCard === industry.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-medium text-gray-600">
                            Tracking Competitors:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {industry.competitors.map((competitor, idx) => (
                            <motion.span
                              key={competitor}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="text-xs bg-white px-2 py-1 rounded border text-gray-600"
                            >
                              {competitor}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Not sure which industry fits you best?
            </h3>
            <p className="text-gray-600 mb-6">
              Our AI automatically detects your industry and competitors once you start using MozaWave.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              Start Free Trial - AI Will Detect Your Industry
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};