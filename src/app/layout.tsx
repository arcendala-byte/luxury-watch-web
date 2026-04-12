import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from '@/components/CustomCursor';
import CartDrawer from '@/components/CartDrawer'; // ✅ Ensure this path is correct

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chronos | Masterpiece of Time",
  description: "Exquisite luxury timepieces crafted with mechanical perfection since 1892.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black cursor-none text-white`}
      >
        {/* Global UI Components */}
        <CustomCursor />
        <CartDrawer /> {/* ✅ Cart is now globally available */}
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}