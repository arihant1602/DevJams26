"use client";

import { useEffect, useState, useRef } from "react";

export function CtaButtons() {
  const [orangeBtn, setOrangeBtn] = useState<{ dragX: number; dragY: number; isDragging: boolean }>({
    dragX: 0,
    dragY: 0,
    isDragging: false,
  });

  const [greenBtn, setGreenBtn] = useState<{ dragX: number; dragY: number; isDragging: boolean }>({
    dragX: 0,
    dragY: 0,
    isDragging: false,
  });

  const dragStartRef = useRef<{
    target: "orange" | "green";
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    hasDragged: boolean;
  } | null>(null);

  const performScroll = () => {
    const targetEl = document.getElementById("what-it-is");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleWindowPointerMove = (e: PointerEvent) => {
      if (!dragStartRef.current) return;
      const { target, startX, startY, initialX, initialY } = dragStartRef.current;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.hypot(dx, dy) > 5) {
        dragStartRef.current.hasDragged = true;
      }

      if (target === "orange") {
        setOrangeBtn((prev) => ({ ...prev, dragX: initialX + dx, dragY: initialY + dy }));
      } else if (target === "green") {
        setGreenBtn((prev) => ({ ...prev, dragX: initialX + dx, dragY: initialY + dy }));
      }
    };

    const handleWindowPointerUp = () => {
      if (!dragStartRef.current) return;
      const { target, hasDragged } = dragStartRef.current;
      dragStartRef.current = null;

      if (target === "orange") {
        setOrangeBtn((prev) => ({ ...prev, isDragging: false }));
      } else {
        setGreenBtn((prev) => ({ ...prev, isDragging: false }));
      }

      // If user clicked (did not drag significantly), trigger smooth scroll immediately
      if (!hasDragged) {
        performScroll();
      }
    };

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
    };
  }, []);

  const handlePointerDown = (target: "orange" | "green", e: React.PointerEvent) => {
    const initialX = target === "orange" ? orangeBtn.dragX : greenBtn.dragX;
    const initialY = target === "orange" ? orangeBtn.dragY : greenBtn.dragY;

    dragStartRef.current = {
      target,
      startX: e.clientX,
      startY: e.clientY,
      initialX,
      initialY,
      hasDragged: false,
    };

    if (target === "orange") {
      setOrangeBtn((prev) => ({ ...prev, isDragging: true }));
    } else {
      setGreenBtn((prev) => ({ ...prev, isDragging: true }));
    }
  };

  return (
    <div className="center-cta-container">
      {/* Orange Main CTA - Get Started */}
      <button
        type="button"
        className={`cta-btn cta-btn-orange ${orangeBtn.isDragging ? "is-dragging" : ""}`}
        onPointerDown={(e) => handlePointerDown("orange", e)}
        onClick={(e) => {
          e.preventDefault();
          performScroll();
        }}
        style={{
          transform: orangeBtn.dragX || orangeBtn.dragY
            ? `translate3d(${orangeBtn.dragX}px, ${orangeBtn.dragY}px, 0) scale(var(--orange-btn-scale, 1))`
            : undefined,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Images/Orange_Button.png"
          alt="Get Started"
          className="cta-btn-bg"
          draggable={false}
        />
        <span className="cta-btn-text kitchenos-title">Get Started</span>
      </button>

      {/* Green Secondary CTA - What it is */}
      <button
        type="button"
        className={`cta-btn cta-btn-green ${greenBtn.isDragging ? "is-dragging" : ""}`}
        onPointerDown={(e) => handlePointerDown("green", e)}
        onClick={(e) => {
          e.preventDefault();
          performScroll();
        }}
        style={{
          transform: greenBtn.dragX || greenBtn.dragY
            ? `translate3d(${greenBtn.dragX}px, ${greenBtn.dragY}px, 0) scale(var(--green-btn-scale, 1))`
            : undefined,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Images/Green_Button.png"
          alt="What it is"
          className="cta-btn-bg"
          draggable={false}
        />
        <span className="cta-btn-text kitchenos-title">What it is</span>
      </button>
    </div>
  );
}
