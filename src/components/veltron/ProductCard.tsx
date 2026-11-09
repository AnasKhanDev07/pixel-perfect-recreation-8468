import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { money, useStore } from "@/context/store";

export function ProductCard({ p, onQuick }: { p: Product; onQuick?: (p: Product) => void }) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 });
  const saved = wishlist.includes(p.id);
  return (
    <motion.article layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className="group [perspective:1000px]">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative overflow-hidden bg-card shadow-luxe [transform-style:preserve-3d]"
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
        onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}>
        <Link to="/product/$id" params={{ id: p.id }} className="block aspect-[3/4]">
          <img src={p.images[0]} alt={p.name} loading="lazy" width={768} height={1024} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0" />
          <img src={p.images[1]} alt="" loading="lazy" width={768} height={1024} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100" />
        </Link>
        {p.badge && <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1 text-[0.6rem] text-foreground">{p.badge}</span>}
        <button aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} onClick={() => toggleWishlist(p.id)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass text-foreground transition hover:scale-110">
          <Heart className={`h-4 w-4 ${saved ? "fill-foreground" : ""}`} />
        </button>
        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button onClick={() => addToCart(p.id, p.sizes[2], p.colors[0].name)} className="eyebrow flex flex-1 items-center justify-center gap-1 bg-primary py-3 text-[0.6rem] text-primary-foreground">
            <Plus className="h-3 w-3" /> Add
          </button>
          {onQuick && <button onClick={() => onQuick(p)} className="eyebrow flex-1 glass py-3 text-[0.6rem] text-foreground">Quick view</button>}
        </div>
      </motion.div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-[0.6rem] text-muted-foreground">{p.category}</p>
          <Link to="/product/$id" params={{ id: p.id }} className="mt-1 block font-display text-lg">{p.name}</Link>
        </div>
        <div className="text-right text-sm">
          <p>{money(p.price)}</p>
          {p.originalPrice > p.price && <p className="text-muted-foreground line-through">{money(p.originalPrice)}</p>}
        </div>
      </div>
    </motion.article>
  );
}
