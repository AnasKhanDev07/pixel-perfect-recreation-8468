import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { products } from "@/data/products";
import { money, useStore } from "@/context/store";
import { PageHero } from "@/components/veltron/Catalog";
export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Your Wishlist — VELTRON" }, { name: "description", content: "Pieces you've saved at VELTRON." }, { property: "og:title", content: "Wishlist — VELTRON" }, { property: "og:description", content: "Your saved VELTRON pieces." }] }),
  component: Wishlist,
});
function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <PageHero eyebrow={`${items.length} saved`} title="Wishlist" />
      <div className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10">
        {items.length === 0 ? <div className="py-20 text-center"><p className="font-display text-3xl">Nothing saved yet.</p><Link to="/shop" className="eyebrow mt-6 inline-block bg-primary px-8 py-4 text-primary-foreground">Discover the collection</Link></div> : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">{items.map((p) => (
            <div key={p.id}>
              <div className="relative"><Link to="/product/$id" params={{ id: p.id }}><img src={p.images[0]} alt={p.name} className="aspect-[3/4] w-full object-cover" /></Link>
                <button aria-label="Remove" onClick={() => toggleWishlist(p.id)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full glass"><X className="h-4 w-4" /></button></div>
              <p className="mt-3 font-display text-lg">{p.name}</p><p className="text-sm">{money(p.price)}</p>
              <button onClick={() => { addToCart(p.id, p.sizes[2]!, p.colors[0]!.name); toggleWishlist(p.id); }} className="eyebrow mt-3 w-full border border-foreground py-3 hover:bg-primary hover:text-primary-foreground">Move to bag</button>
            </div>
          ))}</div>
        )}
      </div>
    </>
  );
}
