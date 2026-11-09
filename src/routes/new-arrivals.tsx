import { createFileRoute } from "@tanstack/react-router";
import { products, images } from "@/data/products";
import { Catalog, PageHero } from "@/components/veltron/Catalog";
export const Route = createFileRoute("/new-arrivals")({
  head: () => ({ meta: [{ title: "New Arrivals — VELTRON AW26" }, { name: "description", content: "The new season of VELTRON trousers: fresh cuts, fabrics and silhouettes." }, { property: "og:title", content: "New Arrivals — VELTRON" }, { property: "og:description", content: "Fresh cuts for Autumn / Winter 2026." }] }),
  component: () => <><PageHero eyebrow="Autumn / Winter 2026" title="New Season" image={images.look2} /><div className="h-12" /><Catalog items={products.filter((p) => p.isNew)} /></>,
});
