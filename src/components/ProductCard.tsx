"use client";

import { Product, useCartStore, useTransactionStateStore } from "@/store/store";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress
  );

  return (
    <div className="w-full flex flex-col border rounded-md gap-4 p-4 shadow-sm">
      <div>
        <span className="font-semibold">Name:</span>
        &nbsp;
        <span>{product.name}</span>
      </div>

      <div>
        <span className="font-semibold">Quantity:</span>
        &nbsp;
        <span>{product.quantity}</span>
      </div>

      <div>
        <span className="font-semibold">Price:</span>
        &nbsp;
        <span>{product.price} SOL</span>
      </div>

      <button
        type="button"
        className="btn btn-md btn-black"
        disabled={transactionInProgress || product.quantity <= 0}
        onClick={() => addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
}
