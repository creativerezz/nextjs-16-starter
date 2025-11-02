# Authentication Patterns

Comprehensive guide to implementing authentication in Next.js 16 with shadcn/ui components.

---

## 🔐 Overview

This guide covers common authentication patterns using:
- **shadcn/ui** for UI components
- **Next.js 16** App Router with Server Actions
- **Modern auth libraries** (Clerk, NextAuth, Better Auth, etc.)

---

## 🎨 Authentication UI Components

### Login Page

```tsx
// app/(auth)/login/page.tsx
import { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
```

### Login Form Component

```tsx
// components/auth/login-form.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().default(false),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      toast.success("Logged in successfully!")
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast.error("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">
                Remember me
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  )
}
```

---

## 📝 Registration Page

### Register Page

```tsx
// app/(auth)/register/page.tsx
import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
```

### Register Form Component

```tsx
// components/auth/register-form.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import Link from "next/link"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Registration failed")
      }

      toast.success("Account created successfully!")
      router.push("/login")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer text-sm font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create account
        </Button>
      </form>
    </Form>
  )
}
```

---

## 🔄 OAuth Integration

### OAuth Buttons

```tsx
// components/auth/oauth-buttons.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function OAuthButtons() {
  async function handleOAuth(provider: string) {
    // Implement OAuth flow
    window.location.href = `/api/auth/${provider}`
  }

  return (
    <div className="grid gap-2">
      <Button
        variant="outline"
        onClick={() => handleOAuth("google")}
        className="w-full"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        onClick={() => handleOAuth("github")}
        className="w-full"
      >
        <Icons.github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  )
}
```

### Divider

```tsx
export function AuthDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  )
}

// Usage in LoginPage
<CardContent>
  <OAuthButtons />
  <AuthDivider />
  <LoginForm />
</CardContent>
```

---

## 🔒 Protected Routes

### Auth Middleware

```tsx
// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard")

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to dashboard if accessing auth page with token
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
```

---

## 👤 User Profile

### Profile Page

```tsx
// app/dashboard/profile/page.tsx
import { ProfileForm } from "@/components/profile/profile-form"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile Settings"
        description="Manage your account settings and preferences"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and profile picture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

---

## 🔐 Session Management

### User Context Provider

```tsx
// components/providers/user-provider.tsx
"use client"

import { createContext, useContext, ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type UserContextType = {
  user: User | null
  isLoading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
})

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser: User | null
}) {
  return (
    <UserContext.Provider value={{ user: initialUser, isLoading: false }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
```

### Using the User Context

```tsx
"use client"

import { useUser } from "@/components/providers/user-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserButton() {
  const { user } = useUser()

  if (!user) return null

  return (
    <Avatar>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{user.name[0]}</AvatarFallback>
    </Avatar>
  )
}
```

---

## 📧 Email Verification

### Verification Email Template

```tsx
// app/(auth)/verify-email/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Click the link in the email to verify your account. If you don't see the email, check your spam folder.
          </p>
          <Button variant="outline" className="w-full">
            Resend verification email
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## 🔑 Password Reset

### Forgot Password Page

```tsx
// app/(auth)/forgot-password/page.tsx
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## 📚 Best Practices

1. **Use HTTPS** - Always use HTTPS in production
2. **Secure Cookies** - Set `httpOnly`, `secure`, and `sameSite` flags
3. **Password Strength** - Enforce strong password requirements
4. **Rate Limiting** - Implement rate limiting on auth endpoints
5. **Email Verification** - Verify email addresses before activation
6. **2FA Support** - Consider adding two-factor authentication
7. **Session Expiry** - Implement proper session timeout
8. **Error Messages** - Don't reveal if email exists or not
9. **CSRF Protection** - Use CSRF tokens for forms
10. **Logging** - Log authentication events for security

---

## 🔗 Integration Examples

### Using Clerk

```bash
bun add @clerk/nextjs
```

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### Using Better Auth

See the Better Auth MCP documentation in this project for detailed integration.

---

## 🚀 Next Steps

- See [Form Patterns](./forms.md) for form validation
- Check [Layout Patterns](./layouts.md) for page structure
- Review [AI + UI Integration](./ai-ui-integration.md) for AI-powered features
