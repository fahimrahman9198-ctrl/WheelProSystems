---
name: nextjs-15-app-router
description: Build production-ready websites and applications with Next.js 15 App Router, TypeScript, and modern React patterns. Use this skill whenever the user wants to create a new Next.js project, set up the App Router file structure, build pages or layouts, create API routes, deploy to Vercel, or integrate Next.js with Tailwind CSS, databases, authentication, or payments. Trigger especially when the user mentions Next.js, App Router, server components, client components, or asks for a modern React-based website.
---

# Next.js 15 App Router

A practical skill for building production-ready websites and full-stack applications using Next.js 15 with the App Router architecture.

## When to use this skill

Use this skill when:
- Creating a new Next.js project from scratch
- Setting up the App Router file-based routing system
- Building pages, layouts, or nested routes
- Creating API routes for backend functionality
- Configuring TypeScript with Next.js
- Integrating Tailwind CSS for styling
- Deploying to Vercel
- Adding authentication (Clerk), payments (Stripe), or databases (Neon Postgres)
- Optimizing performance with Image and font optimization

## Quick Setup

### Initial Project Creation

Always create new projects with these flags for a complete setup:

```bash
npx create-next-app@latest project-name \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Then `cd` into the project and run `npm run dev` to verify it works on `http://localhost:3000`.

## File Structure (App Router)

```
project-name/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (required)
│   │   ├── page.tsx            # Homepage (required)
│   │   ├── globals.css         # Global styles
│   │   ├── about/
│   │   │   └── page.tsx        # /about route
│   │   ├── services/
│   │   │   └── page.tsx        # /services route
│   │   └── api/
│   │       └── route-name/
│   │           └── route.ts    # API endpoint
│   ├── components/             # Reusable components
│   └── lib/                    # Utilities, helpers
├── public/                     # Static assets (images, fonts)
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## Core Concepts

### 1. Server Components (Default)

By default, all components in the App Router are **Server Components**. They render on the server and ship zero JavaScript to the client.

```typescript
// src/app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Welcome</h1>
      <p>This renders on the server</p>
    </main>
  );
}
```

### 2. Client Components

For interactivity (useState, useEffect, onClick, etc.), add `'use client'` at the top:

```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Rule of thumb:** Keep components as Server Components unless they need browser-only features.

### 3. Layouts

Layouts persist across routes. Create a `layout.tsx` to wrap all child pages:

```typescript
// src/app/layout.tsx
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>Site Navigation</header>
        {children}
        <footer>Site Footer</footer>
      </body>
    </html>
  );
}
```

### 4. Dynamic Routes

Use square brackets for dynamic segments:

```
src/app/blog/[slug]/page.tsx       → /blog/anything
src/app/products/[id]/page.tsx     → /products/123
```

Access the dynamic parameter:

```typescript
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}
```

### 5. API Routes

Create backend endpoints in `src/app/api/`:

```typescript
// src/app/api/leads/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // Save to database, send email, etc.
  return NextResponse.json({ success: true, data: body });
}

export async function GET() {
  return NextResponse.json({ message: 'Hello from API' });
}
```

## Tailwind CSS Integration

### Custom Brand Colors

