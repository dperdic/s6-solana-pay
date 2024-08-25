"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import "./WalletContextProvider.css";

export default function WalletContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = useMemo(() => {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

    if (!rpcUrl || rpcUrl === "") {
      return clusterApiUrl(process.env.NEXT_PUBLIC_SOL_CLUSTER as Cluster);
    }

    return rpcUrl;
  }, []);

  const wallets = useMemo(() => {
    return [new UnsafeBurnerWalletAdapter()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
