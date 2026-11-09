import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { money, useStore } from "@/context/store";
import { totals } from "@/lib/pricing";
import { Summary, useCartLines } from "@/components/veltron/CartBits";
export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): { code?: string | undefined } => ({ code: typeof s["code"] === "string" ? s["code"] : undefined }),
  head: () => ({ meta: [{ title: "Checkout (Demo) — VELTRON" }, { name: "description", content: "Demo checkout for the VELTRON store. No real payments are processed." }, { property: "og:title", content: "Checkout — VELTRON" }, { property: "og:description", content: "Demo checkout." }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});
const FIELDS = [["first", "First name"], ["last", "Last name"], ["email", "Email"], ["phone", "Phone"], ["address", "Street address"], ["city", "City"], ["zip", "Postal code"], ["country", "Country"]] as const;
function Checkout() {
  const { code } = Route.useSearch(); const { clearCart } = useStore(); const lines = useCartLines();
  const [f, setF] = useState<Record<string, string>>({}); const [pay, setPay] = useState("card"); const [errs, setErrs] = useState<string[]>([]);
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);
  const t = totals(lines.reduce((a, l) => a + l.p.price * l.qty, 0), code ?? "");
  if (order) return (
    <div className="mx-auto max-w-xl px-6 pb-24 pt-40 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></motion.div>
      <h1 className="mt-8 text-5xl">Thank you.</h1><p className="mt-4 text-muted-foreground">Demo order <strong>{order.id}</strong> for {money(order.total)} is confirmed. No payment was taken.</p>
      <Link to="/shop" className="eyebrow mt-8 inline-block bg-primary px-8 py-4 text-primary-foreground">Continue shopping</Link>
    </div>
  );
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = FIELDS.filter(([k]) => !f[k]?.trim()).map(([k]) => k as string);
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) missing.push("email");
    setErrs(missing); if (missing.length || !lines.length) return;
    setOrder({ id: "VLT-" + Math.random().toString(36).slice(2, 8).toUpperCase(), total: t.total }); clearCart();
  };
  return (
    <div className="mx-auto max-w-[1600px] px-6 pb-24 pt-32 md:px-10">
      <p className="eyebrow inline-block bg-accent px-3 py-2 text-accent-foreground">Demo checkout — no real payment is processed</p>
      <h1 className="mt-6 text-6xl">Checkout</h1>
      <form noValidate onSubmit={submit} className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="text-2xl">Customer & shipping</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">{FIELDS.map(([k, label]) => (
            <label key={k} className={k === "address" ? "md:col-span-2" : ""}><span className="eyebrow text-muted-foreground">{label}</span>
              <input value={f[k] ?? ""} onChange={(e) => setF({ ...f, [k]: e.target.value })} className={`mt-2 w-full border-b bg-transparent py-3 outline-none ${errs.includes(k) ? "border-destructive" : "border-foreground"}`} />
              {errs.includes(k) && <span className="text-xs text-destructive">Required{k === "email" ? " — valid email" : ""}</span>}</label>
          ))}</div>
          <h2 className="mt-12 text-2xl">Payment method (demo)</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{[["card", "Credit card"], ["paypal", "PayPal"], ["cod", "Cash on delivery"]].map(([v, l]) => (
            <button type="button" key={v} onClick={() => setPay(v)} className={`border p-5 text-left text-sm ${pay === v ? "border-foreground bg-card" : "border-border"}`}>{l}</button>
          ))}</div>
        </div>
        <aside className="h-fit bg-card p-8">
          <h2 className="text-3xl">Order</h2>
          <div className="mt-6 space-y-4">{lines.map((l) => <div key={l.key} className="flex gap-3 text-sm"><img src={l.p.images[0]} alt="" className="h-16 w-12 object-cover" /><div className="flex-1"><p>{l.p.name}</p><p className="text-muted-foreground">{l.size} · ×{l.qty}</p></div><p>{money(l.p.price * l.qty)}</p></div>)}</div>
          {!lines.length && <p className="mt-4 text-sm text-muted-foreground">Your bag is empty.</p>}
          <Summary t={t} />
          <button disabled={!lines.length} className="eyebrow mt-6 w-full bg-primary py-4 text-primary-foreground disabled:opacity-40">Place demo order</button>
        </aside>
      </form>
    </div>
  );
}
