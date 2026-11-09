import { AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { QuickView } from "./QuickView";

const FITS = ["Slim", "Straight", "Relaxed", "Baggy", "Wide", "Tapered"];
export function Catalog({ items, initialCat, query }: { items: Product[]; initialCat?: string; query?: string }) {
  const cats = [...new Set(items.map((p) => p.category))];
  const colors = [...new Map(items.flatMap((p) => p.colors).map((c) => [c.name, c])).values()];
  const [cat, setCat] = useState<string[]>(initialCat ? [initialCat] : []);
  const [fit, setFit] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [max, setMax] = useState(450);
  const [sort, setSort] = useState("featured");
  const [open, setOpen] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);
  useEffect(() => setCat(initialCat ? [initialCat] : []), [initialCat]);
  const tog = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const list = useMemo(() => {
    const q = (query || "").toLowerCase();
    const r = items.filter((p) => (!q || `${p.name} ${p.category} ${p.material}`.toLowerCase().includes(q)) && (!cat.length || cat.includes(p.category)) && (!fit.length || fit.includes(p.fit)) && (!color.length || p.colors.some((c) => color.includes(c.name))) && (!size || p.sizes.includes(size)) && p.price <= max);
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    if (sort === "high") r.sort((a, b) => b.price - a.price);
    if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [items, query, cat, fit, color, size, max, sort]);
  const chip = (on: boolean) => `border px-3 py-2 text-xs transition ${on ? "border-foreground bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`;
  return (
    <div className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10">
      <div className="flex items-center justify-between border-y border-border py-4">
        <button onClick={() => setOpen((o) => !o)} className="eyebrow flex items-center gap-2 lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
        <p className="eyebrow text-muted-foreground">{list.length} pieces{query ? ` for “${query}”` : ""}</p>
        <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className="eyebrow bg-transparent outline-none">
          <option value="featured">Featured</option><option value="low">Price: Low → High</option><option value="high">Price: High → Low</option><option value="rating">Top rated</option>
        </select>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className={`${open ? "block" : "hidden"} space-y-8 lg:block`}>
          <Group t="Category">{cats.map((c) => <button key={c} onClick={() => tog(cat, setCat, c)} className={chip(cat.includes(c))}>{c}</button>)}</Group>
          <Group t="Fit">{FITS.map((f) => <button key={f} onClick={() => tog(fit, setFit, f)} className={chip(fit.includes(f))}>{f}</button>)}</Group>
          <Group t="Size">{["28", "30", "32", "34", "36", "38"].map((s) => <button key={s} onClick={() => setSize(size === s ? "" : s)} className={chip(size === s)}>{s}</button>)}</Group>
          <Group t="Colour">{colors.map((c) => <button key={c.name} aria-label={c.name} title={c.name} onClick={() => tog(color, setColor, c.name)} className={`h-8 w-8 rounded-full border-2 ${color.includes(c.name) ? "border-foreground" : "border-border"}`} style={{ background: c.hex }} />)}</Group>
          <div><p className="eyebrow mb-3">Max price: ${max}</p><input aria-label="Max price" type="range" min={150} max={450} step={10} value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-foreground" /></div>
          <button onClick={() => { setCat([]); setFit([]); setColor([]); setSize(""); setMax(450); }} className="eyebrow underline">Clear all</button>
        </aside>
        <div>
          {list.length === 0 ? <p className="py-20 text-center font-display text-3xl">No pieces match. Try fewer filters.</p> : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 xl:grid-cols-3"><AnimatePresence mode="popLayout">{list.map((p) => <ProductCard key={p.id} p={p} onQuick={setQuick} />)}</AnimatePresence></div>
          )}
        </div>
      </div>
      <QuickView p={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
function Group({ t, children }: { t: string; children: React.ReactNode }) { return <div><p className="eyebrow mb-3">{t}</p><div className="flex flex-wrap gap-2">{children}</div></div>; }

export function PageHero({ eyebrow, title, image }: { eyebrow: string; title: string; image?: string }) {
  return image ? (
    <section className="relative flex h-[70vh] items-end overflow-hidden bg-ink text-ink-foreground">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-veil" />
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10"><p className="eyebrow opacity-80">{eyebrow}</p><h1 className="mt-3 text-6xl md:text-9xl">{title}</h1></div>
    </section>
  ) : (
    <section className="mx-auto max-w-[1600px] px-6 pb-12 pt-36 md:px-10"><p className="eyebrow text-muted-foreground">{eyebrow}</p><h1 className="mt-3 text-6xl md:text-9xl">{title}</h1></section>
  );
}
