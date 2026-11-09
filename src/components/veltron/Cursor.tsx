import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
export function Cursor() {
  const x = useSpring(useMotionValue(-100), { stiffness: 400, damping: 30 });
  const y = useSpring(useMotionValue(-100), { stiffness: 400, damping: 30 });
  const [on, setOn] = useState(false); const [big, setBig] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setBig(!!(e.target as HTMLElement).closest("a,button")); };
    window.addEventListener("mousemove", m); return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  if (!on) return null;
  return <motion.div style={{ x, y }} animate={{ scale: big ? 2.4 : 1 }} className="pointer-events-none fixed left-0 top-0 z-[100] -ml-2 -mt-2 h-4 w-4 rounded-full border border-silver mix-blend-difference bg-silver/30" />;
}
