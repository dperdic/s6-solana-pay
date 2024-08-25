"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Template({ children }: { children: ReactNode }) {
  const { publicKey } = useWallet();

  return (
    <>
      <header className="fixed top-0 z-50 flex h-18 w-full bg-white shadow-sm">
        <nav className="flex h-full w-full sm:px-16 px-8 gap-4 items-center justify-between">
          <span className="flex flex-shrink h-5 relative">
            <img src="/next.svg" alt="NextJS" />
          </span>

          <WalletMultiButton />
        </nav>
      </header>

      <main
        className={`w-full flex-grow flex-grow sm:px-16 px-8 py-8 mt-18 ${
          !publicKey && "flex items-center justify-center"
        }}`}
      >
        {publicKey ? (
          <div className="max-w-3xl w-full mx-auto">{children}</div>
        ) : (
          <div className="max-w-2xl w-full mx-auto">
            <div className="p-8 bg-white rounded-md shadow w-full text-center">
              <h3 className="text-xl font-semibold">
                Connect a wallet to continue
              </h3>
            </div>
          </div>
        )}
      </main>

      <footer className="flex h-18 w-full sm:px-16 px-8 items-center bg-black text-white">
        <div className="flex flex-grow h-full w-full py-4">
          <a
            href="https://github.com/dperdic/s6-solana-pay"
            target="_blank"
            className="flex flex-row gap-2"
          >
            <img
              src="/github-mark-white.svg"
              alt="vite"
              className="h-5 inline-block"
            />

            <span>Source code</span>
          </a>
        </div>
      </footer>
    </>
  );
}
