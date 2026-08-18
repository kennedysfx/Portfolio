import type { Metadata } from "next";
import "./globals.css";
import PageGate from "@/app/components/PageGate";

export const metadata: Metadata = {
  title: "Kennedy Ezebilo | Portfolio",
  description: "Engineering high-performance web applications.",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/faviconb.png?v=2",
      href: "/faviconb.png?v=2",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/faviconw.png?v=2",
      href: "/faviconw.png?v=2",
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

        {/* Explicit fallback favicon links — some mobile browsers ignore the metadata icons array */}
        <link rel="icon" href="/faviconb.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/faviconb.png?v=2" />
      </head>
      <body>
        <PageGate>{children}</PageGate>
      </body>
    </html>
  );
}