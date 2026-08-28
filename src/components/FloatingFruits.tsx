"use client";

import { useEffect, useState, useRef } from "react";

// Exactly 10 unique food items (1 per type, 0 duplicates)
const UNIQUE_FOOD_IMAGES = [
  "/Images/Apple.png",
  "/Images/Orange_Fruit.png",
  "/Images/Watermelon.png",
  "/Images/Carrot.png",
  "/Images/Mushroom.png",
  "/Images/Donut.png",
  "/Images/Omelette.png",
  "/Images/Bread.png",
  "/Images/Coffee.png",
  "/Images/Beer.png",
];

// 10 distinct screen zones for uncluttered, well-spaced distribution across screen borders
const SCREEN_ZONES = [
  { left: 8, top: 8 },
  { left: 32, top: 10 },
  { left: 62, top: 8 },
  { left: 82, top: 14 },
  { left: 10, top: 40 },
  { left: 78, top: 42 },
  { left: 36, top: 72 },
  { left: 56, top: 74 },
  { left: 78, top: 70 },
  { left: 14, top: 76 },
];

interface FruitState {
  id: number;
  src: string;
  left: number;
  top: number;
  baseSize: number;
  animType: number;
  duration: number;
  delay: number;
  isDragging: boolean;
}

export function FloatingFruits() {
  const [fruits, setFruits] = useState<FruitState[]>([]);
  const activeDrag = useRef<{
    id: number;
    startX: number;
    startY: number;
    initialLeftPct: number;
    initialTopPct: number;
  } | null>(null);

  useEffect(() => {
    // Generate exactly 10 unique items placed in well-spaced screen zones
    const items: FruitState[] = UNIQUE_FOOD_IMAGES.map((src, i) => {
      const zone = SCREEN_ZONES[i];
      const jitterX = (Math.random() - 0.5) * 6; // ±3%
      const jitterY = (Math.random() - 0.5) * 6; // ±3%

      const left = Math.max(5, Math.min(85, zone.left + jitterX));
      const top = Math.max(5, Math.min(78, zone.top + jitterY));
      const baseSize = Math.floor(Math.random() * 30) + 125; // 125px to 155px
      const duration = Math.floor(Math.random() * 6) + 14;
      const delay = -(Math.random() * 12);

      return {
        id: i,
        src,
        left,
        top,
        baseSize,
        animType: i % 4,
        duration,
        delay,
        isDragging: false,
      };
    });

    setFruits(items);

    // Window global pointer listeners prevent setPointerCapture errors completely
    const handleWindowPointerMove = (e: PointerEvent) => {
      if (!activeDrag.current) return;
      const { id, startX, startY, initialLeftPct, initialTopPct } = activeDrag.current;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const deltaPctX = (deltaX / window.innerWidth) * 100;
      const deltaPctY = (deltaY / window.innerHeight) * 100;

      const newLeft = Math.max(3, Math.min(87, initialLeftPct + deltaPctX));
      const newTop = Math.max(3, Math.min(82, initialTopPct + deltaPctY));

      setFruits((prev) =>
        prev.map((f) => (f.id === id ? { ...f, left: newLeft, top: newTop } : f))
      );
    };

    const handleWindowPointerUp = () => {
      if (!activeDrag.current) return;
      const id = activeDrag.current.id;
      activeDrag.current = null;
      setFruits((prev) =>
        prev.map((f) => (f.id === id ? { ...f, isDragging: false } : f))
      );
    };

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
    };
  }, []);

  const handlePointerDown = (id: number, e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const fruit = fruits.find((f) => f.id === id);
    if (!fruit) return;

    activeDrag.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialLeftPct: fruit.left,
      initialTopPct: fruit.top,
    };

    setFruits((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isDragging: true } : f))
    );
  };

  return (
    <div className="floating-container">
      {fruits.map((fruit) => {
        const computedWidth = `calc(${fruit.baseSize}px * var(--fruit-scale, 1))`;

        return (
          <div
            key={fruit.id}
            className={`fruit-wrapper ${fruit.isDragging ? "is-dragging" : `float-anim-${fruit.animType}`}`}
            style={{
              left: `${fruit.left}%`,
              top: `${fruit.top}%`,
              width: computedWidth,
              height: computedWidth,
              animationDuration: `${fruit.duration}s`,
              animationDelay: `${fruit.delay}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fruit.src}
              alt="food"
              className="fruit-img"
              draggable={false}
              onPointerDown={(e) => handlePointerDown(fruit.id, e)}
            />
          </div>
        );
      })}
    </div>
  );
}
