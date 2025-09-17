import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Download, 
  Share2,
  Mail,
  Zap,
  Target,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useEmailStore } from '@/store/emailStore';
import { ROICalculation } from '@/types';

const ROICalculator: React.FC = () => {
  const { roiCalculation, calculateROI, currentBusinessType } = useEmailStore();
  const [inputs, setInputs] = useState({
    emailVolume: 50,
    timePerEmail: 5,
    hourlyRate: 50
  });

  useEffect(() => {
    calculateROI(inputs.emailVolume, inputs.timePerEmail, inputs.hourlyRate);
  }, [inputs, calculateROI]);

  const handleInputChange = (field: keyof typeof inputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const businessTypeLabels = {
    contractor: 'Contractor',
    restaurant: 'Restaurant',
    ecommerce: 'E-commerce'
  };

  const getBusinessTypeColor = (type: string) => {
    switch (type) {
      case 'contractor': return 'bg-blue-100 text-blue-800';
      case 'restaurant': return 'bg-green-100 text-green-800';
      case 'ecommerce': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!roiCalculation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating ROI...</p>
        </div>
      </div>
    );
  }

  const currentCost = (roiCalculation.currentEmailVolume * roiCalculation.currentTimePerEmail * roiCalculation.currentHourlyRate) / 60;
  const savingsPercentage = (roiCalculation.projectedCostSavings / currentCost) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ROI Calculator</h1>
              <p className="text-gray-600">Calculate your potential savings with EmailFlow AI</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getBusinessTypeColor(currentBusinessType)}>
                {businessTypeLabels[currentBusinessType]}
              </Badge>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Your Current Email Workflow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Daily Email Volume */}
                <div>
                  <Label className="text-base font-medium">Daily Email Volume</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Emails per day</span>
                      <span className="text-lg font-semibold">{inputs.emailVolume}</span>
                    </div>
                    <Slider
                      value={[inputs.emailVolume]}
                      onValueChange={(value) => handleInputChange('emailVolume', value[0])}
                      max={200}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>10</span>
                      <span>200</span>
                    </div>
                  </div>
                </div>

                {/* Time per Email */}
                <div>
                  <Label className="text-base font-medium">Time per Email</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Minutes per email</span>
                      <span className="text-lg font-semibold">{inputs.timePerEmail}</span>
                    </div>
                    <Slider
                      value={[inputs.timePerEmail]}
                      onValueChange={(value) => handleInputChange('timePerEmail', value[0])}
                      max={30}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 min</span>
                      <span>30 min</span>
                    </div>
                  </div>
                </div>

                {/* Hourly Rate */}
                <div>
                  <Label className="text-base font-medium">Hourly Rate</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Dollars per hour</span>
                      <span className="text-lg font-semibold">${inputs.hourlyRate}</span>
                    </div>
                    <Slider
                      value={[inputs.hourlyRate]}
                      onValueChange={(value) => handleInputChange('hourlyRate', value[0])}
                      max={200}
                      min={15}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$15</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Current Costs */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Current Email Costs</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily time spent:</span>
                      <span className="font-medium">
                        {Math.round((inputs.emailVolume * inputs.timePerEmail) / 60 * 10) / 10} hours
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily cost:</span>
                      <span className="font-medium">${currentCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly cost:</span>
                      <span className="font-medium">${(currentCost * 22).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual cost:</span>
                      <span className="font-medium">${(currentCost * 22 * 12).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Projected Savings with EmailFlow AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Savings Display */}
                <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${roiCalculation.projectedCostSavings.toFixed(2)}
                  </div>
                  <div className="text-lg text-gray-600 mb-1">saved per day</div>
                  <div className="text-sm text-gray-500">
                    {savingsPercentage.toFixed(1)}% reduction in email costs
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Savings Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Time Saved</p>
                          <p className="text-xs text-gray-600">Daily</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">
                          {Math.round(roiCalculation.projectedTimeSaved / 60 * 10) / 10}h
                        </p>
                        <p className="text-xs text-gray-500">
                          {Math.round(roiCalculation.projectedTimeSaved)} min
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Cost Savings</p>
                          <p className="text-xs text-gray-600">Monthly</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-blue-600">
                          ${(roiCalculation.projectedCostSavings * 22).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${(roiCalculation.projectedCostSavings * 22 * 12).toFixed(2)}/year
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Target className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">ROI Percentage</p>
                          <p className="text-xs text-gray-600">Return on investment</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-purple-600">
                          {roiCalculation.roiPercentage.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">per month</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Additional Benefits</h3>
                  <div className="space-y-2">
                    {[
                      'Automated email categorization',
                      'Priority-based sorting',
                      'Reduced manual processing time',
                      'Better email organization',
                      'Improved response times',
                      'Reduced human error'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Free Trial
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Results
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Start Saving Time and Money?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of businesses already using EmailFlow AI to automate their email management 
                and save hours every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Try Free Demo
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ROICalculator;
