// Simplified One-Page Landing for testing
import React from 'react';

export const SimpleOnePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">MozaWave</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                Trusted by 500+ Businesses
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Losing Customers
              <br />
              <span className="text-blue-600">to Your Competitors</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              MozaWave gives you the intelligence to fight back. Track unlimited competitors, 
              manage your reputation with AI, and turn insights into revenue opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Free Trial
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>First 2 weeks free</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="text-blue-600"> Dominate Your Market</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop losing customers to competitors. Stop losing revenue to bad reviews. 
              Get the intelligence you need to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">MozaWave Market Watch</h3>
                    <p className="text-gray-600 text-sm">Competitor Intelligence</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Track unlimited competitors across 10+ platforms with real-time alerts and revenue opportunities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-500">✓</span>
                    <span className="text-sm">Real-time competitor tracking</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-500">✓</span>
                    <span className="text-sm">Price change alerts</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-blue-500">✓</span>
                    <span className="text-sm">New service detection</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-100">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">MozaWave Reputation</h3>
                    <p className="text-gray-600 text-sm">AI Review Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  AI automatically responds to reviews in your tone and generates more 5-star reviews.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">AI-powered review responses</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">Tone-matched replies</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">Review request campaigns</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-100">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Business Intelligence Dashboard</h3>
                    <p className="text-gray-600 text-sm">Unified Intelligence</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  See all your business intelligence in one place with AI-powered recommendations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-500">✓</span>
                    <span className="text-sm">Unified dashboard</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-500">✓</span>
                    <span className="text-sm">AI-powered insights</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="text-purple-500">✓</span>
                    <span className="text-sm">Anomaly detection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Dominate Your Market?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Join 500+ businesses already using MozaWave to track competitors, 
            manage reputation, and turn insights into revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border border-blue-300 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600/10 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleOnePage;
