"use client";

import CartItem from "@/components/CartItem";
import { useCartStore } from "@/store/store";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);

  console.log(cart);

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Cart</h3>

      <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow w-full divide-y-2 divide-gray-200">
        {cart.length ? (
          cart.map((product) => <CartItem key={product.id} product={product} />)
        ) : (
          <div className="text-center">Cart is empty</div>
        )}
      </div>
    </div>
  );
}
