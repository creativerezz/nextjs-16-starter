# Layout Patterns with shadcn/ui

Comprehensive guide to building common layout patterns using shadcn/ui components and Next.js 16.

---

## 🎨 Basic Layout Structure

### Root Layout

```tsx
// app/layout.tsx
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 🏠 Marketing/Landing Page Layout

### Simple Header + Footer Layout

```tsx
// components/layouts/marketing-layout.tsx
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

### Header Component

```tsx
// components/header.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Acme</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Docs
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
```

### Footer Component

```tsx
// components/footer.tsx
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Acme Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

---

## 📱 Dashboard Layout

### Dashboard with Sidebar

```tsx
// app/(dashboard)/layout.tsx
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1">
        <DashboardHeader />
        <main className="container py-6">{children}</main>
      </div>
    </div>
  )
}
```

### Sidebar Component

```tsx
// components/dashboard-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, Users, BarChart, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/dashboard/analytics",
  },
  {
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/dashboard/documents",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background lg:block lg:w-64">
      <div className="flex h-full flex-col gap-2">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold">Acme</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === route.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
```

### Dashboard Header

```tsx
// components/dashboard-header.tsx
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Search */}
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@username" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
```

---

## 📊 Using shadcn/ui Sidebar Component

### Modern Sidebar Layout

```tsx
// app/(dashboard)/layout.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, Settings, Users } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <h2 className="px-2 text-lg font-semibold">Acme Dashboard</h2>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard">
                        <Home />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/users">
                        <Users />
                        <span>Users</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/settings">
                        <Settings />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <p className="px-2 text-xs text-muted-foreground">
              &copy; 2025 Acme Inc.
            </p>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background px-6 py-4">
            <SidebarTrigger />
          </header>
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
```

---

## 📄 Documentation Layout

### Docs with Sidebar Navigation

```tsx
// app/docs/layout.tsx
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsHeader } from "@/components/docs-header"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader />
      <div className="container flex-1">
        <div className="flex gap-6 py-6">
          {/* Sidebar */}
          <aside className="hidden w-64 lg:block">
            <DocsSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {children}
            </div>
          </main>

          {/* Table of Contents */}
          <aside className="hidden w-64 xl:block">
            <div className="sticky top-20">
              <h4 className="mb-4 text-sm font-semibold">On This Page</h4>
              {/* TOC content */}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
```

---

## 🎯 Responsive Patterns

### Mobile Menu

```tsx
"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col space-y-4">
          <a href="/features" className="text-lg font-medium">
            Features
          </a>
          <a href="/pricing" className="text-lg font-medium">
            Pricing
          </a>
          <a href="/docs" className="text-lg font-medium">
            Docs
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

### Responsive Container

```tsx
// components/container.tsx
import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("container px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}
```

---

## 🎨 Common Layout Components

### Page Header

```tsx
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

// Usage
<PageHeader
  title="Dashboard"
  description="Welcome back! Here's what's happening."
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button>Create New</Button>
    </>
  }
/>
```

### Section

```tsx
export function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
```

### Empty State

```tsx
import { FileX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <FileX className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
```

---

## 📚 Best Practices

1. **Use Semantic HTML** - `<header>`, `<nav>`, `<main>`, `<footer>`
2. **Responsive by Default** - Mobile-first approach
3. **Sticky Headers** - Use `sticky top-0` for fixed navigation
4. **Proper Z-Index** - Layer elements correctly
5. **Container Padding** - Use `px-4 sm:px-6 lg:px-8` pattern
6. **Theme Support** - All layouts work in light/dark mode
7. **Accessibility** - Proper ARIA labels and keyboard navigation

---

## 🚀 Next Steps

- See [Form Patterns](./forms.md)
- Check [Authentication Patterns](./authentication.md)
- Review [AI + UI Integration](./ai-ui-integration.md)
