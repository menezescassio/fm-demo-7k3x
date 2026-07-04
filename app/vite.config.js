import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is parametrized so promote is a clean rebuild, never a hand-edit:
//   preview  → DEPLOY_BASE=/fm-demo-7k3x/next/   (default)
//   promoted → DEPLOY_BASE=/fm-demo-7k3x/
//   local    → DEPLOY_BASE=/  (npm run dev / preview)
// https://vite.dev/config/
export default defineConfig({
  base: process.env.DEPLOY_BASE || '/',
  plugins: [react()],
})
