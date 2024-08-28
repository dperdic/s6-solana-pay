declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_RPC_URL: string;
      NEXT_SOL_CLUSTER: string;
    }
  }
}

export {};
