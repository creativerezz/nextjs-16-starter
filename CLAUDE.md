# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (beta) project using the App Router architecture, React 19, and Tailwind CSS v4. The project is configured with shadcn/ui components (New York style) and uses Bun as the package manager. It includes AI SDK integration for OpenAI.

## Development Commands

### Package Management
Use Bun instead of npm/yarn/pnpm:
- `bun install` - Install dependencies
- `bun add <package>` - Add a dependency
- `bun remove <package>` - Remove a dependency

### Development Server
- `bun dev` - Start development server with Turbopack (default port: 3000)
- `bun start` - Start production server

### Build
- `bun build` - Build for production using Turbopack

### Code Quality
- `bun lint` - Run ESLint

## Technology Stack

### Core Framework
- **Next.js 16.0.0-beta.0** with App Router
- **React 19.1.0** and React DOM 19.1.0
- **TypeScript 5** with strict mode enabled
- **Turbopack** as the bundler (both dev and build)

### Styling
- **Tailwind CSS v4** with PostCSS configuration
- **shadcn/ui** components (New York style variant)
- **CVA** (class-variance-authority) for component variants
- **Lucide React** for icons
- **tw-animate-css** for animations

### AI Integration
- **Vercel AI SDK** (@ai-sdk/react, @ai-sdk/openai)
- Configured for OpenAI integration

### Build Tools
- **Turbopack** (Next.js built-in, replacing Webpack)
- **PostCSS** for CSS processing
- **ESLint** with Next.js config

## Project Structure

```
next16/
├── app/                    # App Router pages and layouts
│   ├── layout.tsx          # Root layout with font configuration
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles and Tailwind directives
├── lib/                    # Utility functions
│   └── utils.ts            # cn() helper for class merging
├── components/             # React components (to be added)
│   └── ui/                 # shadcn/ui components (to be added)
├── hooks/                  # Custom React hooks (to be added)
├── components.json         # shadcn/ui configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
└── postcss.config.mjs      # PostCSS configuration
```

## Path Aliases

The project uses TypeScript path aliases configured in tsconfig.json:
- `@/*` maps to the root directory
- shadcn/ui specific aliases (from components.json):
  - `@/components` - React components
  - `@/components/ui` - shadcn/ui components
  - `@/lib` - Utility functions
  - `@/lib/utils` - Main utils file
  - `@/hooks` - Custom React hooks

## shadcn/ui Configuration

shadcn/ui is pre-configured with the following settings:
- **Style**: New York variant
- **RSC**: Enabled (React Server Components)
- **Base color**: Neutral
- **CSS Variables**: Enabled
- **Icon library**: Lucide React
- **CSS location**: app/globals.css

### Adding shadcn/ui Components
Use the MCP shadcn tool or run:
```bash
bunx shadcn@latest add <component-name>
```

Components will be installed to `components/ui/` and can be imported as:
```typescript
import { Button } from "@/components/ui/button"
```

## TypeScript Configuration

Key TypeScript settings:
- **Strict mode**: Enabled
- **Target**: ES2017
- **Module resolution**: bundler
- **JSX**: react-jsx (React 19 new JSX transform)
- **Incremental compilation**: Enabled

## Next.js 16 Beta Features

This project uses Next.js 16 beta which includes:
- **Turbopack** as the default bundler (replaces Webpack)
- **React 19** support
- **Async Request APIs** (cookies, headers, params are now async)
- Enhanced App Router features

### Important: Async APIs
In Next.js 16, the following APIs are now async and must be awaited:
- `cookies()`
- `headers()`
- `params` (route parameters)
- `searchParams` (query parameters)

Example:
```typescript
// Next.js 16 (correct)
const cookieStore = await cookies()
const headersList = await headers()

// Next.js 15 and earlier (incorrect in v16)
const cookieStore = cookies()
const headersList = headers()
```

## Fonts

The project uses Vercel's Geist font family:
- **Geist Sans** (--font-geist-sans)
- **Geist Mono** (--font-geist-mono)

