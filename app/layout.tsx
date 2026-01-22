import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev-School",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${"min-h-screen flex flex-col  mx-auto "} ${geistSans.variable} ${geistMono.variable} antialiased `}
      > <Navbar/>
          <main className="max-w-7xl mx-auto px-6 grow">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
