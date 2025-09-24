import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useEnhancedTheme } from '@/hooks/use-enhanced-theme';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const EnhancedThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { setTheme, theme, resolvedTheme } = useEnhancedTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            'relative h-10 w-10 rounded-full glass-card hover:shadow-glow transition-all duration-300',
            'border border-border/50 backdrop-blur-sm',
            className
          )}
        >
          <motion.div
            key={resolvedTheme}
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {resolvedTheme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={cn(
          'glass-card border-border/50 shadow-xl',
          'backdrop-blur-md bg-background/95'
        )}
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={cn(
            'cursor-pointer transition-colors duration-200',
            theme === "light" ? "bg-primary/10 text-primary" : "hover:bg-accent/50"
          )}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={cn(
            'cursor-pointer transition-colors duration-200',
            theme === "dark" ? "bg-primary/10 text-primary" : "hover:bg-accent/50"
          )}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={cn(
            'cursor-pointer transition-colors duration-200',
            theme === "system" ? "bg-primary/10 text-primary" : "hover:bg-accent/50"
          )}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === "system" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-2 w-2 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Compact version for mobile or smaller spaces
export const CompactThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { setTheme, theme, resolvedTheme } = useEnhancedTheme();

  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'relative h-9 w-9 rounded-lg glass-card hover:shadow-glow transition-all duration-300',
        'border border-border/50 backdrop-blur-sm',
        className
      )}
    >
      <motion.div
        key={resolvedTheme}
        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

// Theme indicator component
export const ThemeIndicator: React.FC<{ className?: string }> = ({ className }) => {
  const { resolvedTheme } = useEnhancedTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'flex items-center space-x-2 px-3 py-1 rounded-full glass-card',
        'border border-border/50 backdrop-blur-sm',
        className
      )}
    >
      <motion.div
        key={resolvedTheme}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className={cn(
          'w-2 h-2 rounded-full',
          resolvedTheme === 'dark' ? 'bg-primary' : 'bg-warning'
        )}
      />
      <span className="text-xs font-medium text-muted-foreground">
        {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </motion.div>
  );
};
