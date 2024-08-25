import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Slide, ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const WalletContextProviderDynamic = dynamic(
  async () => await import("@/providers/WalletContextProvider"),
  { ssr: false }
);

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
      <body className={inter.className} suppressHydrationWarning={true}>
        <WalletContextProviderDynamic>{children}</WalletContextProviderDynamic>
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
    </html>
  );
}
