import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type CartItem = { key: string; id: string; size: string; color: string; qty: number };
type Store = {
  cart: CartItem[]; wishlist: string[]; recent: string[];
  addToCart: (id: string, size: string, color: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void; removeFromCart: (key: string) => void; clearCart: () => void;
  toggleWishlist: (id: string) => void; addRecent: (id: string) => void;
  toast: string | null; notify: (m: string) => void;
};
const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const loaded = useRef(false);
  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("v_cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("v_wish") || "[]"));
      setRecent(JSON.parse(localStorage.getItem("v_recent") || "[]"));
    } catch { /* ignore */ }
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    localStorage.setItem("v_cart", JSON.stringify(cart));
    localStorage.setItem("v_wish", JSON.stringify(wishlist));
    localStorage.setItem("v_recent", JSON.stringify(recent));
  }, [cart, wishlist, recent]);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  const notify = (m: string) => { setToast(m); clearTimeout(t.current); t.current = setTimeout(() => setToast(null), 2400); };
  const value: Store = {
    cart, wishlist, recent, toast, notify,
    addToCart: (id, size, color, qty = 1) => {
      const key = `${id}|${size}|${color}`;
      setCart((c) => c.some((i) => i.key === key) ? c.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i) : [...c, { key, id, size, color, qty }]);
      notify("Added to your bag");
    },
    setQty: (key, qty) => setCart((c) => c.map((i) => i.key === key ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i)),
    removeFromCart: (key) => setCart((c) => c.filter((i) => i.key !== key)),
    clearCart: () => setCart([]),
    toggleWishlist: (id) => setWishlist((w) => { const has = w.includes(id); notify(has ? "Removed from wishlist" : "Saved to wishlist"); return has ? w.filter((x) => x !== id) : [...w, id]; }),
    addRecent: (id) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useStore() { const c = useContext(Ctx); if (!c) throw new Error("StoreProvider missing"); return c; }
export const money = (n: number) => `$${n.toFixed(0)}`;
