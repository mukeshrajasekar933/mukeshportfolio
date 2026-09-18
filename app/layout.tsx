import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MUKESH R — Full Stack Developer & Creative Builder",
  description:
    "Monochrome editorial portfolio of Mukesh R, a Full Stack Developer crafting modern, scalable, and user-focused web experiences with contemporary technologies.",
  keywords: [
    "Mukesh R",
    "Full Stack Developer",
    "Creative Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "GSAP",
    "Portfolio",
  ],
  authors: [{ name: "Mukesh R" }],
  openGraph: {
    title: "MUKESH R — Full Stack Developer",
    description: "Building digital experiences that turn ideas into reality.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <div className="ambient-vignette" aria-hidden="true" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
