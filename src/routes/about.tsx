import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/data/products";
import editorial from "@/assets/editorial.jpg";
import { Reveal } from "@/components/veltron/motion";
import { PageHero } from "@/components/veltron/Catalog";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About VELTRON — Our Story & Craft" }, { name: "description", content: "The story, philosophy and craftsmanship behind VELTRON luxury trousers." }, { property: "og:title", content: "About VELTRON" }, { property: "og:description", content: "Born from a single, perfect trouser." }] }),
  component: () => (
    <>
      <PageHero eyebrow="Est. Milan" title="Our Story" image={editorial} />
      <section className="mx-auto max-w-4xl px-6 py-24 text-center"><Reveal><p className="font-display text-3xl leading-snug md:text-5xl">“We believe the perfect trouser changes how a man stands, walks and feels. Everything we make begins there.”</p><p className="eyebrow mt-8 text-muted-foreground">— Founder, VELTRON</p></Reveal></section>
      {[["Philosophy", "Less, but perfect.", "We make only trousers. That focus lets us obsess over every millimetre: rise, seat, break and drape. No trends, no noise — just the essential, executed flawlessly.", images.look1],
        ["Inspiration", "Architecture in cloth.", "Brutalist concrete, desert dunes and Milanese tailoring shape our silhouettes. Each collection is drafted like a building: structure first, then softness.", images.look2],
        ["Craftsmanship", "Forty hands per pair.", "From Okayama selvedge to Biella wool, we work with heritage mills. Every pair passes through forty skilled hands and twelve quality checks before it reaches you.", images.formal]].map(([e, t, d, img], i) => (
        <section key={e} className={`mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
          <Reveal><img src={img} alt={t} loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
          <Reveal delay={0.1}><p className="eyebrow text-muted-foreground">{e}</p><h2 className="mt-3 text-5xl">{t}</h2><p className="mt-6 max-w-md text-muted-foreground">{d}</p></Reveal>
        </section>
      ))}
      <section className="bg-ink py-24 text-ink-foreground"><div className="mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-2 md:px-10">
        <Reveal><p className="eyebrow opacity-60">Mission</p><h3 className="mt-3 text-4xl">To craft the last trousers you'll ever need to replace.</h3></Reveal>
        <Reveal delay={0.1}><p className="eyebrow opacity-60">Vision</p><h3 className="mt-3 text-4xl">A wardrobe of fewer, better pieces — for every man, everywhere.</h3></Reveal>
      </div></section>
    </>
  ),
});
