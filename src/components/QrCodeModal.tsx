"use client";

import { checkTransaction } from "@/backend/payment";
import {
  useCartStore,
  usePaymentStateStore,
  useQrCodeStateStore,
} from "@/store/store";
import { createQR } from "@solana/pay";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function QrCodeModal() {
  const url = useQrCodeStateStore((state) => state.url);
  const reference = usePaymentStateStore((state) => state.reference);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const qrRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const setIsQrCodeVisible = useQrCodeStateStore(
    (state) => state.setIsQrCodeVisible
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const handleClose = useCallback(
    (isSuccess: boolean, canceled: boolean) => {
      setIsQrCodeVisible(false);

      if (isSuccess) {
        toast.success("Payment successful");
        clearCart();
        return;
      }

      if (!canceled) {
        toast.error("Payment time expired");
      }
    },
    [setIsQrCodeVisible, clearCart]
  );

  useEffect(() => {
    if (url && qrRef.current) {
      const qr = createQR(url, 400, "white", "black");

      qrRef.current.innerHTML = "";

      qr.append(qrRef.current);
    }
  }, [url]);

  useEffect(() => {
    if (reference && totalPrice) {
      const interval = setInterval(() => {
        checkTransaction(reference, totalPrice).then((res) => {
          if (res) {
            handleClose(true, false);
          }
        });
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [totalPrice, reference, handleClose]);

  useEffect(() => {
    if (timeLeft === -10) {
      handleClose(false, false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((currentTimeLeft) => currentTimeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="absolute inset-0 z-40 bg-black bg-opacity-40 h-full w-full flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto z-50 bg-white rounded-lg shadow-md">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Scan the QR code to pay
            </h3>

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => {
                handleClose(false, true);
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col justify-center p-4 gap-4">
            <div ref={qrRef} className="flex justify-center"></div>
            <div className="text-center">
              {timeLeft > 0 ? (
                <>Time remaining: {timeLeft} seconds</>
              ) : (
                <>Validating transaction...</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
