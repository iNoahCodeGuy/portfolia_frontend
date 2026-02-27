import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolia — Noah's AI Assistant",
  description: "Chat with Portfolia to learn about Noah's projects and background.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-900 text-zinc-100 h-screen">
        {children}
      </body>
    </html>
  );
}
