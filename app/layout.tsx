import "./globals.css";
import PageGate from "@/app/components/PageGate";

export const metadata = {
  title: "Kennedy Ezebilo | Portfolio",
  description: "Engineering high-performance web applications.",
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