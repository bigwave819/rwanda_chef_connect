import type { Metadata } from "next";
import "./globals.css";
import Navbar from '../components/layout/Navbar'
import { Toaster } from "@/components/ui/sonner"



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
    <html lang="en">
      <body
      >
        <Navbar />
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}
