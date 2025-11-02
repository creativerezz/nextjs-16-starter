# Next.js 16 + shadcn/ui Integration Guide

Comprehensive guide for integrating shadcn/ui components with Next.js 16 (App Router).

---

## 🚀 Quick Start

### Installation

```bash
# Initialize shadcn/ui in your Next.js project
bunx shadcn@latest init
```

Answer the prompts:
- **Style:** New York
- **Base color:** Neutral (or your preference)
- **CSS variables:** Yes
- **React Server Components:** Yes
- **Icon library:** Lucide

### Add Your First Component

```bash
bunx shadcn@latest add button
```

---

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with fonts and providers
├── page.tsx            # Home page
└── globals.css         # Tailwind + shadcn/ui styles

components/
├── ui/                 # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── theme-provider.tsx  # Dark mode provider
└── sections/           # Your custom sections
    ├── hero.tsx
    └── features.tsx

lib/
└── utils.ts            # cn() helper function

hooks/                  # Custom React hooks
└── use-toast.ts
```

---

## 🎨 Styling with Tailwind CSS v4

### Global Styles

Your `app/globals.css` should look like this:

```css
/* app/globals.css */
@import "tailwindcss";

/* shadcn/ui CSS variables */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... more color mappings */
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode variables */
}
```

### Using the cn() Utility

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className // Accept external className prop
)} />
```

---

## 🔧 Component Patterns

### Server Components (Default)

```tsx
// components/sections/hero.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="container py-20">
      <h1 className="text-4xl font-bold">Welcome to Acme</h1>
      <p className="text-muted-foreground mt-4">
        Build amazing things with Next.js and shadcn/ui
      </p>
      <Button className="mt-6">
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </section>
  )
}
```

### Client Components (Interactive)

```tsx
// components/theme-toggle.tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

---

## 🌓 Dark Mode Setup

### 1. Install next-themes

```bash
bun add next-themes
```

### 2. Create Theme Provider

```tsx
// components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### 3. Update Root Layout

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 📦 Common Component Combinations

### Card with Content

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PricingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pro Plan</CardTitle>
        <CardDescription>For growing teams</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">$29/mo</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Subscribe</Button>
      </CardFooter>
    </Card>
  )
}
```

### Dialog with Form

```tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Contact Us</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <Button className="w-full">Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### Navigation Menu

```tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Acme
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Button>Sign In</Button>
        </nav>
      </div>
    </header>
  )
}
```

---

## 🎯 Best Practices

### 1. Use Theme Tokens

**✅ Good:**
```tsx
<div className="bg-background text-foreground border-border" />
```

**❌ Bad:**
```tsx
<div className="bg-white text-black border-gray-200 dark:bg-black dark:text-white" />
```

### 2. Responsive Design

```tsx
<div className="px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl">
    Responsive Heading
  </h1>
</div>
```

### 3. Component Composition

```tsx
// ✅ Compose smaller components
export function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
```

### 4. Server Components First

```tsx
// Server Component (default)
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section>
      <Button>Static Action</Button>
    </section>
  )
}

// Only add "use client" when needed
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Counter() {
  const [count, setCount] = useState(0)
  return <Button onClick={() => setCount(count + 1)}>{count}</Button>
}
```

---

## 🔗 Next.js 16 Specific Features

### Async Request APIs

In Next.js 16, these APIs are now async:

```tsx
// ✅ Next.js 16
import { cookies, headers } from 'next/headers'

export async function Page() {
  const cookieStore = await cookies()
  const headersList = await headers()

  return <div>...</div>
}

// ❌ Next.js 15 and earlier
const cookieStore = cookies()
const headersList = headers()
```

### Turbopack

Next.js 16 uses Turbopack by default - no configuration needed!

```bash
# Development with Turbopack (default)
bun dev

# Production build with Turbopack (default)
bun build
```

---

## 📚 Component Discovery

### Using MCP (Claude Code, Cursor, etc.)

```bash
# Initialize MCP for shadcn
bunx shadcn@latest mcp init --client claude
```

Then ask your AI assistant:
- "Show me all available shadcn components"
- "Add a contact form using shadcn components"
- "Create a pricing section with cards"

### CLI Search

```bash
# Search for components
bunx shadcn@latest search @shadcn -q "form"
bunx shadcn@latest search @shadcn -q "dialog"

# View component details
bunx shadcn@latest view button card dialog

# List all components
bunx shadcn@latest list @shadcn
```

---

## 🐛 Troubleshooting

### CSS Variables Not Working

Make sure you have the `@theme inline` directive in `globals.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... all color mappings */
}
```

### Components Not Found

Check your `components.json` aliases:

```json
{
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "utils": "@/lib/utils"
  }
}
```

### Dark Mode Flickering

Add `suppressHydrationWarning` to `<html>`:

```tsx
<html lang="en" suppressHydrationWarning>
```

---

## 🚀 Next Steps

- Explore [Component Examples](./component-examples.md)
- Learn [Form Patterns](../patterns/forms.md)
- Review [Layout Patterns](../patterns/layouts.md)
- Check [Authentication Patterns](../patterns/authentication.md)
