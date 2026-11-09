import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { Reveal } from "@/components/veltron/motion";
import { PageHero } from "@/components/veltron/Catalog";
export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — VELTRON" }, { name: "description", content: "Browse VELTRON by silhouette: jeans, cargo, chinos, formal, baggy, joggers, linen and wide leg." }, { property: "og:title", content: "Categories — VELTRON" }, { property: "og:description", content: "Every VELTRON silhouette in one place." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Directory" title="Categories" />
      <div className="mx-auto grid max-w-[1600px] gap-4 px-6 pb-24 md:grid-cols-2 md:px-10">
        {categories.map((c, i) => (
          <Reveal key={c.name} delay={(i % 2) * 0.1}>
            <Link to="/shop" search={{ cat: c.name }} className="group relative block aspect-[4/3] overflow-hidden bg-ink">
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover opacity-90 transition duration-1000 group-hover:scale-110 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-fade" />
              <div className="absolute inset-x-8 bottom-8 flex items-end justify-between text-ink-foreground">
                <div><p className="eyebrow opacity-70">{String(i + 1).padStart(2, "0")} — {c.tagline}</p><h2 className="mt-2 text-4xl transition group-hover:italic md:text-6xl">{c.name}</h2></div>
                <span className="eyebrow">{products.filter((p) => p.category === c.name).length} pieces</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  ),
});
