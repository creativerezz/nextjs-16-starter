import Link from "next/link";
import { ArrowRight, Code2, Palette, Rocket, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function DocsPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {/* Hero Section */}
      <div className="not-prose mb-12">
        <Badge variant="outline" className="mb-4">
          Documentation
        </Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          Next.js 16 Starter Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive guide to building modern web applications with Next.js 16,
          React 19, shadcn/ui, and Tailwind CSS v4.
        </p>
      </div>

      {/* Quick Links */}
      <div className="not-prose mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <Rocket className="mb-2 h-6 w-6 text-primary" />
            <CardTitle className="text-base">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Get up and running in minutes</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Code2 className="mb-2 h-6 w-6 text-primary" />
            <CardTitle className="text-base">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Modern tools and frameworks</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Palette className="mb-2 h-6 w-6 text-primary" />
            <CardTitle className="text-base">UI Components</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Beautiful shadcn/ui library</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Zap className="mb-2 h-6 w-6 text-primary" />
            <CardTitle className="text-base">Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Follow proven patterns</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Introduction */}
      <section id="introduction" className="mb-12 scroll-mt-20">
        <h2>Introduction</h2>
        <p>
          This starter template is built with the latest web technologies to help you
          create fast, modern, and production-ready applications. It combines the power
          of Next.js 16 with React 19, shadcn/ui components, and Tailwind CSS v4.
        </p>
        <Alert className="not-prose my-6">
          <AlertTitle>Next.js 16 Beta</AlertTitle>
          <AlertDescription>
            This project uses Next.js 16 beta with Turbopack as the default bundler.
            Be aware that some APIs may change before the stable release.
          </AlertDescription>
        </Alert>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="mb-12 scroll-mt-20">
        <h2>Philosophy</h2>
        <p>This starter follows key principles to ensure code quality and maintainability:</p>
        <ul>
          <li><strong>Type Safety First</strong> - Full TypeScript support with strict mode</li>
          <li><strong>Theme-Based Design</strong> - All colors use CSS variables for light/dark mode</li>
          <li><strong>Mobile-First Responsive</strong> - Designed for all screen sizes</li>
          <li><strong>Server Components by Default</strong> - Leverage React 19 Server Components</li>
          <li><strong>Accessibility</strong> - WCAG compliant components from shadcn/ui</li>
        </ul>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="mb-12 scroll-mt-20">
        <h2>Tech Stack</h2>

        <h3>Core Framework</h3>
        <ul>
          <li><strong>Next.js 16.0.0-beta.0</strong> - App Router with Turbopack</li>
          <li><strong>React 19.1.0</strong> - New JSX transform and Server Components</li>
          <li><strong>TypeScript 5</strong> - Strict mode enabled</li>
        </ul>

        <h3>Styling</h3>
        <ul>
          <li><strong>Tailwind CSS v4</strong> - Latest version with PostCSS</li>
          <li><strong>shadcn/ui</strong> - Beautifully designed components (New York style)</li>
          <li><strong>CVA</strong> - Class Variance Authority for component variants</li>
          <li><strong>Lucide React</strong> - Modern icon library</li>
        </ul>

        <h3>Build Tools</h3>
        <ul>
          <li><strong>Turbopack</strong> - Next.js built-in bundler</li>
          <li><strong>Bun</strong> - Fast package manager and runtime</li>
          <li><strong>ESLint</strong> - Code quality and consistency</li>
        </ul>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="mb-12 scroll-mt-20">
        <h2>Getting Started</h2>

        <h3>Prerequisites</h3>
        <p>Make sure you have Bun installed on your system:</p>
        <pre><code>curl -fsSL https://bun.sh/install | bash</code></pre>

        <h3>Installation</h3>
        <p>Clone and install dependencies:</p>
        <pre><code>{`git clone <your-repo>
cd next16
bun install`}</code></pre>

        <h3>Development</h3>
        <p>Start the development server with Turbopack:</p>
        <pre><code>bun dev</code></pre>
        <p>Open <Link href="http://localhost:3000" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">http://localhost:3000</Link> in your browser.</p>

        <h3>Build for Production</h3>
        <pre><code>{`bun build
bun start`}</code></pre>

        <Alert className="not-prose my-6" variant="default">
          <AlertTitle>Important: Use Bun</AlertTitle>
          <AlertDescription>
            This project uses Bun as the package manager. Always use <code>bun</code> commands
            instead of npm, yarn, or pnpm.
          </AlertDescription>
        </Alert>
      </section>

      {/* Development Workflow */}
      <section id="workflow" className="mb-12 scroll-mt-20">
        <h2>Development Workflow</h2>

        <h3>Adding shadcn/ui Components</h3>
        <p>Use the shadcn CLI to add components:</p>
        <pre><code>bunx shadcn@latest add button</code></pre>
        <p>Components are installed to <code>components/ui/</code> and can be imported:</p>
        <pre><code>{`import { Button } from "@/components/ui/button"`}</code></pre>

        <h3>Server vs Client Components</h3>
        <p>Use Server Components by default:</p>
        <pre><code>{`// Server Component (default)
export function StaticContent() {
  return <div>Static content</div>
}`}</code></pre>
        <p>Add <code>&quot;use client&quot;</code> only when needed:</p>
        <pre><code>{`"use client"

import { useState } from "react"

export function InteractiveContent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`}</code></pre>

        <h3>Async APIs in Next.js 16</h3>
        <p>Remember that cookies, headers, and params are now async:</p>
        <pre><code>{`// ✅ Next.js 16 (correct)
const cookieStore = await cookies()
const headersList = await headers()

// ❌ Next.js 15 syntax (doesn't work in v16)
const cookieStore = cookies()
const headersList = headers()`}</code></pre>
      </section>

      {/* Configuration */}
      <section id="configuration" className="mb-12 scroll-mt-20">
        <h2>Environment & Configuration</h2>

        <h3>Environment Variables</h3>
        <p>Create a <code>.env.local</code> file in the root directory:</p>
        <pre><code>{`# Example environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your-database-url
OPENAI_API_KEY=your-api-key`}</code></pre>

        <h3>Path Aliases</h3>
        <p>The project uses TypeScript path aliases configured in <code>tsconfig.json</code>:</p>
        <ul>
          <li><code>@/components</code> - React components</li>
          <li><code>@/components/ui</code> - shadcn/ui components</li>
          <li><code>@/lib</code> - Utility functions</li>
          <li><code>@/hooks</code> - Custom React hooks</li>
        </ul>
      </section>

      {/* Project Structure */}
      <section id="structure" className="mb-12 scroll-mt-20">
        <h2>Project Structure</h2>
        <pre><code>{`next16/
├── app/                    # App Router pages and layouts
│   ├── (marketing)/        # Marketing route group
│   │   ├── page.tsx        # Home page
│   │   └── docs/           # Documentation
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/             # React components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions
│   └── utils.ts            # cn() helper
├── hooks/                  # Custom React hooks
├── LLMS/                   # Documentation and guides
├── components.json         # shadcn/ui configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts`}</code></pre>
      </section>

      {/* UI & Styling */}
      <section id="styling" className="mb-12 scroll-mt-20">
        <h2>UI & Styling</h2>

        <h3>Theme Tokens</h3>
        <p><strong>Always use theme tokens, never hardcoded colors:</strong></p>
        <pre><code>{`// ✅ Good - Uses theme tokens
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground hover:bg-primary/90">

// ❌ Bad - Hardcoded colors
<div className="bg-white dark:bg-black text-black dark:text-white">
<button className="bg-blue-500 hover:bg-blue-600">`}</code></pre>

        <h3>Available Theme Tokens</h3>
        <ul>
          <li><code>bg-background</code> / <code>text-foreground</code> - Main background and text</li>
          <li><code>bg-card</code> / <code>text-card-foreground</code> - Card backgrounds</li>
          <li><code>bg-primary</code> / <code>text-primary-foreground</code> - Primary buttons</li>
          <li><code>bg-secondary</code> / <code>text-secondary-foreground</code> - Secondary buttons</li>
          <li><code>text-muted-foreground</code> - Secondary/muted text</li>
          <li><code>border-border</code> - Default borders</li>
        </ul>

        <h3>Responsive Padding Pattern</h3>
        <p>Use consistent responsive padding:</p>
        <pre><code>{`// ✅ Good
<div className="px-4 sm:px-6 lg:px-8">

// ❌ Bad - Inconsistent padding
<div className="px-16">`}</code></pre>

        <h3>Conditional Classes</h3>
        <p>Always use the <code>cn()</code> utility:</p>
        <pre><code>{`import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>`}</code></pre>
      </section>

      {/* Scripts & Tooling */}
      <section id="tooling" className="mb-12 scroll-mt-20">
        <h2>Scripts & Tooling</h2>

        <h3>Available Scripts</h3>
        <ul>
          <li><code>bun dev</code> - Start development server with Turbopack</li>
          <li><code>bun build</code> - Build for production</li>
          <li><code>bun start</code> - Start production server</li>
          <li><code>bun lint</code> - Run ESLint</li>
        </ul>

        <h3>Adding Dependencies</h3>
        <pre><code>{`bun add <package>           # Production dependency
bun add -d <package>        # Development dependency
bun remove <package>        # Remove dependency`}</code></pre>
      </section>

      {/* Next Steps */}
      <div className="not-prose mt-16 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-8 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              Ready to build?
            </h3>
            <p className="mb-6 text-base text-muted-foreground">
              Check out the LLMS folder for detailed patterns and examples on forms,
              authentication, layouts, and AI integration.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button size="lg" asChild>
                <Link href="/">
                  Back to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js Docs
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  shadcn/ui Docs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
