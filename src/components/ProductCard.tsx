"use client";

import { Product } from "@/store/store";

export default function ProductCard({ product }: { product: Product }) {
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
    </div>
  );
}
