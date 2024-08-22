"use client";

import WalletContextProvider from "@/providers/WalletContextProvider";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <WalletContextProvider>{children}</WalletContextProvider>;
}
