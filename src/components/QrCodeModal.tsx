"use client";

import { checkTransaction } from "@/backend/payment";
import {
  useCartStore,
  usePaymentStateStore,
  useQrCodeStateStore,
} from "@/store/store";
import { createQR } from "@solana/pay";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function QrCodeModal() {
  const url = useQrCodeStateStore((state) => state.url);
  const reference = usePaymentStateStore((state) => state.reference);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const [isValidating, setIsValidating] = useState(true);
  const qrRef = useRef<HTMLDivElement>(null);

  const setIsQrCodeVisible = useQrCodeStateStore(
    (state) => state.setIsQrCodeVisible
  );

  const handleClose = () => {
    setIsQrCodeVisible(false);
  };

  useEffect(() => {
    if (url && qrRef.current) {
      const qr = createQR(url, 400, "white", "black");

      console.log(qr);

      qrRef.current.innerHTML = "";

      qr.append(qrRef.current);
    }
  }, [url]);

  useEffect(() => {
    if (reference && totalPrice) {
      const interval = setInterval(() => {
        checkTransaction(reference, totalPrice).then((res) => {
          if (res) {
            toast.success("Payment sucessful");
          }
        });
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [reference, totalPrice]);

  <div className="max-w-2xl w-full mx-auto">
    <div className="p-8 bg-white rounded-md shadow w-full text-center">
      <h3 className="text-xl font-semibold">Connect a wallet to continue</h3>
    </div>
  </div>;

  return (
    <div className="absolute inset-0 z-40 bg-black bg-opacity-40 h-full w-full flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto z-50 bg-white rounded-lg shadow-md">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Scan the QR code to pay
            </h3>

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={handleClose}
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div ref={qrRef} className="flex justify-center"></div>

          <div>Validating transaction...</div>
        </div>
      </div>
    </div>
  );
}
