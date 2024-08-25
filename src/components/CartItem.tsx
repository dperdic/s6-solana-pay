"use client";

import { Product, useCartStore, useTransactionStateStore } from "@/store/store";

export default function CartItem({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress
  );

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 justify-between">
      <div>
        <span className="font-semibold">Name:</span>
        &nbsp;
        <span>{product.name}</span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="btn btn-xs btn-white"
          disabled={transactionInProgress || product.quantity <= 0}
          onClick={() => removeFromCart(product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </button>
        <span>{product.quantity}</span>
        <button
          type="button"
          className="btn btn-xs btn-white"
          disabled={transactionInProgress || product.quantity <= 0}
          onClick={() => addToCart(product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </button>
      </div>

      <div>
        <span className="font-semibold">
          {product.quantity * product.price} SOL
        </span>
      </div>
    </div>
  );
}
