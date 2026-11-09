import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { money, useStore } from "@/context/store";
export function QuickView({ p, onClose }: { p: Product | null; onClose: () => void }) {
  const { addToCart } = useStore(); const [size, setSize] = useState("");
  useEffect(() => setSize(""), [p]);
  return (
    <AnimatePresence>{p && (
      <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-ink/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40 }} onClick={(e) => e.stopPropagation()} className="grid max-h-[90vh] w-full max-w-3xl overflow-auto bg-background md:grid-cols-2">
          <img src={p.images[0]} alt={p.name} className="aspect-[3/4] w-full object-cover" />
          <div className="relative p-8">
            <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4"><X /></button>
            <p className="eyebrow text-muted-foreground">{p.category}</p>
            <h3 className="mt-2 text-3xl">{p.name}</h3>
            <p className="mt-3 text-lg">{money(p.price)}</p>
            <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{p.sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`h-10 w-12 border text-sm ${size === s ? "border-foreground bg-primary text-primary-foreground" : "border-border"}`}>{s}</button>)}</div>
            <button disabled={!size} onClick={() => { addToCart(p.id, size, p.colors[0].name); onClose(); }} className="eyebrow mt-6 w-full bg-primary py-4 text-primary-foreground disabled:opacity-40">{size ? "Add to bag" : "Select a size"}</button>
            <Link to="/product/$id" params={{ id: p.id }} className="eyebrow mt-4 block text-center underline">Full details</Link>
          </div>
        </motion.div>
      </motion.div>
    )}</AnimatePresence>
  );
}
