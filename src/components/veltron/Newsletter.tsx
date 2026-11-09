import { useState } from "react";
export function Newsletter({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState(""); const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); setMsg(ok ? { ok, t: "Welcome to the inner circle." } : { ok, t: "Please enter a valid email address." }); if (ok) setEmail(""); }}>
      <div className={`flex border-b ${dark ? "border-ink-foreground/40" : "border-foreground"}`}>
        <input aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 bg-transparent py-4 outline-none placeholder:opacity-60" />
        <button className="eyebrow">Subscribe</button>
      </div>
      {msg && <p className={`mt-3 text-sm ${msg.ok ? "" : "text-destructive"}`}>{msg.t}</p>}
    </form>
  );
}
