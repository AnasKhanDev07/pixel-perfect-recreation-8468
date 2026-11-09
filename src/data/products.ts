import jeans from "@/assets/jeans.jpg";
import cargo from "@/assets/cargo.jpg";
import chinos from "@/assets/chinos.jpg";
import formal from "@/assets/formal.jpg";
import joggers from "@/assets/joggers.jpg";
import baggy from "@/assets/baggy.jpg";
import linen from "@/assets/linen.jpg";
import wide from "@/assets/wide.jpg";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";

export const images = { jeans, cargo, chinos, formal, joggers, baggy, linen, wide, look1, look2 };

export type Category =
  | "Jeans" | "Cargo Pants" | "Chinos" | "Formal Trousers" | "Baggy Pants"
  | "Joggers" | "Slim Fit" | "Straight Fit" | "Linen Pants" | "Wide Leg Pants";

export type Product = {
  id: string; name: string; category: Category; price: number; originalPrice: number;
  description: string; images: string[]; sizes: string[]; colors: { name: string; hex: string }[];
  fit: "Slim" | "Straight" | "Relaxed" | "Baggy" | "Wide" | "Tapered";
  material: string; rating: number; badge?: "New" | "Bestseller" | "Limited" | "Sale"; isNew?: boolean; trending?: boolean;
};

const S = ["28", "30", "32", "34", "36", "38"];
const C = {
  black: { name: "Onyx", hex: "#151515" }, charcoal: { name: "Charcoal", hex: "#3b3b3b" },
  stone: { name: "Stone", hex: "#c9b99a" }, ivory: { name: "Ivory", hex: "#ece6da" },
  indigo: { name: "Indigo", hex: "#1f2740" }, grey: { name: "Heather", hex: "#9a9a9a" },
};

const raw: [string, Category, number, number, string, string[], Product["fit"], string, Product["badge"]?, boolean?, boolean?][] = [
  ["Atelier Selvedge Jean", "Jeans", 240, 280, jeans, ["indigo", "black"], "Straight", "14oz Japanese selvedge denim", "Bestseller", false, true],
  ["Nocturne Tapered Jean", "Jeans", 220, 220, baggy, ["black", "charcoal"], "Tapered", "Stretch comfort denim", "New", true],
  ["Rinse Slim Jean", "Slim Fit", 195, 230, jeans, ["indigo"], "Slim", "Organic cotton denim", "Sale"],
  ["Monolith Cargo", "Cargo Pants", 260, 260, cargo, ["black", "charcoal"], "Relaxed", "Technical ripstop cotton", "Bestseller", false, true],
  ["Vector Utility Cargo", "Cargo Pants", 285, 320, cargo, ["black", "stone"], "Tapered", "Water-repellent nylon twill", "Limited", true],
  ["Riviera Chino", "Chinos", 175, 175, chinos, ["stone", "ivory"], "Slim", "Brushed Italian cotton twill", "New", true, true],
  ["Sable Pleated Chino", "Chinos", 190, 220, wide, ["stone", "charcoal"], "Relaxed", "Garment-dyed gabardine"],
  ["Milano Wool Trouser", "Formal Trousers", 340, 340, formal, ["charcoal", "black"], "Straight", "Super 120s virgin wool", "Bestseller", false, true],
  ["Savile Double Pleat", "Formal Trousers", 380, 420, formal, ["charcoal"], "Wide", "Wool-cashmere flannel", "Limited"],
  ["Evening Tuxedo Trouser", "Formal Trousers", 410, 410, look1, ["black"], "Slim", "Mohair-wool with satin stripe", "New", true],
  ["Concrete Baggy Denim", "Baggy Pants", 230, 260, baggy, ["black", "charcoal"], "Baggy", "Acid-washed rigid denim", "Bestseller", false, true],
  ["Drift Parachute Pant", "Baggy Pants", 210, 210, cargo, ["black", "stone"], "Baggy", "Crinkle nylon", "New", true],
  ["Cashmere Lounge Jogger", "Joggers", 290, 340, joggers, ["grey", "ivory"], "Tapered", "Pure Mongolian cashmere", "Bestseller", false, true],
  ["Transit Tech Jogger", "Joggers", 165, 165, joggers, ["grey", "black"], "Tapered", "Four-way stretch jersey", "New", true],
  ["Precision Slim Trouser", "Slim Fit", 210, 210, chinos, ["stone", "black"], "Slim", "Stretch cotton sateen"],
  ["Archive Slim Cargo", "Slim Fit", 235, 270, cargo, ["black"], "Slim", "Peached cotton canvas", "Sale"],
  ["Heritage Straight Jean", "Straight Fit", 215, 215, jeans, ["indigo", "black"], "Straight", "Ring-spun cotton denim", "New", true],
  ["Column Straight Trouser", "Straight Fit", 255, 290, formal, ["charcoal", "stone"], "Straight", "Tropical wool", undefined, false, true],
  ["Amalfi Linen Pant", "Linen Pants", 185, 185, linen, ["ivory", "stone"], "Relaxed", "European flax linen", "Bestseller", false, true],
  ["Dune Drawstring Linen", "Linen Pants", 170, 200, look2, ["ivory"], "Wide", "Washed linen-cotton", "New", true],
  ["Capri Linen Trouser", "Linen Pants", 199, 199, linen, ["stone", "ivory"], "Straight", "Irish linen"],
  ["Sahara Wide Leg", "Wide Leg Pants", 265, 300, wide, ["stone", "ivory"], "Wide", "Fluid wool crepe", "Limited", true, true],
  ["Brutalist Wide Trouser", "Wide Leg Pants", 295, 295, look1, ["charcoal", "ivory"], "Wide", "Wool-viscose twill", "New", true],
  ["Gallery Pleated Wide", "Wide Leg Pants", 310, 360, wide, ["stone", "black"], "Wide", "Heavy cotton drill", "Sale"],
];

const alt = [look1, look2, wide, formal, linen, chinos];
export const products: Product[] = raw.map(([name, category, price, originalPrice, img, colors, fit, material, badge, isNew, trending], i) => ({
  id: name.toLowerCase().replace(/[^a-z]+/g, "-"),
  name, category, price, originalPrice, fit, material, ...(badge ? { badge } : {}), ...(isNew ? { isNew } : {}), ...(trending ? { trending } : {}),
  description: `The ${name} is cut in our ${fit.toLowerCase()} silhouette from ${material.toLowerCase()}. Designed in our atelier with a refined rise, clean hem and hand-finished details — a modern essential built to be worn for years.`,
  images: [img, alt[i % alt.length]!, alt[(i + 2) % alt.length]!],
  sizes: S, colors: colors.map((c) => C[c as keyof typeof C]),
  rating: 4.4 + ((i * 7) % 6) / 10,
}));

export const getProduct = (id: string) => products.find((p) => p.id === id);
