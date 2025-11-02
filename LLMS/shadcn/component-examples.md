# shadcn/ui Component Examples

Practical examples for the most commonly used shadcn/ui components.

---

## 🔘 Button

### Basic Variants

```tsx
import { Button } from "@/components/ui/button"

export function ButtonExamples() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Sizes

```tsx
<div className="flex items-center gap-4">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">
    <Mail className="h-4 w-4" />
  </Button>
</div>
```

### With Icons

```tsx
import { ArrowRight, Download, Loader2 } from "lucide-react"

<Button>
  Get Started
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>

<Button variant="outline">
  <Download className="mr-2 h-4 w-4" />
  Download
</Button>

<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

### As Link (Next.js)

```tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

---

## 🃏 Card

### Basic Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BasicCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any components or text.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}
```

### Feature Card

```tsx
import { Zap } from "lucide-react"

export function FeatureCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-4">Fast Performance</CardTitle>
        <CardDescription>
          Lightning-fast load times and optimized rendering
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
```

### Pricing Card

```tsx
import { Check } from "lucide-react"

export function PricingCard() {
  const features = [
    "10 projects",
    "Unlimited users",
    "24/7 support",
    "Advanced analytics"
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pro Plan</CardTitle>
        <CardDescription>For growing teams</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">$29</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  )
}
```

---

## 📝 Form & Input

### Basic Form

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
                <Input placeholder="you@example.com" {...field} />
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
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  )
}
```

### Input with Label

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="John Doe" />
</div>
```

### Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    placeholder="Type your message here..."
    rows={4}
  />
</div>
```

### Select

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label>Country</Label>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Checkbox

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms" className="cursor-pointer">
    Accept terms and conditions
  </Label>
</div>
```

---

## 💬 Dialog

### Basic Dialog

```tsx
"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function BasicDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog content.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Dialog content goes here.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### Confirmation Dialog

```tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function ConfirmDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

---

## 🎨 Popover

### Basic Popover

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function BasicPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is the popover content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

### Settings Popover

```tsx
import { Settings } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Settings</h4>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch id="notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="emails">Email updates</Label>
            <Switch id="emails" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

---

## 📋 Table

### Basic Table

```tsx
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const invoices = [
  { id: "INV001", status: "Paid", amount: "$250.00" },
  { id: "INV002", status: "Pending", amount: "$150.00" },
  { id: "INV003", status: "Paid", amount: "$350.00" },
]

export function InvoiceTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### Table with Badge

```tsx
import { Badge } from "@/components/ui/badge"

<TableCell>
  <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>
    {invoice.status}
  </Badge>
</TableCell>
```

---

## 🔔 Toast

### Setup Toast

```tsx
// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

### Using Toast

```tsx
"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function ToastExample() {
  return (
    <div className="space-x-2">
      <Button onClick={() => toast("Hello World")}>
        Default
      </Button>
      <Button onClick={() => toast.success("Operation successful!")}>
        Success
      </Button>
      <Button onClick={() => toast.error("Something went wrong")}>
        Error
      </Button>
      <Button onClick={() => toast.loading("Loading...")}>
        Loading
      </Button>
    </div>
  )
}
```

---

## 📑 Tabs

### Basic Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BasicTabs() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Account settings content</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Password settings content</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p>Notification settings content</p>
      </TabsContent>
    </Tabs>
  )
}
```

### Tabs with Cards

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Overview content here</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="analytics">
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Analytics content here</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>
```

---

## 📊 Badge

```tsx
import { Badge } from "@/components/ui/badge"

<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="destructive">Destructive</Badge>
</div>
```

### Status Badges

```tsx
export function StatusBadge({ status }: { status: string }) {
  const variants = {
    active: "default",
    pending: "secondary",
    inactive: "outline",
    error: "destructive"
  } as const

  return <Badge variant={variants[status]}>{status}</Badge>
}
```

---

## 🎯 Tooltip

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Additional information here</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

---

## 🔄 Skeleton

### Loading Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}
```

### Table Skeleton

```tsx
export function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}
```

---

## 📚 More Examples

For complete component documentation and live examples, visit:
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Integration Guide](./nextjs-integration.md)
- [Form Patterns](../patterns/forms.md)
