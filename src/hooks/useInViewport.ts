import { useEffect, useState, type RefObject } from "react";

export function useInViewport<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "120px",
  enabled = true
): boolean {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry?.isIntersecting ?? false),
      { rootMargin, threshold: 0 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, ref, rootMargin]);

  return isInViewport;
}
