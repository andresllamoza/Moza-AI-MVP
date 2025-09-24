import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Smartphone, 
  Mail, 
  Key, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';

interface MFAStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  isCompleted: boolean;
}

interface MultiFactorAuthProps {
  isOpen: boolean;
  onComplete: (method: string) => void;
  onCancel: () => void;
  userEmail: string;
}

// TOTP Setup Component
const TOTPSetup: React.FC<{ onComplete: () => void; onBack: () => void }> = ({ onComplete, onBack }) => {
  const [qrCode, setQrCode] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
  const [secretKey, setSecretKey] = useState('JBSWY3DPEHPK3PXP');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const handleVerify = () => {
    // In real implementation, verify the TOTP code
    if (verificationCode.length === 6) {
      setIsVerified(true);
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Set Up Authenticator App</h3>
        <p className="text-gray-600">
          Use an authenticator app like Google Authenticator or Authy to generate verification codes.
        </p>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Step 1: Scan QR Code</h4>
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-lg border-2 border-gray-200">
            <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Scan this QR code with your authenticator app
          </p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Step 2: Enter Secret Key</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Input
              value={secretKey}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSecret(!showSecret)}
            >
              {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(secretKey)}
            >
              Copy
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            If you can't scan the QR code, enter this secret key manually
          </p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Step 3: Verify Setup</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter verification code from your app
            </label>
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="123456"
              maxLength={6}
              className="text-center text-lg font-mono tracking-widest"
            />
          </div>
          
          {isVerified && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-600"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Verification successful!</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleVerify}
          disabled={verificationCode.length !== 6 || isVerified}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isVerified ? 'Verified' : 'Verify & Enable'}
        </Button>
      </div>
    </div>
  );
};

// SMS Setup Component
const SMSSetup: React.FC<{ onComplete: () => void; onBack: () => void; phoneNumber: string }> = ({ 
  onComplete, 
  onBack, 
  phoneNumber 
}) => {
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleVerify = () => {
    if (code.length === 6) {
      setIsVerified(true);
      setTimeout(onComplete, 1000);
    }
  };

  const handleResend = () => {
    setResendTimer(60);
    // In real implementation, send SMS
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">SMS Verification</h3>
        <p className="text-gray-600">
          We've sent a verification code to <strong>{phoneNumber}</strong>
        </p>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Enter Verification Code</h4>
        <div className="space-y-4">
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            maxLength={6}
            className="text-center text-lg font-mono tracking-widest"
          />
          
          {isVerified && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-600"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Verification successful!</span>
            </motion.div>
          )}

          <div className="text-center">
            <Button
              variant="link"
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="text-sm"
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleVerify}
          disabled={code.length !== 6 || isVerified}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isVerified ? 'Verified' : 'Verify & Enable'}
        </Button>
      </div>
    </div>
  );
};

// Email Setup Component
const EmailSetup: React.FC<{ onComplete: () => void; onBack: () => void; email: string }> = ({ 
  onComplete, 
  onBack, 
  email 
}) => {
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    if (code.length === 6) {
      setIsVerified(true);
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Verification</h3>
        <p className="text-gray-600">
          We've sent a verification code to <strong>{email}</strong>
        </p>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Enter Verification Code</h4>
        <div className="space-y-4">
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            maxLength={6}
            className="text-center text-lg font-mono tracking-widest"
          />
          
          {isVerified && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-600"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Verification successful!</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleVerify}
          disabled={code.length !== 6 || isVerified}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isVerified ? 'Verified' : 'Verify & Enable'}
        </Button>
      </div>
    </div>
  );
};

