"use server";

import {
  encodeURL,
  findReference,
  validateTransfer,
  FindReferenceError,
} from "@solana/pay";
import {
  PublicKey,
  Keypair,
  Connection,
  clusterApiUrl,
  Cluster,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";

const recipient = new PublicKey("ETi5uvh8BzsJSvkKBkDG2Z3MiCHZa8VoUjV5dfsgGBTL");
const label = "S6 Solana Pay";

const getEndpoint = () => {
  const rpcUrl = process.env.NEXT_RPC_URL;

  if (!rpcUrl || rpcUrl === "") {
    return clusterApiUrl(process.env.NEXT_SOL_CLUSTER as Cluster);
  }

  return rpcUrl;
};

const connection = new Connection(getEndpoint(), "confirmed");

export const generatePaymentUrl = async (
  amount: number,
  message: string
): Promise<{
  reference: string;
  url: string;
} | null> => {
  try {
    const reference = new Keypair().publicKey;

    const memo = `Order #${Math.floor(Math.random() * 1000)}`;

    const url = encodeURL({
      recipient: recipient,
      amount: new BigNumber(amount),
      label: label,
      reference: reference,
      message: message,
      memo: memo,
    });

    console.log("payment url: ", url);

    return { reference: reference.toBase58(), url: url.toString() };
  } catch (error) {
    console.error("error: ", error);

    return null;
  }
};

export const checkTransaction = async (
  reference: string,
  amount: number
): Promise<boolean> => {
  try {
    const referencePublicKey = new PublicKey(reference);

    const tx = await findReference(connection, referencePublicKey);

    const transferValidationResponse = await validateTransfer(
      connection,
      tx.signature,
      {
        recipient: recipient,
        amount: new BigNumber(amount),
        reference: referencePublicKey,
      }
    );

    console.log("transfer validation response: ", transferValidationResponse);

    return true;
  } catch (error) {
    if (error instanceof FindReferenceError) {
      console.log(reference.toString(), "not confirmed");
    } else {
      console.error("unknown error: ", error);
    }

    return false;
  }
};
