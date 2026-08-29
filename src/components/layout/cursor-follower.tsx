"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, select, textarea, label";

export const CursorFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let hovering = false;
    let visible = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const next = e
        .composedPath()
        .some((n) => n instanceof Element && n.matches(INTERACTIVE));
      if (next !== hovering) {
        hovering = next;
        ring.style.width = ring.style.height = hovering ? "36px" : "24px";
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const render = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-9999 hidden md:block"
    >
      <div
        ref={ringRef}
        style={{ width: 24, height: 24, opacity: 0, willChange: "transform" }}
        className="absolute left-0 top-0 rounded-full border border-[#c9a86a]/70 shadow-[0_0_16px_rgba(201,168,106,0.3)] transition-[width,height,opacity] duration-200"
      />
      <div
        ref={dotRef}
        style={{ opacity: 0, willChange: "transform" }}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-[#c9a86a] transition-opacity duration-200"
      />
    </div>
  );
};
