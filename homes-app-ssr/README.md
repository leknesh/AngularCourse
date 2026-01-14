# Angular Homes App (SSR Version)

This is the **Server-Side Rendered** version of the Angular Homes App.

## Setup

- Install dependencies

  `npm install`

- Start the JSON server (for API data)

  `json-server --watch db.json`

## Development

- Build the application

  `npm run build`

- Run the SSR server (port 4100)

  `node dist/server/server.mjs`

## How SSR Works

| Route | Render Mode | Description |
|-------|-------------|-------------|
| `/` (Home) | Prerender | Built at build time as static HTML |
| `/details/:id` | Server | Rendered fresh on each request |

## Key SSR Files

- `src/server.ts` - Express server
- `src/main.server.ts` - Server bootstrap
- `src/app/app.config.server.ts` - Server providers
- `src/app/app.routes.server.ts` - Route render modes

## Compare with CSR

The client-side rendered version is in `../homes-app` and runs on port 4200 with `ng serve`.