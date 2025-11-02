# Form Patterns with shadcn/ui

Comprehensive guide to building forms using shadcn/ui components, React Hook Form, and Zod validation.

---

## 🚀 Quick Start

### Install Dependencies

```bash
bun add react-hook-form @hookform/resolvers zod
bunx shadcn@latest add form input label button
```

---

## 📝 Basic Form Pattern

### Simple Contact Form

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    try {
      // Submit to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error("Failed to submit")

      // Success handling
      form.reset()
      toast.success("Message sent successfully!")
    } catch (error) {
      toast.error("Failed to send message")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message here..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell us what you'd like to discuss
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  )
}
```

---

## 🔐 Authentication Forms

### Login Form

```tsx
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().default(false),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

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
      // Call your auth API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error("Login failed")

      const data = await response.json()
      toast.success("Logged in successfully!")
      // Redirect or handle success
    } catch (error) {
      toast.error("Invalid credentials")
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
                <Input type="password" placeholder="••••••••" {...field} />
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
                />
              </FormControl>
              <FormLabel className="cursor-pointer font-normal">
                Remember me
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  )
}
```

### Registration Form

```tsx
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
    // Handle registration
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms checkbox */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  I accept the terms and conditions
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </Form>
  )
}
```

---

## 📋 Multi-Step Forms

### Step-by-Step Form

```tsx
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

// Step schemas
const step1Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const step2Schema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
})

const step3Schema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Combined schema
const onboardingSchema = step1Schema.merge(step2Schema).merge(step3Schema)

export function OnboardingForm() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    console.log(values)
    // Submit final form
  }

  const nextStep = async () => {
    const fields = {
      1: ["name", "email"],
      2: ["company", "role"],
      3: ["password", "confirmPassword"],
    }

    const isValid = await form.trigger(fields[step] as any)
    if (isValid) setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Progress value={(step / totalSteps) * 100} />
        <p className="text-sm text-muted-foreground">
          Step {step} of {totalSteps}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Step 2: Company Info */}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Step 3: Security */}
          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < totalSteps ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Complete
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
```

---

## 🎯 Advanced Patterns

### Form with File Upload

```tsx
"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

const profileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(500),
  avatar: z.instanceof(File).optional(),
})

export function ProfileForm() {
  const [preview, setPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("avatar", file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("bio", values.bio)
    if (values.avatar) {
      formData.append("avatar", values.avatar)
    }

    // Submit formData
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Avatar upload */}
        <div className="space-y-2">
          <FormLabel>Avatar</FormLabel>
          <div className="flex items-center gap-4">
            {preview && (
              <img
                src={preview}
                alt="Avatar preview"
                className="h-20 w-20 rounded-full object-cover"
              />
            )}
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 hover:bg-accent">
                <Upload className="h-4 w-4" />
                <span className="text-sm">Upload Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Other fields */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Profile</Button>
      </form>
    </Form>
  )
}
```

---

## 🔗 Form with Select & Combobox

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const settingsSchema = z.object({
  country: z.string(),
  timezone: z.string(),
  language: z.string(),
})

export function SettingsForm() {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
  })

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
      </form>
    </Form>
  )
}
```

---

## 📚 Best Practices

1. **Always use Zod for validation** - Type-safe and runtime validation
2. **Use FormField for each input** - Consistent error handling
3. **Add loading states** - Disable submit button during submission
4. **Show success/error feedback** - Use toast notifications
5. **Reset form after success** - Call `form.reset()` after successful submission
6. **Handle errors gracefully** - Display meaningful error messages
7. **Use Server Actions** - For Next.js 16, integrate with Server Actions
8. **Accessibility** - Use proper labels and ARIA attributes

---

## 🚀 Next Steps

- See [AI + Forms Integration](./ai-ui-integration.md#ai-powered-forms)
- Check [Layout Patterns](./layouts.md)
- Review [Authentication Patterns](./authentication.md)
