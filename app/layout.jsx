// src/app/layout.jsx

import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: {
    template: '%s | SRM Department of CSE',
    default: 'SRM Department of CSE',
  },
  description: 'A description of your awesome website.',
};

// 👇 2. Configure the font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <main>
            <Providers>{children}</Providers>
          </main>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}