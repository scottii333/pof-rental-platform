import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/lib/query-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CursorFollower } from "@/components/layout/cursor-follower";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POF Rental Booking",
  description: "Car rental booking flow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-dvh flex flex-col bg-background font-sans">
        <QueryProvider>
          <CursorFollower />
          <Header />
          {children}
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
