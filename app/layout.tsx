import type { Metadata } from "next";
import "./globals.css";
import Navbar from '../components/layout/Navbar'
import { Toaster } from "@/components/ui/sonner"
import { Poppins } from 'next/font/google';
import Providers from "./providers";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rwandachef find chef for your party here",
  description: "here you can find the number one page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
      >
        {/* Wrap everything in your Query Providers */}
        <Providers>
          <Navbar />
          <Toaster />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
