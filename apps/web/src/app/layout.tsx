import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import "./github-markdown.css";

import { ProcessingURLDrawer } from "@/components/processing-url-drawer/processing-url-drawer";
import { SupabaseProvider } from "./supabase-provider";
import { ReactQueryProvider } from "./react-query-client-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <SupabaseProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="bg-background min-w-screen flex min-h-screen overflow-hidden">
                {children}
              </div>
            </ThemeProvider>
            <ProcessingURLDrawer />
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </SupabaseProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
