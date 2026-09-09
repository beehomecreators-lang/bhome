import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "link" | "image">(
    "default"
  );
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor='link'], [role='button']"
      );
      const imageEl = target.closest("[data-cursor='image'], img");

      if (imageEl) {
        setVariant("image");
        setLabel(imageEl.getAttribute("data-cursor-label") || "View");
      } else if (interactive) {
        setVariant("link");
        setLabel("");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (!visible) return null;

  const ringSize =
    variant === "image" ? 72 : variant === "link" ? 48 : 32;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: variant === "image" ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring cursor-${variant}`}
        style={{ width: ringSize, height: ringSize }}
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
