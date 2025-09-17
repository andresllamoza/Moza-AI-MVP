import '@fontsource/inter';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/hooks/use-theme"
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <ThemeProvider defaultTheme="system" storageKey="moza-ai-theme">
      <App />
    </ThemeProvider>
  </ErrorBoundary>
);
