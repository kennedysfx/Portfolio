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
      <body>
        <PageGate>{children}</PageGate>
      </body>
    </html>
  );
}