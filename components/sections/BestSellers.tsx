import { fetchBestSellers } from "@/lib/products";
import { BestSellersGrid } from "./BestSellersGrid";

export async function BestSellers() {
  const items = await fetchBestSellers();
  return <BestSellersGrid items={items} />;
}
