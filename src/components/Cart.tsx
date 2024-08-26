"use client";

import { useCartStore, useTransactionStateStore } from "@/store/store";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const transactionInProgress = useTransactionStateStore(
    (state) => state.transactionInProgress
  );

  return (
    <div className="full">
      <h3 className="text-xl font-semibold mb-4">Cart</h3>

      <div className="flex flex-col p-4 bg-white rounded-md shadow w-full overflow-hidden overflow-x-auto">
        <table className="min-w-full table-fixed">
          {!!cart.length && (
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-left w-5/12">
                  Product
                </th>
                <th className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-center w-2/12">
                  Quantity
                </th>
                <th className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-right w-5/12">
                  Price
                </th>
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-gray-200">
            {!!cart.length ? (
              <>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-2 text-sm font-normal text-gray-900 whitespace-pre-wrap text-left">
                      {product.name}
                    </td>

                    <td className="px-4 py-2 text-sm font-normal text-gray-900 whitespace-pre-wrap text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          type="button"
                          className="btn btn-xs btn-white"
                          disabled={
                            transactionInProgress || product.quantity <= 0
                          }
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
                        <span className="py-1.5 px-2">{product.quantity}</span>
                        <button
                          type="button"
                          className="btn btn-xs btn-white"
                          disabled={
                            transactionInProgress || product.quantity <= 0
                          }
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
                    </td>

                    <td className="px-4 py-2 text-sm font-normal text-gray-900 whitespace-nowrap text-right tabular-nums">
                      {(product.quantity * product.price).toFixed(9)} SOL
                    </td>
                  </tr>
                ))}

                <tr>
                  <th
                    colSpan={2}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-left"
                  >
                    Total price:
                  </th>

                  <td
                    colSpan={1}
                    className="px-4 py-2 text-sm font-normal text-gray-900 whitespace-nowrap text-right tabular-nums"
                  >
                    {totalPrice.toFixed(9)} SOL
                  </td>
                </tr>

                <tr>
                  <td colSpan={9999} className="text-center py-2">
                    <button
                      type="button"
                      className="btn btn-md btn-black"
                      disabled={transactionInProgress || !cart.length}
                      onClick={() => {}}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan={9999} className="text-center">
                  The cart is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
