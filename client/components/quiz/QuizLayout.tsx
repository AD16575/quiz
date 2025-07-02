import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface QuizLayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  headerContent?: ReactNode;
}

export function QuizLayout({
  children,
  className,
  showHeader = false,
  headerContent,
}: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-squid-pink/10 via-background to-squid-teal/10">
      {showHeader && (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3">{headerContent}</div>
        </header>
      )}
      <main className={cn("flex flex-col", className)}>{children}</main>
    </div>
  );
}
