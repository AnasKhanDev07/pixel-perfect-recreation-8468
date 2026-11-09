import { images } from "./products";
import type { Category } from "./products";
export const categories: { name: Category; image: string; tagline: string }[] = [
  { name: "Jeans", image: images.jeans, tagline: "Selvedge & rigid denim" },
  { name: "Cargo Pants", image: images.cargo, tagline: "Utility, refined" },
  { name: "Chinos", image: images.chinos, tagline: "Italian cotton twill" },
  { name: "Formal Trousers", image: images.formal, tagline: "Tailored in wool" },
  { name: "Baggy Pants", image: images.baggy, tagline: "Volume with intent" },
  { name: "Joggers", image: images.joggers, tagline: "Cashmere leisure" },
  { name: "Slim Fit", image: images.chinos, tagline: "Precise lines" },
  { name: "Straight Fit", image: images.jeans, tagline: "The timeless column" },
  { name: "Linen Pants", image: images.linen, tagline: "Mediterranean ease" },
  { name: "Wide Leg Pants", image: images.wide, tagline: "Fluid architecture" },
];
