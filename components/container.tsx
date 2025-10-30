import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container max-w-screen-2xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}
