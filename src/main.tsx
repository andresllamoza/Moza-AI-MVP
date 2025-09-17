import '@fontsource/inter';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/hooks/use-theme"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="moza-ai-theme">
    <App />
  </ThemeProvider>
);
