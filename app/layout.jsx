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

import { Adamina } from "next/font/google";

const adamina = Adamina({
  subsets: ["latin"],
  weight: ["400"], // Adamina only has one weight
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={adamina.className}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Navbar /> */}
          <main>
            <Providers>{children}</Providers>
          </main>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}