"use client";

import CartItem from "@/components/CartItem";
import { useCartStore, useTransactionStateStore } from "@/store/store";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);

  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress
  );

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Cart</h3>

      <div className="flex flex-col p-4 bg-white rounded-md shadow w-full divide-y-2 divide-gray-200">
        {cart.length ? (
          <>
            {cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
            <button
              type="button"
              className="btn btn-md btn-black"
              disabled={transactionInProgress || !cart.length}
              onClick={() => {}}
            >
              Buy
            </button>
          </>
        ) : (
          <div className="text-center">Cart is empty</div>
        )}
      </div>
    </div>
  );
}
