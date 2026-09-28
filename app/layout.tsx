import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  // Replace with your real Vercel URL
  metadataBase: new URL("https://YOUR-DOMAIN.vercel.app"),
  title: "Prabhu R — Portfolio",
  description:
    "Full-Stack Developer building real-world web applications with modern technologies.",
  openGraph: {
    title: "Prabhu R — Full-Stack Developer",
    description:
      "Full-Stack Developer building real-world web applications with modern technologies.",
    type: "website",
    // Optional: put a 1200x630 image at /public/og-image.png
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollTriggerRefresh />
        {children}
      </body>
    </html>
  );
}