Fonts are loaded via next/font/google in app/layout.tsx.

## ESLint Configuration

ESLint is configured with:
- `next/core-web-vitals` rules
- `next/typescript` rules
- Ignores: node_modules, .next, out, build, next-env.d.ts

## Development Workflow

### Starting a New Feature
1. Check if shadcn/ui components exist for UI needs
2. Use App Router conventions (app/ directory)
3. Leverage React Server Components by default
4. Use Client Components only when needed ('use client' directive)

### Adding Dependencies
Always use Bun:
```bash
bun add <package>           # Production dependency
bun add -d <package>        # Development dependency
```

### Working with Styles
1. Use Tailwind utility classes
2. Use `cn()` from `@/lib/utils` for conditional classes
3. Follow shadcn/ui patterns for component styling
4. Tailwind v4 uses native CSS cascade layers

### AI SDK Usage
The project includes AI SDK dependencies:
- Use `@ai-sdk/react` for React hooks
- Use `@ai-sdk/openai` for OpenAI integration
- Import from `ai` package for core utilities

## Development Guidelines

This project follows strict development guidelines documented in `.cursorrules`. Key principles:

### Layout & Spacing
- Use `Container` component from `@/components/container` for consistent padding
- Responsive padding pattern: `px-4 sm:px-6 lg:px-8` (mobile → tablet → desktop)
- Never use excessive padding like `px-16` that breaks mobile layouts

### Theming & Colors
- **Always use theme tokens** (bg-background, text-foreground, etc.)
- **Never use hardcoded colors** (bg-white, text-black, bg-zinc-500, etc.)
- All colors must respect light/dark mode via CSS variables

### Navigation
- Always use `Link` from `next/link` for both internal and external links
- Never use `<a>` tags for navigation
- External links need `target="_blank"` and `rel="noopener noreferrer"`

### Component Patterns
- Server Components by default (no "use client")
- Add "use client" only for hooks, events, or browser APIs
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Import shadcn/ui components from `@/components/ui/*`

See `.cursorrules` for complete guidelines.

## Documentation References

The `/LLMS` directory contains comprehensive documentation for the technologies used in this project:

### AI SDK
- `ai-6sdk-vercel.md` - AI SDK 6 Beta documentation with agent abstractions, tool execution approval, structured output, reranking support, and more

### shadcn/ui
- `shadcn.txt` - Complete shadcn/ui documentation index
- `shadcn/intro.md` - Introduction to shadcn/ui principles and overview
- `shadcn/cli.md` - Command-line tool documentation for installing and managing components
- `shadcn/nextjs.md` - Installation and configuration guide for Next.js projects
- `shadcn/theming.md` - Theming guide for customizing colors, typography, and design tokens
- `shadcn/dark-mode.md` - Dark mode implementation and configuration
- `shadcn/monorepo.md` - Using shadcn/ui in monorepo setups
- `shadcn/registry.md` - Registry system documentation for publishing and distributing components
- `shadcn/mcp.md` - Model Context Protocol integration for AI-assisted component discovery

These files provide comprehensive guides for integrating AI capabilities and building UI components with shadcn/ui in your Next.js project.

## Important Notes

- **Use Bun**: This project uses Bun, not npm/yarn/pnpm
- **Turbopack**: Both dev and build use Turbopack (--turbopack flag)
- **React 19**: Uses the new JSX transform and React 19 features
- **Next.js Beta**: Be aware this is Next.js 16 beta - some APIs may change
- **Async APIs**: Remember to await cookies(), headers(), params in Next.js 16
- **App Router Only**: This project uses App Router exclusively, no Pages Router

## Unsure?

If you are unsure about any aspect of the project, refer to the relevant documentation in the `/LLMS` directory or consult the development guidelines outlined in this file and `/CLAUDE_RULES.md` `.cursorrules`. Always prioritize following established conventions and best practices to maintain code quality and consistency.