import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { Catalog, PageHero } from "@/components/veltron/Catalog";
export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): { q?: string | undefined; cat?: string | undefined } => ({ q: typeof s["q"] === "string" ? s["q"] : undefined, cat: typeof s["cat"] === "string" ? s["cat"] : undefined }),
  head: () => ({ meta: [{ title: "Shop All Trousers — VELTRON" }, { name: "description", content: "Shop VELTRON jeans, cargo, chinos, formal trousers, joggers and linen pants." }, { property: "og:title", content: "Shop All — VELTRON" }, { property: "og:description", content: "The complete VELTRON collection of luxury men's trousers." }] }),
  component: Shop,
});
function Shop() {
  const { q, cat } = Route.useSearch();
  return <><PageHero eyebrow="The Collection" title={cat ?? "Shop All"} /><Catalog items={products} initialCat={cat} query={q} /></>;
}
