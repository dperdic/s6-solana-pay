"use client";

import ProductCard from "@/components/ProductCard";
import { useInventoryStore } from "@/store/store";

export default function Inventory() {
  const inventory = useInventoryStore((state) => state.inventory);

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Inventory</h3>

      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-md shadow w-full">
        {inventory.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
