# Beehome Creators — Render deployment

This is a Vite + React static site.

Render settings:

- Service type: Static Site
- Root Directory: blank (package.json is at repository root)
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

No environment variables are required by the current codebase.

Before deploying, verify the repository contains `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, and the `src/` directory at the repository root.
