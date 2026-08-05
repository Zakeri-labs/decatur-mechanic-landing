import type { Metadata, Viewport } from "next";
import { Barlow, Oswald } from "next/font/google";
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
  title: "Decatur Mechanic — Auto Repair on Columbia Dr",
  description:
    "Decatur Mechanic: engine, transmission, brake and oil-change service at 1099 Columbia Dr, Decatur, GA.",
  openGraph: { type: "website", siteName: "Decatur Mechanic" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
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
