
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Load environment variables from .env files
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // This will ensure Vite properly replaces environment variables
  define: {
    // Ensure the import.meta object is defined
    '__SUPABASE_URL__': JSON.stringify(process.env.VITE_SUPABASE_URL || ''),
    '__SUPABASE_ANON_KEY__': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || '')
  }
}));
