import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Pay POS Machine",
  description: "A simple POS machine that utilizes Solana Pay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
