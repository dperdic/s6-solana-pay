"use client";

import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed top-0 z-30 flex h-18 w-full bg-white shadow-sm">
        <nav className="flex h-full w-full sm:px-16 px-8 gap-4 items-center justify-between">
          <span className="flex flex-shrink h-5 relative">
            <img src="/next.svg" alt="NextJS" />
          </span>
        </nav>
      </header>

      <main className="w-full flex-grow flex-grow sm:px-16 px-8 py-8 mt-18">
        <div className="max-w-3xl w-full mx-auto">{children}</div>
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