// Backup Codes Component
const BackupCodes: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [codes] = useState([
    'ABCD-1234-EFGH',
    'IJKL-5678-MNOP',
    'QRST-9012-UVWX',
    'YZAB-3456-CDEF',
    'GHIJ-7890-KLMN',
    'OPQR-1357-STUV',
    'WXYZ-2468-ABCD',
    'EFGH-3690-IJKL',
    'MNOP-4812-QRST',
    'UVWX-5924-YZAB'
  ]);

  const [copied, setCopied] = useState(false);

  const handleCopyAll = () => {
    const allCodes = codes.join('\n');
    navigator.clipboard.writeText(allCodes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Your Backup Codes</h3>
        <p className="text-gray-600">
          These codes can be used to access your account if you lose your phone. Save them in a secure place.
        </p>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Backup Codes</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyAll}
            className="flex items-center gap-2"
          >
            {copied ? 'Copied!' : 'Copy All'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {codes.map((code, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg font-mono text-sm"
            >
              <span>{code}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                Copy
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Important:</p>
              <p>Each code can only be used once. Store these codes securely and don't share them.</p>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={onComplete} className="w-full bg-blue-600 hover:bg-blue-700">
        I've Saved My Backup Codes
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export const MultiFactorAuth: React.FC<MultiFactorAuthProps> = ({
  isOpen,
  onComplete,
  onCancel,
  userEmail
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const mfaSteps: MFAStep[] = [
    {
      id: 'method-selection',
      title: 'Choose Authentication Method',
      description: 'Select how you want to receive verification codes',
      icon: Shield,
      component: () => (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Enable Two-Factor Authentication</h3>
            <p className="text-gray-600">
              Add an extra layer of security to your account
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'totp',
                name: 'Authenticator App',
                description: 'Use Google Authenticator, Authy, or similar app',
                icon: Smartphone,
                recommended: true
              },
              {
                id: 'sms',
                name: 'SMS',
                description: 'Receive codes via text message',
                icon: Smartphone,
                recommended: false
              },
              {
                id: 'email',
                name: 'Email',
                description: 'Receive codes via email',
                icon: Mail,
                recommended: false
              }
            ].map((method) => (
              <motion.div
                key={method.id}
                className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                  selectedMethod === method.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedMethod(method.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center space-y-3">
                  <div className={`p-3 rounded-lg mx-auto w-fit ${
                    selectedMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <method.icon className={`w-6 h-6 ${
                      selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {method.recommended && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                      Recommended
                    </Badge>
                  )}
                  {selectedMethod === method.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {selectedMethod === 'sms' && (
            <div className="glass-card rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Phone Number</h4>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="font-mono"
              />
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              onClick={() => setCurrentStep(1)}
              disabled={!selectedMethod || (selectedMethod === 'sms' && !phoneNumber)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      ),
      isCompleted: false
    },
    {
      id: 'setup',
      title: 'Setup Authentication',
      description: 'Configure your chosen authentication method',
      icon: Key,
      component: () => {
        if (selectedMethod === 'totp') {
          return <TOTPSetup onComplete={() => setCurrentStep(2)} onBack={() => setCurrentStep(0)} />;
        } else if (selectedMethod === 'sms') {
          return <SMSSetup onComplete={() => setCurrentStep(2)} onBack={() => setCurrentStep(0)} phoneNumber={phoneNumber} />;
        } else {
          return <EmailSetup onComplete={() => setCurrentStep(2)} onBack={() => setCurrentStep(0)} email={userEmail} />;
        }
      },
      isCompleted: false
    },
    {
      id: 'backup-codes',
      title: 'Backup Codes',
      description: 'Save your backup codes for emergency access',
      icon: Key,
      component: () => <BackupCodes onComplete={() => onComplete(selectedMethod)} />,
      isCompleted: false
    }
  ];

  if (!isOpen) return null;

  const CurrentStepComponent = mfaSteps[currentStep].component;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h1>
              <p className="text-gray-600">Step {currentStep + 1} of {mfaSteps.length}</p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / mfaSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="bg-blue-600 h-2 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <CurrentStepComponent />
        </div>
      </motion.div>
    </div>
  );
};
