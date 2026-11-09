import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/context/store";
import { categories } from "@/data/categories";

const nav = [
  { to: "/shop", label: "Shop" }, { to: "/new-arrivals", label: "Collections" },
  { to: "/lookbook", label: "Lookbook" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { cart, wishlist } = useStore();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { setOpen(false); setMega(false); setSearch(false); }, [path]);
  const overHero = path === "/" && !scrolled && !mega;
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const tone = overHero ? "text-ink-foreground" : "text-foreground";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${overHero ? "" : "glass border-b border-border"}`} onMouseLeave={() => setMega(false)}>
      <div className={`mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-10 ${tone}`}>
        <button className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className="eyebrow hover:opacity-60">Home</Link>
          <button className="eyebrow hover:opacity-60" onMouseEnter={() => setMega(true)} onClick={() => setMega((m) => !m)}>Categories</button>
          {nav.slice(0, 3).map((n) => <Link key={n.to} to={n.to} className="eyebrow hover:opacity-60">{n.label}</Link>)}
        </nav>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-display text-2xl tracking-[0.45em] md:text-3xl">VELTRON</Link>
        <div className="flex items-center gap-5">
          {nav.slice(3).map((n) => <Link key={n.to} to={n.to} className="eyebrow hidden hover:opacity-60 xl:block">{n.label}</Link>)}
          <button aria-label="Search" onClick={() => setSearch((s) => !s)}><Search className="h-5 w-5" /></button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hidden sm:block"><Heart className="h-5 w-5" />{wishlist.length > 0 && <Badge n={wishlist.length} />}</Link>
          <Link to="/cart" aria-label="Bag" className="relative"><ShoppingBag className="h-5 w-5" />{count > 0 && <Badge n={count} />}</Link>
        </div>
      </div>
      <AnimatePresence>
        {search && (
          <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/shop", search: { q: q || undefined } }); }} className="overflow-hidden border-t border-border bg-background">
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jeans, cargo, linen…" className="mx-auto block w-full max-w-[1600px] bg-transparent px-6 py-6 font-display text-3xl outline-none md:px-10" />
          </motion.form>
        )}
        {mega && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="hidden border-t border-border bg-background lg:block">
            <div className="mx-auto grid max-w-[1600px] grid-cols-5 gap-4 px-10 py-8">
              {categories.map((c, i) => (
                <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link to="/shop" search={{ cat: c.name }} className="group flex items-center gap-3">
                    <img src={c.image} alt="" className="h-16 w-12 object-cover transition group-hover:scale-105" />
                    <span className="font-display text-lg group-hover:italic">{c.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col bg-ink p-8 text-ink-foreground">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="self-end"><X /></button>
            <nav className="mt-10 flex flex-col gap-4">
              {[{ to: "/", label: "Home" }, { to: "/categories", label: "Categories" }, ...nav, { to: "/wishlist", label: "Wishlist" }, { to: "/cart", label: "Bag" }].map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                  <Link to={n.to} className="font-display text-4xl">{n.label}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
function Badge({ n }: { n: number }) {
  return <motion.span key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.6rem] font-bold text-accent-foreground">{n}</motion.span>;
}
