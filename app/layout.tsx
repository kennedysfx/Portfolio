import type { Metadata } from "next";
import "./globals.css";
import PageGate from "@/app/components/PageGate";

export const metadata: Metadata = {
  title: "Kennedy Ezebilo | Portfolio",
  description: "Engineering high-performance web applications.",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/faviconb.webp",
      href: "/faviconb.webp",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/faviconw.webp",
      href: "/faviconw.webp",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 👉 PASTE YOUR GOOGLE SITE VERIFICATION META TAG HERE */}
        <meta name="google-site-verification" content="yDTpPppvvpkgSc3Aq1nr9ibqmymEyyjuHFvuc2P1sHQ" />
      </head>
      <body>
        <PageGate>{children}</PageGate>
      </body>
    </html>
  );
}