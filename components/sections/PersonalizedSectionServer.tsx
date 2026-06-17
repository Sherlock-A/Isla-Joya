import { fetchAllProducts } from "@/lib/products";
import { PersonalizedSection } from "./PersonalizedSection";

export async function PersonalizedSectionServer() {
  const allProducts = await fetchAllProducts();
  return <PersonalizedSection allProducts={allProducts} />;
}
