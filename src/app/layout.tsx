import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "./LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heroDisplay = localFont({
  src: "../../public/fonts/TT Travels Next Trial Bold.ttf",
  variable: "--font-hero-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gerrit Visser — Portfolio",
  description:
    "Gerrit Visser’s portfolio showcasing everything you need to know about him!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload the language-picker flags so the LCP element is ready
            before React hydrates. GB flag is shown first (default/top). */}
        <link rel="preload" as="image" href="/flags/gb.svg" />
        <link rel="preload" as="image" href="/flags/de.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${heroDisplay.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
