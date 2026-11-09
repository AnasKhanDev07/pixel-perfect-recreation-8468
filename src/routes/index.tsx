import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, Gem, Ruler, Leaf, Truck, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import editorial from "@/assets/editorial.jpg";
import { products, images } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/veltron/ProductCard";
import { QuickView } from "@/components/veltron/QuickView";
import { Magnetic, Reveal, SectionHeading, SplitText } from "@/components/veltron/motion";
import { Newsletter } from "@/components/veltron/Newsletter";
import type { Product } from "@/data/products";

const Showcase3D = lazy(() => import("@/components/veltron/Showcase3D"));

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VELTRON — Beyond the Ordinary | Luxury Men's Pants" },
    { name: "description", content: "VELTRON crafts luxury jeans, chinos, cargo and tailored trousers. The art of perfect fit." },
    { property: "og:title", content: "VELTRON — Beyond the Ordinary" },
    { property: "og:description", content: "Luxury men's trousers. The art of perfect fit." },
  ] }),
  component: Home,
});

function Home() {
  const [quick, setQuick] = useState<Product | null>(null);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "35%"]);
  const [client, setClient] = useState(false);
  useEffect(() => setClient(true), []);
  const trending = products.filter((p) => p.trending).slice(0, 4);
  const best = products.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const fresh = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden bg-ink text-ink-foreground">
        <motion.img src={hero} alt="VELTRON campaign — model in charcoal wide-leg trousers" width={1920} height={1088} style={{ scale }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-veil" />
        <motion.div style={{ y }} className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 md:px-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow opacity-80">Autumn / Winter 2026</motion.p>
          <h1 className="mt-4 text-[13vw] leading-[0.9] md:text-[9vw]"><SplitText text="BEYOND THE ORDINARY." /></h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="eyebrow">The art of perfect fit.</p>
            <div className="flex gap-4">
              <Magnetic><Link to="/shop" className="eyebrow inline-flex items-center gap-2 bg-ink-foreground px-8 py-4 text-ink">Shop Collection <ArrowRight className="h-4 w-4" /></Link></Magnetic>
              <Magnetic><Link to="/lookbook" className="eyebrow inline-flex border border-ink-foreground/60 px-8 py-4">Explore</Link></Magnetic>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <div className="overflow-hidden border-b border-border py-5"><div className="marquee flex w-max gap-12 font-display text-2xl italic">{Array.from({ length: 2 }).flatMap((_, k) => categories.map((c) => <span key={k + c.name}>{c.name} ✦</span>))}</div></div>

      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10">
        <SectionHeading eyebrow="01 — Categories" title="Find your silhouette" />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.slice(0, 4).map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1} className={i % 2 ? "md:mt-16" : ""}>
              <Link to="/shop" search={{ cat: c.name }} className="group relative block aspect-[3/4] overflow-hidden">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-fade" />
                <div className="absolute bottom-5 left-5 text-ink-foreground"><p className="font-display text-2xl md:text-3xl">{c.name}</p><p className="eyebrow mt-1 text-[0.6rem] opacity-80">{c.tagline}</p></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ProductRow eyebrow="02 — Trending" title="What's moving now" items={trending} onQuick={setQuick} />

      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 md:grid-cols-[1fr_2fr] md:px-10">
          <div>
            <p className="eyebrow opacity-60">03 — The Atelier in 3D</p>
            <h2 className="mt-3 text-4xl md:text-6xl">Every angle, considered.</h2>
            <p className="mt-6 max-w-sm opacity-70">Move your cursor to turn the collection. Each panel is a signature cut from our atelier.</p>
            <Link to="/new-arrivals" className="eyebrow mt-8 inline-flex items-center gap-2 border-b border-ink-foreground pb-1">View new season <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="h-[460px] md:h-[560px]">{client && <Suspense fallback={null}><Showcase3D images={[images.chinos, images.formal, images.cargo]} /></Suspense>}</div>
        </div>
      </section>

      <ProductRow eyebrow="04 — Best Sellers" title="The icons" items={best} onQuick={setQuick} />

      <section className="relative h-[80vh] overflow-hidden">
        <ParallaxImg src={editorial} />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-ink-foreground">
          <Reveal><p className="eyebrow">The Rooftop Edit</p><h2 className="mt-4 text-5xl md:text-8xl italic">Dusk, tailored.</h2>
          <Link to="/lookbook" className="eyebrow mt-8 inline-block border border-ink-foreground px-8 py-4">Read the Lookbook</Link></Reveal>
        </div>
      </section>

      <ProductRow eyebrow="05 — New Arrivals" title="Just landed" items={fresh} onQuick={setQuick} />

      <section className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10">
        <Reveal><img src={images.look1} alt="VELTRON atelier portrait" loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
        <Reveal delay={0.15}>
          <p className="eyebrow text-muted-foreground">06 — Our Story</p>
          <h2 className="mt-3 text-4xl md:text-6xl">Born from a single, perfect trouser.</h2>
          <p className="mt-6 max-w-lg text-muted-foreground">VELTRON began in a small Milan atelier with one obsession: the line from waist to hem. Today every pair is still drafted by hand, cut from mills we know by name, and finished to last a decade.</p>
          <Link to="/about" className="eyebrow mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1">Discover VELTRON <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-[1600px] gap-px md:grid-cols-4">
          {[[Gem, "Exceptional Mills", "Japanese denim, Italian wool, Irish linen."], [Ruler, "Perfect Fit", "Drafted by hand across 6 silhouettes."], [Leaf, "Made to Last", "Responsible fibres, built for a decade."], [Truck, "Complimentary Delivery", "Free shipping on orders over $300."]].map(([Icon, t, d], i) => {
            const I = Icon as typeof Gem;
            return <Reveal key={i} delay={i * 0.08} className="p-10"><I className="h-6 w-6" /><h3 className="mt-6 text-2xl">{t as string}</h3><p className="mt-2 text-sm text-muted-foreground">{d as string}</p></Reveal>;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10">
        <SectionHeading eyebrow="07 — Voices" title="Worn and loved" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[["The Milano trouser is the best fitting pair I've owned. The drape is unreal.", "Daniel R., London"], ["Cashmere joggers that look sharp enough for a flight lounge. Instant favourite.", "Omar K., Dubai"], ["Finally, selvedge denim that fits my build without alterations.", "James T., New York"]].map(([q, a], i) => (
            <Reveal key={a} delay={i * 0.1} className="border-t border-foreground pt-6">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3 w-3 fill-foreground" />)}</div>
              <p className="mt-4 font-display text-2xl italic leading-snug">“{q}”</p><p className="eyebrow mt-6 text-muted-foreground">{a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <SectionHeading eyebrow="@veltron" title="On the street" className="mx-auto max-w-[1600px]" />
        <div className="mx-auto mt-10 grid max-w-[1600px] grid-cols-3 gap-2 md:grid-cols-6">
          {[images.look2, images.baggy, images.linen, images.formal, images.wide, images.joggers].map((src, i) => (
            <Reveal key={i} delay={i * 0.05}><a href="https://instagram.com" className="group block aspect-square overflow-hidden"><img src={src} alt="VELTRON on Instagram" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:grayscale" /></a></Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary px-6 py-24 text-center md:px-10">
        <Reveal className="mx-auto max-w-xl"><p className="eyebrow text-muted-foreground">The Inner Circle</p><h2 className="mt-3 text-4xl md:text-5xl">First access. Private releases.</h2><div className="mt-10 text-left"><Newsletter /></div></Reveal>
      </section>
      <QuickView p={quick} onClose={() => setQuick(null)} />
    </>
  );
}

function ParallaxImg({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return <div ref={ref} className="absolute inset-0"><motion.img src={src} alt="Editorial — rooftop at dusk" loading="lazy" style={{ y }} className="h-[130%] w-full object-cover -mt-[15%]" /></div>;
}

function ProductRow({ eyebrow, title, items, onQuick }: { eyebrow: string; title: string; items: Product[]; onQuick: (p: Product) => void }) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10">
      <div className="flex items-end justify-between"><SectionHeading eyebrow={eyebrow} title={title} /><Link to="/shop" className="eyebrow hidden border-b border-foreground pb-1 md:block">View all</Link></div>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} onQuick={onQuick} />)}</div>
    </section>
  );
}
