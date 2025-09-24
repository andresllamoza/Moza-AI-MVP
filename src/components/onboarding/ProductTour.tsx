import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Play, 
  Pause,
  SkipForward,
  RotateCcw,
  HelpCircle,
  Target,
  Star,
  Award,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string; // CSS selector for the element to highlight
  position: 'top' | 'bottom' | 'left' | 'right';
  content: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  isInteractive?: boolean;
  completionReward?: {
    points: number;
    badge?: string;
  };
}

interface ProductTourProps {
  isActive: boolean;
  tourId: string;
  steps: TourStep[];
  onComplete: (tourId: string, progress: number) => void;
  onSkip: () => void;
  onPause: () => void;
  onResume: () => void;
}

export const ProductTour: React.FC<ProductTourProps> = ({
  isActive,
  tourId,
  steps,
  onComplete,
  onSkip,
  onPause,
  onResume
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const currentStepData = steps[currentStep];

  // Highlight the target element
  useEffect(() => {
    if (!isActive || !currentStepData) return;

    const element = document.querySelector(currentStepData.target) as HTMLElement;
    if (element) {
      setHighlightedElement(element);
      
      // Scroll element into view
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });

      // Add highlight class
      element.classList.add('tour-highlight');
      
      return () => {
        element.classList.remove('tour-highlight');
      };
    }
  }, [isActive, currentStep, currentStepData]);

  // Auto-advance if enabled
  useEffect(() => {
    if (!isPlaying || !isActive) return;

    const timer = setTimeout(() => {
      handleNext();
    }, 5000); // Auto-advance every 5 seconds

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, isActive]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setShowCompletion(true);
    onComplete(tourId, 100);
  };

  const handleSkip = () => {
    onSkip();
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause();
  };

  const handleResume = () => {
    setIsPlaying(true);
    onResume();
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    setShowCompletion(false);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (!isActive) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === overlayRef.current) {
            handlePause();
          }
        }}
      />

      {/* Tour Tooltip */}
      <AnimatePresence>
        {highlightedElement && !showCompletion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-50 max-w-sm"
            style={{
              top: currentStepData.position === 'bottom' 
                ? highlightedElement.offsetTop + highlightedElement.offsetHeight + 20
                : currentStepData.position === 'top'
                ? highlightedElement.offsetTop - 20
                : highlightedElement.offsetTop + highlightedElement.offsetHeight / 2,
              left: currentStepData.position === 'right'
                ? highlightedElement.offsetLeft + highlightedElement.offsetWidth + 20
                : currentStepData.position === 'left'
                ? highlightedElement.offsetLeft - 20
                : highlightedElement.offsetLeft + highlightedElement.offsetWidth / 2,
              transform: currentStepData.position === 'right' || currentStepData.position === 'left'
                ? 'translateY(-50%)'
                : 'translateX(-50%)'
            }}
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentStepData.title}</h3>
                    <p className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</p>
                  </div>
                </div>
                <button
                  onClick={handleSkip}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-gray-700 mb-3">{currentStepData.description}</p>
                {currentStepData.content}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-blue-600 h-1.5 rounded-full"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isPlaying ? handlePause : handleResume}
                    className="flex items-center gap-1"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRestart}
                    className="flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Restart
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      Back
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                  >
                    {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                    {currentStep === steps.length - 1 ? null : <ChevronRight className="w-3 h-3" />}
                  </Button>
                </div>
              </div>

              {/* Interactive Action */}
              {currentStepData.action && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    onClick={currentStepData.action.onClick}
                    variant="outline"
                    className="w-full"
                  >
                    {currentStepData.action.label}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Complete!</h2>
              <p className="text-gray-600 mb-6">
                Great job! You've completed the "{tourId}" tour and learned about key features.
              </p>

              {currentStepData.completionReward && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-gray-900">Reward Earned!</span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">+{currentStepData.completionReward.points} points</span>
                    </div>
                    {currentStepData.completionReward.badge && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        {currentStepData.completionReward.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleRestart}
                  className="flex-1"
                >
                  Take Again
                </Button>
                <Button
                  onClick={() => {
                    setShowCompletion(false);
                    onComplete(tourId, 100);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour CSS */}
      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 45 !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5) !important;
          border-radius: 8px !important;
          transition: box-shadow 0.3s ease !important;
        }
        
        .tour-highlight::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 2px solid #3b82f6;
          border-radius: 8px;
          pointer-events: none;
          z-index: 44;
        }
      `}</style>
    </>
  );
};

// Tour Manager Hook
export const useProductTour = () => {
  const [activeTour, setActiveTour] = useState<string | null>(null);
  const [tourProgress, setTourProgress] = useState<Record<string, number>>({});
  const [isPaused, setIsPaused] = useState(false);

  const startTour = (tourId: string) => {
    setActiveTour(tourId);
    setIsPaused(false);
  };

  const pauseTour = () => {
    setIsPaused(true);
  };

  const resumeTour = () => {
    setIsPaused(false);
  };

  const completeTour = (tourId: string, progress: number) => {
    setTourProgress(prev => ({ ...prev, [tourId]: progress }));
    setActiveTour(null);
    setIsPaused(false);
  };

  const skipTour = () => {
    setActiveTour(null);
    setIsPaused(false);
  };

  const getTourProgress = (tourId: string) => {
    return tourProgress[tourId] || 0;
  };

  const isTourCompleted = (tourId: string) => {
    return tourProgress[tourId] === 100;
  };

  return {
    activeTour,
    isPaused,
    startTour,
    pauseTour,
    resumeTour,
    completeTour,
    skipTour,
    getTourProgress,
    isTourCompleted
  };
};
