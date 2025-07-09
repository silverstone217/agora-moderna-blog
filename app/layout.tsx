import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/utils/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Agora-moderna",
  description: ` Lisez des meilleurs articles incontournables et profiter 
     d'etre informer avec une maniere ludique et lucide!`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${montserrat.className} scroll-smooth  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <main>{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
