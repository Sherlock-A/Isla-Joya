import type { MetadataRoute } from "next";
import { fetchAllProducts, categories } from "@/lib/products";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchAllProducts();

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const collectionUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${site.url}/collections/${c.key}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    ...collectionUrls,
    ...productUrls,
  ];
}
