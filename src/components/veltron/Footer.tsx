import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Newsletter } from "./Newsletter";
import { categories } from "@/data/categories";
export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 md:grid-cols-5 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-4xl tracking-[0.4em]">VELTRON</p>
          <p className="mt-6 max-w-sm text-sm opacity-70">Precision-cut trousers for the modern man. Designed in our atelier, crafted from the world's finest mills.</p>
          <div className="mt-8 max-w-sm"><Newsletter dark /></div>
        </div>
        <Col title="Shop" links={[["/shop", "Shop All"], ["/new-arrivals", "New Arrivals"], ["/lookbook", "Lookbook"], ["/categories", "Categories"]]} />
        <div><p className="eyebrow opacity-60">Categories</p><ul className="mt-5 space-y-2 text-sm">{categories.slice(0, 6).map((c) => <li key={c.name}><Link to="/shop" search={{ cat: c.name }} className="opacity-80 hover:opacity-100">{c.name}</Link></li>)}</ul></div>
        <div>
          <Col title="Service" links={[["/contact", "Contact"], ["/about", "Our Story"], ["/cart", "Your Bag"], ["/wishlist", "Wishlist"]]} />
          <p className="mt-6 text-sm opacity-70">care@veltron.com<br />+1 (212) 555-0188</p>
          <div className="mt-4 flex gap-4"><a href="https://instagram.com" aria-label="Instagram"><Instagram className="h-4 w-4" /></a><a href="https://x.com" aria-label="X"><Twitter className="h-4 w-4" /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube className="h-4 w-4" /></a></div>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 px-6 py-6 text-center text-xs opacity-50">© 2026 VELTRON. All rights reserved. Demo store — no real orders.</div>
    </footer>
  );
}
function Col({ title, links }: { title: string; links: ["/shop" | "/new-arrivals" | "/lookbook" | "/categories" | "/contact" | "/about" | "/cart" | "/wishlist", string][] }) {
  return <div><p className="eyebrow opacity-60">{title}</p><ul className="mt-5 space-y-2 text-sm">{links.map(([to, l]) => <li key={to}><Link to={to} className="opacity-80 hover:opacity-100">{l}</Link></li>)}</ul></div>;
}
