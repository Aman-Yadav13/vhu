import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtual Health Care",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full px-10 py-4 z-10 bg-[#0f1525] opacity-[0.8] h-15">
            <Navbar />
          </div>
          <div className="h-full w-full mt-15 z-30">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
