import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DocsNavItem = {
  title: string;
  href: string;
  description?: string;
};

type DocsNavGroup = {
  title: string;
  items: DocsNavItem[];
};

const docsNavigation: DocsNavGroup[] = [
  {
    title: "Essentials",
    items: [
      { title: "Introduction", href: "/docs#introduction" },
      { title: "Philosophy", href: "/docs#philosophy" },
      { title: "Tech Stack", href: "/docs#tech-stack" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Getting Started", href: "/docs#getting-started" },
      { title: "Development Workflow", href: "/docs#workflow" },
      { title: "Environment & Config", href: "/docs#configuration" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Project Structure", href: "/docs#structure" },
      { title: "UI & Styling", href: "/docs#styling" },
      { title: "Scripts & Tooling", href: "/docs#tooling" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const flatNav = docsNavigation.flatMap((group) => group.items);

  return (
    <div className="bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 md:flex-row md:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-20">
            <ScrollArea className="h-[calc(100vh-6rem)] pr-4">
              <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">Next16 Docs</p>
                <p className="text-sm text-muted-foreground">
                  Boilerplate guidance for building with this starter.
                </p>
              </div>
              {docsNavigation.map((group) => (
                <div key={group.title} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {group.title}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "hover:bg-muted/70 hover:text-foreground focus-visible:ring-ring block rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          )}
                        >
                          {item.title}
                        </Link>
                        {item.description && (
                          <p className="mt-1 text-xs text-muted-foreground/80">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        <main className="flex-1 min-w-0 pb-16">
          <div className="md:hidden">
            <nav className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Next16 Docs</p>
                <p className="text-sm text-muted-foreground">
                  Boilerplate guidance and best practices.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {flatNav.map((item) => (
                  <Button
                    key={item.href}
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </Button>
                ))}
              </div>
            </nav>
            <Separator className="my-8" />
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
