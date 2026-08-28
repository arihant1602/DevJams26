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

  const activeDrag = useRef<{
    target: "orange" | "green";
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!activeDrag.current) return;
      const { target, startX, startY, initialX, initialY } = activeDrag.current;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (target === "orange") {
        setOrangeBtn((prev) => ({ ...prev, dragX: initialX + dx, dragY: initialY + dy }));
      } else if (target === "green") {
        setGreenBtn((prev) => ({ ...prev, dragX: initialX + dx, dragY: initialY + dy }));
      }
    };

    const handlePointerUp = () => {
      if (!activeDrag.current) return;
      const target = activeDrag.current.target;
      activeDrag.current = null;

      if (target === "orange") {
        setOrangeBtn((prev) => ({ ...prev, isDragging: false }));
      } else if (target === "green") {
        setGreenBtn((prev) => ({ ...prev, isDragging: false }));
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const startDrag = (target: "orange" | "green", e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const initialX = target === "orange" ? orangeBtn.dragX : greenBtn.dragX;
    const initialY = target === "orange" ? orangeBtn.dragY : greenBtn.dragY;

    activeDrag.current = {
      target,
      startX: e.clientX,
      startY: e.clientY,
      initialX,
      initialY,
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
      <a
        href="#get-started"
        className={`cta-btn cta-btn-orange ${orangeBtn.isDragging ? "is-dragging" : ""}`}
        onPointerDown={(e) => startDrag("orange", e)}
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
      </a>

      {/* Green Secondary CTA - What it is */}
      <a
        href="#what-it-is"
        className={`cta-btn cta-btn-green ${greenBtn.isDragging ? "is-dragging" : ""}`}
        onPointerDown={(e) => startDrag("green", e)}
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
      </a>
    </div>
  );
}
