"use client";

import Cart from "@/components/Cart";
import Inventory from "@/components/Inventory";
import QrCodeModal from "@/components/QrCodeModal";
import { useQrCodeStateStore } from "@/store/store";

export default function Home() {
  const isQrCodeVisible = useQrCodeStateStore((state) => state.isQrCodeVisible);

  return (
    <div className="flex flex-col gap-12">
      <Inventory />
      <Cart />
      {isQrCodeVisible && <QrCodeModal />}
    </div>
  );
}
