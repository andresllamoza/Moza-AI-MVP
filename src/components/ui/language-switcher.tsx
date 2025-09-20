// Language Switcher Component
// Componente para cambiar idioma

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

import { 
  SupportedLanguage, 
  LANGUAGES, 
  setLanguage,
  DEFAULT_LANGUAGE 
} from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'minimal';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
  variant = 'default'
}) => {
  const handleLanguageChange = (language: SupportedLanguage) => {
    setLanguage(language);
    onLanguageChange(language);
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {Object.entries(LANGUAGES).map(([code, config]) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code as SupportedLanguage)}
            className={`p-2 rounded-lg transition-colors ${
              currentLanguage === code
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            title={config.nativeName}
          >
            <span className="text-lg">{config.flag}</span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 ${className}`}
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm">{LANGUAGES[currentLanguage].flag}</span>
            <span className="text-sm">{LANGUAGES[currentLanguage].code.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {Object.entries(LANGUAGES).map(([code, config]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code as SupportedLanguage)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{config.flag}</span>
                <div>
                  <div className="font-medium">{config.nativeName}</div>
                  <div className="text-sm text-slate-500">{config.name}</div>
                </div>
              </div>
              {currentLanguage === code && (
                <Check className="h-4 w-4 text-blue-500" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-3 ${className}`}
        >
          <Globe className="h-5 w-5" />
          <div className="flex items-center gap-2">
            <span className="text-lg">{LANGUAGES[currentLanguage].flag}</span>
            <span className="font-medium">{LANGUAGES[currentLanguage].nativeName}</span>
          </div>
          {currentLanguage !== DEFAULT_LANGUAGE && (
            <Badge variant="secondary" className="ml-2">
              {LANGUAGES[currentLanguage].code.toUpperCase()}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <div className="text-sm font-medium text-slate-700 mb-2">
            Select Language / Seleccionar Idioma
          </div>
          <div className="space-y-1">
            {Object.entries(LANGUAGES).map(([code, config]) => (
              <DropdownMenuItem
                key={code}
                onClick={() => handleLanguageChange(code as SupportedLanguage)}
                className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{config.flag}</span>
                  <div>
                    <div className="font-medium">{config.nativeName}</div>
                    <div className="text-sm text-slate-500">{config.name}</div>
                  </div>
                </div>
                <AnimatePresence>
                  {currentLanguage === code && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Check className="h-5 w-5 text-blue-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Language indicator component for showing current language
export const LanguageIndicator: React.FC<{
  language: SupportedLanguage;
  showText?: boolean;
  className?: string;
}> = ({ language, showText = true, className = '' }) => {
  const config = LANGUAGES[language];
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg">{config.flag}</span>
      {showText && (
        <span className="text-sm text-slate-600">
          {config.nativeName}
        </span>
      )}
    </div>
  );
};

// Language-aware text component
export const LanguageText: React.FC<{
  children: React.ReactNode;
  language: SupportedLanguage;
  className?: string;
}> = ({ children, language, className = '' }) => {
  const config = LANGUAGES[language];
  
  return (
    <span 
      className={className}
      lang={config.code}
      dir={config.direction}
    >
      {children}
    </span>
  );
};

export default LanguageSwitcher;
