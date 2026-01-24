import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "CareLink - Post-Discharge Patient Monitoring",
  description: "AI-powered patient monitoring system for post-discharge care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>{children}</body>
      </html>
    </ClerkProvider>
  );
}