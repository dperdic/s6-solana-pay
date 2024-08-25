import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Slide, ToastContainer } from "react-toastify";
import Providers from "@/providers/Providers";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

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

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
        </body>
      </Providers>
    </html>
  );
}
