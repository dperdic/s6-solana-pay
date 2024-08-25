import Airdrop from "@/components/Airdrop";
import Inventory from "@/components/Inventory";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Airdrop />
      <Inventory />
      {/* <Cart /> */}
    </div>
  );
}
