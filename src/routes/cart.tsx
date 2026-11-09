import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { money, useStore } from "@/context/store";
import { totals, FREE_SHIPPING_THRESHOLD, DISCOUNT_CODE } from "@/lib/pricing";
import { Summary, useCartLines } from "@/components/veltron/CartBits";
import { PageHero } from "@/components/veltron/Catalog";
export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — VELTRON" }, { name: "description", content: "Review the pieces in your VELTRON bag." }, { property: "og:title", content: "Bag — VELTRON" }, { property: "og:description", content: "Your VELTRON shopping bag." }] }),
  component: Cart,
});
function Cart() {
  const { setQty, removeFromCart } = useStore(); const lines = useCartLines(); const [code, setCode] = useState("");
  const t = totals(lines.reduce((a, l) => a + l.p.price * l.qty, 0), code);
  return (
    <>
      <PageHero eyebrow={`${lines.length} items`} title="Your Bag" />
      <div className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10">
        {lines.length === 0 ? <div className="py-20 text-center"><p className="font-display text-3xl">Your bag is empty.</p><Link to="/shop" className="eyebrow mt-6 inline-block bg-primary px-8 py-4 text-primary-foreground">Continue shopping</Link></div> : (
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="divide-y divide-border border-y border-border">{lines.map((l) => (
              <div key={l.key} className="flex gap-6 py-6">
                <Link to="/product/$id" params={{ id: l.id }}><img src={l.p.images[0]} alt={l.p.name} className="w-28 object-cover aspect-[3/4]" /></Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between"><div><p className="font-display text-xl">{l.p.name}</p><p className="mt-1 text-sm text-muted-foreground">{l.color} · Size {l.size}</p></div><button aria-label="Remove" onClick={() => removeFromCart(l.key)}><X className="h-4 w-4" /></button></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border"><button aria-label="Decrease" onClick={() => setQty(l.key, l.qty - 1)} className="p-3"><Minus className="h-3 w-3" /></button><span className="w-6 text-center text-sm">{l.qty}</span><button aria-label="Increase" onClick={() => setQty(l.key, l.qty + 1)} className="p-3"><Plus className="h-3 w-3" /></button></div>
                    <p>{money(l.p.price * l.qty)}</p>
                  </div>
                </div>
              </div>
            ))}</div>
            <aside className="h-fit bg-card p-8">
              <h2 className="text-3xl">Summary</h2>
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={`Promo code (try ${DISCOUNT_CODE})`} className="mt-6 w-full border-b border-foreground bg-transparent py-2 text-sm outline-none" />
              <Summary t={t} />
              <p className="mt-3 text-xs text-muted-foreground">Free shipping on orders over {money(FREE_SHIPPING_THRESHOLD)}.</p>
              <Link to="/checkout" search={{ code: code || undefined }} className="eyebrow mt-6 block bg-primary py-4 text-center text-primary-foreground">Checkout</Link>
              <Link to="/shop" className="eyebrow mt-3 block text-center underline">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
