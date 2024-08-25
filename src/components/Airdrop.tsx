"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { confirmTransaction, getStep } from "@/utils/functions";
import { useTransactionStateStore } from "@/store/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Airdrop() {
  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress
  );
  const setTransactionInProgress = useTransactionStateStore(
    (state) => state.setTransactionInProgress
  );
  const [balance, setBalance] = useState(0);
  const [airdropAmount, setAirdropAmount] = useState("");
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      { commitment: "confirmed" }
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [connection, publicKey]);

  const requestAirdrop = async () => {
    setTransactionInProgress(true);

    if (!publicKey || !connection) {
      toast.error("Wallet not connected");
      setTransactionInProgress(false);

      return;
    }

    let amount: number;

    try {
      amount = Number(airdropAmount);
    } catch (error) {
      toast.error("Invalid airdrop amount");
      setTransactionInProgress(false);

      return;
    }

    try {
      const tx = await connection.requestAirdrop(
        publicKey,
        amount * LAMPORTS_PER_SOL
      );

      const confirmation = await confirmTransaction(connection, tx);

      if (confirmation.value.err) {
        toast.error(confirmation.value.err.toString());
      } else {
        toast.info(`Transaction hash: ${tx}`);
      }
    } catch (error) {
      toast.error(error as string);
    }

    setAirdropAmount("");
    setTransactionInProgress(false);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Airdrop</h3>

      <div className="grid gap-4 p-4 bg-white rounded-md shadow w-full">
        <div>Balance: {balance} SOL</div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            placeholder="Amount"
            step={getStep(9)}
            min={0}
            value={airdropAmount}
            onChange={(event) => {
              setAirdropAmount(event.target.value);
            }}
            className="w-full border px-3 py-2 shadow-sm block w-full border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
          />

          <button
            type="button"
            className="btn btn-md btn-black"
            disabled={transactionInProgress || !airdropAmount}
            onClick={requestAirdrop}
          >
            Airdrop
          </button>
        </div>
      </div>
    </div>
  );
}
