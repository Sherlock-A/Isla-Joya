import { fetchTrending } from "@/lib/products";
import { TrendingNowGrid } from "./TrendingNowGrid";

export async function TrendingNow() {
  const products = await fetchTrending();
  if (products.length === 0) return null;
  return <TrendingNowGrid products={products} />;
}
