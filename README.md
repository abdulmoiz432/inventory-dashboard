# E-Commerce Inventory & Stock Management Dashboard

React (Vite) app with class + functional components, hooks, Context theme, and localStorage persistence.

## Run
```
npm install
npm run dev
```

## CSR vs SSR

**Initial page load and server execution.** In Client-Side Rendering (a standard Vite + React SPA), the server sends an almost empty HTML file and a JavaScript bundle. The browser downloads the JS, runs React, and builds the page on the user's device. Until that finishes, the user sees a blank screen or a spinner. The server does very little work; it just serves static files. In Server-Side Rendering (Next.js), the server runs React for every request (or at build time) and sends fully built HTML. The user sees content immediately, then the browser "hydrates" the page so buttons and state start working. The server therefore does real computation on each request.

**Performance trade-offs.** CSR has a slower first paint, especially on weak phones or slow networks, because the bundle must load before anything shows. But after that first load, moving between pages feels very fast since no full page reloads happen. SSR gives a faster first contentful paint and better perceived speed, but each request costs server time, and hydration still needs JavaScript afterwards.

**SEO trade-offs.** Search engines and social media link previews read HTML best. SSR gives them complete product pages, which matters for public e-commerce catalogs. CSR pages can be indexed by Google, but it is slower and less reliable, and other crawlers may see an empty page.

**Hosting trade-offs.** A CSR app is just static files, so it can be hosted cheaply on Netlify, Vercel, GitHub Pages or any CDN and scales easily. SSR needs a running Node server or serverless functions, which costs more and needs more maintenance.

**Conclusion.** This inventory dashboard is a private, login-only admin tool, so SEO is irrelevant and CSR is the better, cheaper choice. For a public storefront with product pages that must rank on Google, SSR (Next.js) is the better choice.
