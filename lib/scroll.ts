/** Smoothly scroll to an element id, using Lenis when available. */
export function scrollToId(id: string, offset = -80) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: "smooth" });
}
