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

// 10 screen zones kept strictly CLEAR of the bottom-left KitchenOS title (left < 38%, top > 58%)
const SCREEN_ZONES = [
  { left: 8, top: 8 },
  { left: 32, top: 10 },
  { left: 60, top: 8 },
  { left: 82, top: 12 },
  { left: 8, top: 36 },
  { left: 78, top: 40 },
  { left: 55, top: 45 },
  { left: 45, top: 74 },
  { left: 70, top: 72 },
  { left: 85, top: 76 },
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

// Pre-populated initial state ensures all 10 food items spawn instantly on initial load and reload
const INITIAL_FRUITS: FruitState[] = UNIQUE_FOOD_IMAGES.map((src, i) => {
  const zone = SCREEN_ZONES[i];
  return {
    id: i,
    src,
    left: zone.left,
    top: zone.top,
    baseSize: 140,
    animType: i % 4,
    duration: 15 + (i % 4) * 2,
    delay: -(i * 1.5),
    isDragging: false,
  };
});

export function FloatingFruits() {
  const [fruits, setFruits] = useState<FruitState[]>(INITIAL_FRUITS);
  const activeDrag = useRef<{
    id: number;
    startX: number;
    startY: number;
    initialLeftPct: number;
    initialTopPct: number;
  } | null>(null);

  useEffect(() => {
    // Global pointer listeners for smooth, error-free dragging
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
