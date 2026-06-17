import { fetchAllProducts } from "@/lib/products";
import { JewelryAdvisor } from "./JewelryAdvisor";

export async function JewelryAdvisorServer() {
  const allProducts = await fetchAllProducts();
  return <JewelryAdvisor allProducts={allProducts} />;
}
