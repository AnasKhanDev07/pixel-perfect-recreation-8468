import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/data/products";
import editorial from "@/assets/editorial.jpg";
import hero from "@/assets/hero.jpg";
import { Reveal } from "@/components/veltron/motion";
export const Route = createFileRoute("/lookbook")({
  head: () => ({ meta: [{ title: "Lookbook AW26 — VELTRON" }, { name: "description", content: "The VELTRON Autumn/Winter 2026 lookbook: editorial campaigns and outfit stories." }, { property: "og:title", content: "Lookbook — VELTRON" }, { property: "og:description", content: "Editorial campaigns from VELTRON AW26." }] }),
  component: Lookbook,
});
function Scene({ src, title, chapter, align = "left" }: { src: string; title: string; chapter: string; align?: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1, 1.1]);
  const clip = useTransform(scrollYProgress, [0, 0.4], ["inset(15% 10% 15% 10%)", "inset(0% 0% 0% 0%)"]);
  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-ink">
      <motion.div style={{ clipPath: clip }} className="absolute inset-0"><motion.img src={src} alt={title} loading="lazy" style={{ scale }} className="h-full w-full object-cover" /></motion.div>
      <div className="absolute inset-0 bg-veil" />
      <div className={`absolute bottom-16 ${align === "left" ? "left-6 md:left-16" : "right-6 text-right md:right-16"} text-ink-foreground`}><p className="eyebrow">{chapter}</p><h2 className="mt-3 text-6xl italic md:text-8xl">{title}</h2></div>
    </div>
  );
}
function Lookbook() {
  return (
    <>
      <Scene src={hero} title="Concrete Poetry" chapter="Chapter I" />
      <section className="mx-auto grid max-w-[1600px] gap-6 px-6 py-24 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-5 md:pt-32"><p className="eyebrow text-muted-foreground">Look 01 — 03</p><h2 className="mt-4 text-5xl">Tailoring, undone.</h2><p className="mt-6 text-muted-foreground">Pleats loosen, hems pool, wool meets denim. The AW26 man dresses with intent but never strain.</p><Link to="/shop" search={{ cat: "Formal Trousers" }} className="eyebrow mt-8 inline-block border-b border-foreground pb-1">Shop the look</Link></Reveal>
        <Reveal className="md:col-span-7" delay={0.1}><img src={images.look1} alt="Look 01" loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
        <Reveal className="md:col-span-4 md:col-start-2"><img src={images.formal} alt="Look 02" loading="lazy" className="aspect-[3/4] w-full object-cover" /></Reveal>
        <Reveal className="md:col-span-5 md:col-start-7 md:-mt-40" delay={0.15}><img src={images.wide} alt="Look 03" loading="lazy" className="aspect-[3/4] w-full object-cover" /></Reveal>
      </section>
      <Scene src={images.look2} title="Desert Linen" chapter="Chapter II" align="right" />
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10">
        <Reveal><h2 className="text-center text-5xl md:text-7xl">The Outfit Edit</h2></Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[[images.linen, "Riviera Weekend", "Linen Pants"], [images.cargo, "City Utility", "Cargo Pants"], [images.joggers, "First Class", "Joggers"]].map(([src, t, c], i) => (
            <Reveal key={t} delay={i * 0.1}><Link to="/shop" search={{ cat: c }} className="group block"><div className="overflow-hidden"><img src={src} alt={t} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-1000 group-hover:scale-110" /></div><p className="eyebrow mt-4 text-muted-foreground">Outfit 0{i + 1}</p><h3 className="mt-1 text-3xl group-hover:italic">{t}</h3></Link></Reveal>
          ))}
        </div>
      </section>
      <Scene src={editorial} title="Rooftop at Dusk" chapter="Chapter III" />
    </>
  );
}
