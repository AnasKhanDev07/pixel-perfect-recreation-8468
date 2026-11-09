import { products } from "@/data/products";
import { money, useStore } from "@/context/store";
import type { totals } from "@/lib/pricing";
export function useCartLines() {
  const { cart } = useStore();
  return cart.map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! })).filter((l) => l.p);
}
export function Summary({ t }: { t: ReturnType<typeof totals> }) {
  return <dl className="mt-6 space-y-3 text-sm">
    <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(t.subtotal)}</dd></div>
    <div className="flex justify-between"><dt>Discount</dt><dd>{t.discount ? `−${money(t.discount)}` : "—"}</dd></div>
    <div className="flex justify-between"><dt>Shipping</dt><dd>{t.shipping ? money(t.shipping) : "Free"}</dd></div>
    <div className="flex justify-between border-t border-border pt-3 text-lg"><dt>Total</dt><dd>{money(t.total)}</dd></div>
  </dl>;
}
