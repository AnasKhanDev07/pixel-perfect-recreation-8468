import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Minus, Plus, Star, X, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getProduct, products } from "@/data/products";
import { money, useStore } from "@/context/store";
import { ProductCard } from "@/components/veltron/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => { const p = getProduct(params.id); if (!p) throw notFound(); return p; },
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.name} — VELTRON` }, { name: "description", content: loaderData.description.slice(0, 155) }, { property: "og:title", content: `${loaderData.name} — VELTRON` }, { property: "og:description", content: `${loaderData.material}. ${loaderData.fit} fit.` }] : [{ title: "Product unavailable — VELTRON" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <div className="pt-40 pb-24 text-center"><h1 className="text-5xl">Piece not found</h1><Link to="/shop" className="eyebrow mt-6 inline-block underline">Back to shop</Link></div>,
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist, addRecent, recent } = useStore();
  const navigate = useNavigate();
  const [img, setImg] = useState(0); const [color, setColor] = useState(p.colors[0]!.name); const [size, setSize] = useState("");
  const [qty, setQty] = useState(1); const [guide, setGuide] = useState(false); const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [spin, setSpin] = useState(false); const [err, setErr] = useState(false);
  useEffect(() => { addRecent(p.id); setImg(0); setSize(""); setQty(1); setColor(p.colors[0]!.name); window.scrollTo(0, 0); }, [p.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const off = Math.round((1 - p.price / p.originalPrice) * 100);
  const add = (buy?: boolean) => { if (!size) { setErr(true); return; } addToCart(p.id, size, color, qty); if (buy) navigate({ to: "/checkout" }); };
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).concat(products.filter((x) => x.fit === p.fit && x.category !== p.category)).slice(0, 4);
  const recents = recent.filter((r) => r !== p.id).map((r) => products.find((x) => x.id === r)).filter(Boolean).slice(0, 4) as typeof products;
  return (
    <div className="mx-auto max-w-[1600px] px-6 pt-28 md:px-10">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-[80px_1fr]">
          <div className="order-2 flex gap-3 md:order-1 md:flex-col">{p.images.map((src, i) => <button key={i} onClick={() => setImg(i)} className={`w-20 border-2 ${img === i ? "border-foreground" : "border-transparent opacity-60"}`}><img src={src} alt="" className="aspect-[3/4] w-full object-cover" /></button>)}</div>
          <div className="relative order-1 aspect-[3/4] cursor-zoom-in overflow-hidden bg-card [perspective:1200px] md:order-2"
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }} onMouseLeave={() => setZoom(null)}>
            <AnimatePresence mode="wait">
              <motion.img key={img} src={p.images[img]!} alt={p.name} initial={{ opacity: 0, rotateY: -25 }} animate={spin ? { opacity: 1, rotateY: [0, 360] } : { opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 25 }}
                transition={spin ? { duration: 2.4, ease: "easeInOut" } : { duration: 0.6 }} onAnimationComplete={() => setSpin(false)}
                className="h-full w-full object-cover transition-transform duration-200" style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
            </AnimatePresence>
            <button onClick={() => { setSpin(true); let i = 0; const t = setInterval(() => { i++; setImg((v) => (v + 1) % p.images.length); if (i >= p.images.length) clearInterval(t); }, 800); }} className="eyebrow absolute bottom-4 left-4 flex items-center gap-2 glass px-4 py-2 text-[0.6rem]"><RotateCw className="h-3 w-3" /> 360° view</button>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-muted-foreground">{p.category} · {p.fit} fit</p>
          <h1 className="mt-3 text-5xl md:text-6xl">{p.name}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm"><Star className="h-4 w-4 fill-foreground" /> {p.rating.toFixed(1)} <span className="text-muted-foreground">· 120+ reviews</span></div>
          <div className="mt-6 flex items-baseline gap-3 text-2xl">{money(p.price)}{off > 0 && <><span className="text-lg text-muted-foreground line-through">{money(p.originalPrice)}</span><span className="eyebrow bg-accent px-2 py-1 text-accent-foreground">-{off}%</span></>}</div>
          <p className="eyebrow mt-8">Colour — {color}</p>
          <div className="mt-3 flex gap-3">{p.colors.map((c) => <button key={c.name} aria-label={c.name} onClick={() => setColor(c.name)} className={`h-10 w-10 rounded-full border-2 ${color === c.name ? "border-foreground" : "border-border"}`} style={{ background: c.hex }} />)}</div>
          <div className="mt-8 flex justify-between"><p className="eyebrow">Waist size</p><button onClick={() => setGuide(true)} className="eyebrow underline">Size guide</button></div>
          <div className="mt-3 flex flex-wrap gap-2">{p.sizes.map((s) => <button key={s} onClick={() => { setSize(s); setErr(false); }} className={`h-12 w-14 border text-sm transition ${size === s ? "border-foreground bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{s}</button>)}</div>
          {err && <p className="mt-2 text-sm text-destructive">Please select a size.</p>}
          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-border"><button aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))} className="p-4"><Minus className="h-4 w-4" /></button><span className="w-8 text-center">{qty}</span><button aria-label="Increase" onClick={() => setQty(Math.min(10, qty + 1))} className="p-4"><Plus className="h-4 w-4" /></button></div>
            <button onClick={() => add()} className="eyebrow flex-1 bg-primary text-primary-foreground transition hover:opacity-90">Add to bag</button>
            <button aria-label="Wishlist" onClick={() => toggleWishlist(p.id)} className="border border-border px-4"><Heart className={`h-5 w-5 ${wishlist.includes(p.id) ? "fill-foreground" : ""}`} /></button>
          </div>
          <button onClick={() => add(true)} className="eyebrow mt-3 w-full border border-foreground py-4 hover:bg-primary hover:text-primary-foreground">Buy now (demo)</button>
          <div className="mt-10 divide-y divide-border border-y border-border text-sm">
            {[["Description", p.description], ["Fabric", `${p.material}. Woven at heritage mills and finished in our atelier. Dry clean or cold gentle wash.`], ["Fit", `${p.fit} silhouette with a mid rise. Model is 188cm and wears size 32.`]].map(([t, d]) => <details key={t} className="py-5" open={t === "Description"}><summary className="eyebrow cursor-pointer">{t}</summary><p className="mt-3 text-muted-foreground">{d}</p></details>)}
          </div>
        </div>
      </div>
      <Row title="You may also like" items={related} />
      {recents.length > 0 && <Row title="Recently viewed" items={recents} />}
      <AnimatePresence>{guide && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-ink/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setGuide(false)}>
          <motion.div initial={{ y: 30 }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg bg-background p-8">
            <button aria-label="Close" onClick={() => setGuide(false)} className="absolute right-4 top-4"><X /></button>
            <h3 className="text-3xl">Size guide</h3>
            <table className="mt-6 w-full text-sm"><thead><tr className="eyebrow border-b border-border text-left"><th className="py-2">Size</th><th>Waist (cm)</th><th>Hip (cm)</th><th>Inseam (cm)</th></tr></thead>
              <tbody>{["28", "30", "32", "34", "36", "38"].map((s, i) => <tr key={s} className="border-b border-border"><td className="py-2">{s}</td><td>{71 + i * 5}</td><td>{90 + i * 5}</td><td>{80 + Math.min(i, 3)}</td></tr>)}</tbody></table>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}
function Row({ title, items }: { title: string; items: typeof products }) {
  return <section className="py-20"><h2 className="text-4xl">{title}</h2><div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div></section>;
}
