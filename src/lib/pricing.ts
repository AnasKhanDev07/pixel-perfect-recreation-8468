export const FREE_SHIPPING_THRESHOLD = 300;
export const SHIPPING_FEE = 15;
export const DISCOUNT_CODE = "VELTRON10";
export function totals(subtotal: number, code: string) {
  const discount = code.trim().toUpperCase() === DISCOUNT_CODE ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}
