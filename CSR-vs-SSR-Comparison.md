# Client-Side Rendering vs Server-Side Rendering Comparison

This document compares the two Angular applications in this workspace:
- **homes-app** - Client-Side Rendered (CSR)
- **homes-app-ssr** - Server-Side Rendered (SSR)

---

## Quick Reference

| Feature | homes-app (CSR) | homes-app-ssr (SSR) |
|---------|-----------------|---------------------|
| Port | 4200 | 4100 |
| Start Command | `ng serve` | `node dist/server/server.mjs` |
| Build Output | `dist/browser/` | `dist/browser/` + `dist/server/` |
| Angular Version | 21 | 21 |

---

## How Rendering Works

### Client-Side Rendering (CSR)

```
Browser Request → Server sends empty HTML shell → Browser downloads JS → 
JS runs and fetches data → JS builds the page → User sees content
```

**Timeline:**
1. 🌐 Browser requests page
2. 📄 Server sends minimal HTML: `<app-root></app-root>`
3. 📦 Browser downloads JavaScript bundles
4. ⚙️ JavaScript executes
5. 🔄 App fetches data from API
6. 🎨 JavaScript renders content into DOM
7. 👁️ User finally sees the page

### Server-Side Rendering (SSR)

```
Browser Request → Server runs Angular + fetches data → Server sends complete HTML → 
User sees content immediately → JS loads for interactivity (hydration)
```

**Timeline:**
1. 🌐 Browser requests page
2. ⚙️ Server runs Angular application
3. 🔄 Server fetches data from API
4. 🎨 Server renders complete HTML
5. 📄 Server sends full HTML to browser
6. 👁️ User sees content immediately
7. 📦 JavaScript loads in background (hydration)

---

## File Structure Differences

### Files unique to SSR (homes-app-ssr)

| File | Purpose |
|------|---------|
| `src/server.ts` | Express server that handles HTTP requests and renders Angular |
| `src/main.server.ts` | Server-side bootstrap entry point |
| `src/app/app.config.ts` | Shared application configuration |
| `src/app/app.config.server.ts` | Server-specific providers (merges with app.config) |
| `src/app/app.routes.server.ts` | Defines render mode per route (Prerender vs Server) |

### package.json Differences

**CSR dependencies:**
```json
"@angular/platform-browser": "^21.0.8",
"@angular/platform-browser-dynamic": "^21.0.8"
```

**SSR additional dependencies:**
```json
"@angular/platform-server": "^21.0.8",
"@angular/ssr": "^21.0.5",
"express": "^5.1.0"
```

---

## main.ts Comparison

### CSR (homes-app/src/main.ts)
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routeConfig)
  ]
});
```

### SSR (homes-app-ssr/src/main.ts)
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// appConfig includes provideClientHydration() for rehydration
bootstrapApplication(AppComponent, appConfig);
```

**Key difference:** SSR uses `provideClientHydration()` which syncs the server-rendered HTML with the client-side JavaScript.

---

## angular.json Build Configuration

### CSR Build Options
```json
{
  "builder": "@angular-devkit/build-angular:application",
  "options": {
    "browser": "src/main.ts"
  }
}
```

### SSR Build Options
```json
{
  "builder": "@angular-devkit/build-angular:application",
  "options": {
    "browser": "src/main.ts",
    "server": "src/main.server.ts",
    "outputMode": "server",
    "ssr": {
      "entry": "src/server.ts"
    }
  }
}
```

---

## Route Render Modes (SSR only)

**File: `homes-app-ssr/src/app/app.routes.server.ts`**

```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender  // Built once at build time
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Server     // Rendered on each request
  }
];
```

| Render Mode | When Used | Use Case |
|-------------|-----------|----------|
| `Prerender` | Build time | Static pages that don't change often |
| `Server` | Each request | Dynamic pages with parameters or user-specific data |
| `Client` | Never on server | Pages that must run client-side only |

---

## Pros and Cons

### Client-Side Rendering (CSR)

✅ **Pros:**
- Simpler deployment (static files only)
- Lower server load
- Rich interactivity after initial load
- Easy to host on CDN

❌ **Cons:**
- Slower initial page load (Time to First Contentful Paint)
- Poor SEO (search engines see empty page)
- Doesn't work without JavaScript
- White screen while loading

### Server-Side Rendering (SSR)

✅ **Pros:**
- Faster initial page load
- Excellent SEO (full content in HTML)
- Works without JavaScript (basic content)
- Better Core Web Vitals scores

❌ **Cons:**
- More complex deployment (Node.js server required)
- Higher server load
- More complex caching strategies
- Potential hydration mismatches

---

## How to Test the Difference

### View Page Source

1. Open **http://localhost:4200** (CSR)
   - Right-click → "View Page Source"
   - You'll see: `<app-root></app-root>` (empty)

2. Open **http://localhost:4100** (SSR)
   - Right-click → "View Page Source"
   - You'll see: Full HTML with all the housing listings

### Disable JavaScript

1. Open DevTools → Settings → Disable JavaScript
2. Reload CSR page → **Blank page**
3. Reload SSR page → **Content still visible**

### Network Throttling

1. Open DevTools → Network → Slow 3G
2. Compare Time to First Contentful Paint between both apps

---

## Running Both Applications

```powershell
# Terminal 1: Start API server
cd homes-app
json-server --watch db.json
# API running on http://localhost:3000

# Terminal 2: Start CSR app
cd homes-app
ng serve
# CSR app running on http://localhost:4200

# Terminal 3: Build and start SSR app
cd homes-app-ssr
npm run build
node dist/server/server.mjs
# SSR app running on http://localhost:4100
```
