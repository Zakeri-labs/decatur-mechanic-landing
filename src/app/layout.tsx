import type { Metadata, Viewport } from "next";
import { Barlow, Oswald } from "next/font/google";
import { seo } from "@/config/business";
import "./globals.css";

const bodyFont = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});
const displayFont = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://decaturmechanic.com"),
  title: seo.title,
  description: seo.description,
  openGraph: { type: "website", siteName: "Decatur Mechanic" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon-decatur.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
