import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "../lib/auth-context";

export const metadata: Metadata = {
  title: "Vibecoder Pal - Learn to Code While AI Writes Your Code",
  description:
    "The ultimate platform for vibecoders. Learn programming concepts, best practices, and gain real-world experience while AI agents handle the heavy lifting.",
  keywords: [
    "AI coding",
    "learn programming",
    "code generation",
    "developer tools",
    "VSCode extension",
  ],
  authors: [{ name: "Maic" }],
  openGraph: {
    title: "Vibecoder Pal - Learn to Code While AI Writes Your Code",
    description:
      "The ultimate platform for vibecoders. Learn programming concepts, best practices, and gain real-world experience while AI agents handle the heavy lifting.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibecoder Pal - Learn to Code While AI Writes Your Code",
    description:
      "The ultimate platform for vibecoders. Learn programming concepts, best practices, and gain real-world experience while AI agents handle the heavy lifting.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8b5cf6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
