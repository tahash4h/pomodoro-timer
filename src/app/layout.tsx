import type { Metadata } from "next";
import { GeistSans } from 'geist/font'
import { GeistMono } from 'geist/font'
import "./globals.css";

const geistSans = GeistSans
const geistMono = GeistMono

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "A beautiful Pomodoro timer for better productivity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