Update `tailwind.config.ts` to add brand colors:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-onyx': '#0A0A0B',
        'brand-graphite': '#1E1E22',
        'brand-red': '#D81E2A',
        'brand-white': '#F5F5F7',
      },
      fontFamily: {
        display: ['Archivo Black', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Important:** Use Tailwind v3.4, NOT v4. v4 has different configuration syntax and breaking changes.

## Image Optimization

Always use Next.js `<Image>` component instead of `<img>`:

```typescript
import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero image"
      width={1920}
      height={1080}
      priority  // For above-the-fold images
      className="w-full h-auto"
    />
  );
}
```

**For backgrounds:** Use `fill` with a parent `relative` container:

```typescript
<div className="relative w-full h-screen">
  <Image
    src="/images/hero.jpg"
    alt="Hero"
    fill
    className="object-cover"
    priority
  />
  <div className="relative z-10">Your content</div>
</div>
```

## Metadata and SEO

Define page metadata in each page or layout:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Site Name',
  description: 'Description for search engines and social shares',
  openGraph: {
    title: 'Page Title',
    description: 'Description',
    images: ['/images/og-image.jpg'],
  },
};

export default function Page() {
  return <main>Content</main>;
}
```

## Common Patterns

### Linking Between Pages

Use Next.js `<Link>` for client-side navigation:

```typescript
import Link from 'next/link';

<Link href="/services" className="text-brand-red hover:underline">
  View Services
</Link>
```

### Loading States

Create a `loading.tsx` file in any route directory:

```typescript
// src/app/services/loading.tsx
export default function Loading() {
  return <div>Loading services...</div>;
}
```

### Error Handling

Create an `error.tsx` file:

```typescript
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Deployment to Vercel

### Initial Deployment

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo, then:
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

Then:
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"

Vercel auto-detects Next.js and deploys with optimal settings.

### Subsequent Deployments

Push to main branch and Vercel auto-deploys:

```bash
git add .
git commit -m "Add new feature"
git push origin main
```

### Environment Variables

Add secrets in Vercel dashboard:
1. Go to project Settings → Environment Variables
2. Add variables like `DATABASE_URL`, `STRIPE_SECRET_KEY`
3. Redeploy to apply changes

Access in code:

```typescript
const apiKey = process.env.STRIPE_SECRET_KEY;
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep secrets without this prefix.

## Common Pitfalls and Solutions

### "Module not found" errors
Run `npm install` again. If using a new package, restart the dev server.

### Images not loading on Vercel but work locally
Make sure images are in `public/` directory and committed to git. Run `git status` to check.

### Tailwind classes not working
- Verify `tailwind.config.ts` content paths include `./src/**/*.{js,ts,jsx,tsx}`
- Check `globals.css` has the three Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### Hydration errors
Usually caused by browser-only APIs (window, localStorage) in Server Components. Either:
- Move that code to a Client Component (`'use client'`)
- Wrap in `useEffect` (only runs on client)

### Server vs Client Component confusion
- **Server Component:** Default. Cannot use hooks (useState, useEffect) or browser APIs.
- **Client Component:** Add `'use client'`. Cannot be async. Cannot directly fetch server-only data.

### Build fails on Vercel but works locally
Check for:
- Unused imports causing lint errors
- TypeScript errors (run `npm run build` locally first)
- Missing environment variables

## Production Checklist

Before deploying to production:

- [ ] All pages have metadata (title, description)
- [ ] Images use Next.js Image component
- [ ] No console.log statements in production code
- [ ] Environment variables are set in Vercel
- [ ] Run `npm run build` locally and verify success
- [ ] Test all pages on mobile (responsive)
- [ ] Verify all links work
- [ ] Check that loading and error states display correctly
- [ ] SEO basics in place (sitemap.xml, robots.txt)
- [ ] Analytics integrated (optional but recommended)

## Performance Tips

1. **Use Server Components** by default — they ship zero JS
2. **Lazy load** heavy client components with `dynamic()`
3. **Optimize images** with `next/image` and use proper sizing
4. **Use static generation** when possible (default in App Router)
5. **Minimize client-side state** — push it to URL params when feasible

## Example: Complete Page

A real-world example combining the concepts:

```typescript
// src/app/services/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services | Western Wheelcraft',
  description: 'Premium wheel refinishing services in BC',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-onyx text-brand-white">
      <section className="relative h-screen">
        <Image
          src="/images/services-hero.jpg"
          alt="Services hero"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="font-display text-6xl">Our Services</h1>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service cards */}
        </div>
      </section>

      <div className="text-center py-12">
        <Link
          href="/quote"
          className="bg-brand-red text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition"
        >
          Get a Quote
        </Link>
      </div>
    </main>
  );
}
```

## Resources

- Official Next.js docs: https://nextjs.org/docs
- App Router migration guide: https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration
- Vercel deployment docs: https://vercel.com/docs

## Skill Tips

When building with this skill:

1. **Always verify the dev server runs** (`npm run dev`) before adding features
2. **Commit often** — small commits make debugging easier
3. **Test on mobile** — use browser dev tools responsive mode
4. **Build locally before deploying** (`npm run build`) to catch errors early
5. **Keep components small** — easier to debug and reuse
6. **Use TypeScript strictly** — it catches errors before runtime
