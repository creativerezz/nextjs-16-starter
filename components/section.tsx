import { Container } from "@/components/container"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  /**
   * Vertical padding (default: "py-12 md:py-16 lg:py-24")
   * - sm: py-8 md:py-12
   * - md: py-12 md:py-16 lg:py-20 (default)
   * - lg: py-16 md:py-20 lg:py-28
   * - xl: py-20 md:py-24 lg:py-32
   * - none: py-0
   */
  spacing?: "sm" | "md" | "lg" | "xl" | "none"
  /**
   * Background variant (default: "default")
   * - default: bg-background
   * - muted: bg-muted
   * - accent: bg-accent
   */
  variant?: "default" | "muted" | "accent"
  /**
   * HTML id attribute for anchor links
   */
  id?: string
}

const spacingVariants = {
  none: "py-0",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16 lg:py-24",
  lg: "py-16 md:py-20 lg:py-28",
  xl: "py-20 md:py-24 lg:py-32",
}

const backgroundVariants = {
  default: "bg-background",
  muted: "bg-muted",
  accent: "bg-accent",
}

export function Section({
  children,
  className,
  containerClassName,
  spacing = "md",
  variant = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacingVariants[spacing],
        backgroundVariants[variant],
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
