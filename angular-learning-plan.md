# Compressed 4-Week Angular Learning Plan

Given your C#/Android background, here's an accelerated plan:

---

## Week 1: TypeScript + CSS Essentials

### TypeScript

You already know C# - TypeScript is almost identical. Focus on differences only:

- 📺 [TypeScript in 100 Seconds - Fireship](https://www.youtube.com/watch?v=zQnBQ4tB3ZA) (2 min)
- 📺 [TypeScript for C# Developers](https://www.youtube.com/watch?v=MRLUylSe6Dc&list=PLo7rGmaumEKAOREGWbk6zlRTBn6fcyol4) (5 parts/15 min)
- 📺 [TypeScript tutorial for beginners](https://www.youtube.com/watch?v=d56mG7DezGs) (64 min)
- 📖 [TS for Java/C# Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html)

**Key differences from C#:**
- `interface` vs `type` (both work, use either)
- `?` for optional, `!` for non-null assertion
- `any` is the escape hatch (avoid it)

### CSS Essentials

Just learn Flexbox - it solves 90% of layout problems:

- 📺 [Flexbox in 15 Minutes - Web Dev Simplified](https://www.youtube.com/watch?v=fYq5PXgSsbE)
- 🎮 [Flexbox Froggy](https://flexboxfroggy.com/) - Complete in 30 min

Skip Grid for now. Learn it later if needed.

---

## Week 2: Angular Core + Architecture Basics

### Components, Templates, Data Binding

- 📺 [Angular in 100 Seconds - Fireship](https://www.youtube.com/watch?v=Ata9cSC2WpM) (2 min overview)
- 📖 [Official Angular Tutorial](https://angular.dev/tutorials/learn-angular) - **Do this!** (2-3 hours)

**Focus on:**
- `{{ interpolation }}`, `[property]` binding, `(event)` binding
- `*ngFor` / `*ngIf`
- `@Input()` / `@Output()`

### Services & DI

Your .NET DI knowledge transfers directly:
- 📺 [Angular Services in 10 Minutes](https://www.youtube.com/watch?v=G8zXugcYd7o)

### Architecture: Smart vs Dumb Components

Like MVVM in Android - separate logic from presentation:
- 📺 [Smart vs Presentational Components](https://www.youtube.com/watch?v=cWOB13HPAOQ) (10 min)

| Smart (Container) | Dumb (Presentational) |
|-------------------|----------------------|
| Fetches data, injects services | Receives data via `@Input()` |
| Handles business logic | Emits events via `@Output()` |
| Minimal template | Focus on UI/template |

**Folder Structure Pattern:**
```
src/app/
├── core/         # Singleton services, guards, interceptors
├── shared/       # Reusable components, pipes, directives
├── features/     # Feature modules (lazy loaded)
└── app.component.ts
```

---

## Week 3: Routing + RxJS + State Patterns

### Routing & Lazy Loading

- 📺 [Angular Routing Crash Course](https://www.youtube.com/watch?v=Np3ULAMqwNo) (30 min)
- 📺 [Lazy Loading in Angular](https://www.youtube.com/watch?v=J4SMAPqkFsg) (15 min)

### RxJS ⚠️ Most Important!

Think of it like Kotlin Flow:

- 📺 [RxJS Top Ten - Fireship](https://www.youtube.com/watch?v=ewcoEYS85Co) (12 min)
- 📺 [RxJS Quick Start](https://www.youtube.com/watch?v=2LCo926NFLI) (20 min)

**Essential operators:**

| Operator | What it does |
|----------|--------------|
| `map`, `filter` | Transform/filter data |
| `switchMap` | Chain API calls (cancels previous) |
| `tap` | Side effects (logging) |
| `catchError` | Handle errors |
| `debounceTime` | Wait before emitting (search) |

**Pro tip:** Use `async` pipe in templates - auto-subscribes/unsubscribes.

### State Management Patterns

- 📺 [Angular State Management Options](https://www.youtube.com/watch?v=lMPGlP6w8Rg) (15 min)

| Pattern | When to Use |
|---------|-------------|
| Services with BehaviorSubject | Small apps |
| Signals (Angular 17+) | Modern Angular |
| NgRx | Large apps, complex state |

---

## Week 4: Forms + Hosting + Production

### Reactive Forms

- 📺 [Angular Reactive Forms - Fireship](https://www.youtube.com/watch?v=1nL5wb2krcY) (10 min)

### Environment Configuration

```typescript
// environment.ts (dev)
export const environment = { production: false, apiUrl: 'http://localhost:3000' };

// environment.prod.ts
export const environment = { production: true, apiUrl: 'https://api.myapp.com' };
```

### Hosting & Deployment

#### CSR Hosting (Static Files)

Any static host - just upload `dist/browser/`:

| Platform | Notes |
|----------|-------|
| **Vercel** | `npm i -g vercel && vercel` |
| **Netlify** | Drag & drop or CLI |
| **Azure Static Web Apps** | Free tier, CI/CD built-in |
| **Firebase Hosting** | `firebase deploy` |

#### SSR Hosting (Node.js Required)

| Platform | Notes |
|----------|-------|
| **Azure App Service** | Node.js runtime |
| **Google Cloud Run** | Containerized, scales to zero |
| **Vercel** | Auto-detects Angular SSR |
| **Docker + any cloud** | Full control |

```bash
# Build & run SSR
npm run build
node dist/server/server.mjs
```

### Practice

- Add a "favorites" feature with state management
- Create a contact form with validation
- Deploy CSR version to Vercel or Netlify

---

## Priority Cheat Sheet

| Must Know | Learn Later | Skip for Now |
|-----------|-------------|--------------|
| Components | Signals | NgModules (legacy) |
| Services/DI | NgRx | Custom decorators |
| `*ngFor`, `*ngIf` | Animations | Zone.js internals |
| Basic RxJS | Interceptors/Guards | — |
| Reactive Forms | Testing | — |
| Routing + Lazy Loading | — | — |
| Smart/Dumb pattern | — | — |
| Basic hosting | Kubernetes | — |

---

## Decision Guides

### Architecture by App Size

| App Size | State Management | Structure |
|----------|------------------|-----------|
| Small (< 10 components) | Services + BehaviorSubject | Flat |
| Medium (10-50) | Signals | Feature folders |
| Large (50+) | NgRx | Nx monorepo |

### CSR vs SSR Hosting

| Requirement | CSR | SSR |
|-------------|-----|-----|
| SEO critical | ❌ | ✅ |
| Cheapest hosting | ✅ | ❌ |
| Fastest initial load | ❌ | ✅ |

---

## Quick Reference

- 📖 [Angular Docs](https://angular.dev)
- 📖 [RxJS Operators](https://www.learnrxjs.io/)
- 📺 [Fireship](https://www.youtube.com/@Fireship) - Quick overviews
- 📺 [Joshua Morony](https://www.youtube.com/@JoshuaMorony) - Modern patterns
