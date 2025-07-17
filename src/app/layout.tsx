import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/componentes/Header";
import Footer from "@/componentes/Footer";
import CookieBanner from "@/componentes/BannerCookies";

export const viewport: Viewport = {
  themeColor: "#FF7700",
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HRCe Loja",
  description: "Loja Virtual para Cabo Verdianos",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HRCe Loja",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        {/* Define a cor da barra de status para Android */}
        <meta name="theme-color" content="[#FF7700]" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="flex-grow ">{children}</main>
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
