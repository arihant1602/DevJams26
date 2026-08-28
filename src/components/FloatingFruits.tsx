"use client";

import { useEffect, useState, useRef } from "react";

const FRUIT_IMAGES = [
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

interface FruitItem {
  id: number;
  src: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  floatType: number;
  isDragging?: boolean;
}

export function FloatingFruits() {
  const [fruits, setFruits] = useState<FruitItem[]>([]);
  const dragInfo = useRef<{ id: number; startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  useEffect(() => {
    const items: FruitItem[] = [];
    const totalCount = 12;

    for (let i = 0; i < totalCount; i++) {
      const src = FRUIT_IMAGES[i % FRUIT_IMAGES.length];
      const x = Math.floor(Math.random() * 75) + 10;
      const y = Math.floor(Math.random() * 65) + 10;
      const size = Math.floor(Math.random() * 60) + 140; // 140px to 200px tight shapes
      const duration = Math.floor(Math.random() * 10) + 14;
      const delay = -(Math.random() * 15);

      items.push({
        id: i,
        src,
        x,
        y,
        size,
        duration,
        delay,
        rotation: Math.floor(Math.random() * 360),
        floatType: i % 4,
      });
    }

    setFruits(items);
  }, []);

  const handlePointerDown = (id: number, e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    const targetFruit = fruits.find((f) => f.id === id);
    if (!targetFruit) return;

    dragInfo.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: targetFruit.x,
      initialY: targetFruit.y,
    };

    setFruits((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isDragging: true } : f))
    );
  };

  const handlePointerMove = (id: number, e: React.PointerEvent) => {
    if (!dragInfo.current || dragInfo.current.id !== id) return;

    const dx = ((e.clientX - dragInfo.current.startX) / window.innerWidth) * 100;
    const dy = ((e.clientY - dragInfo.current.startY) / window.innerHeight) * 100;

    const newX = Math.max(0, Math.min(92, dragInfo.current.initialX + dx));
    const newY = Math.max(0, Math.min(92, dragInfo.current.initialY + dy));

    setFruits((prev) =>
      prev.map((f) => (f.id === id ? { ...f, x: newX, y: newY } : f))
    );
  };

  const handlePointerUp = (id: number) => {
    if (dragInfo.current?.id === id) {
      dragInfo.current = null;
    }
    setFruits((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isDragging: false } : f))
    );
  };

  return (
    <div className="floating-container">
      {fruits.map((fruit) => (
        <div
          key={fruit.id}
          className={`floating-fruit ${fruit.isDragging ? "is-dragging" : `float-anim-${fruit.floatType}`}`}
          style={{
            left: `${fruit.x}%`,
            top: `${fruit.y}%`,
            width: `calc(${fruit.size}px * var(--fruit-size-multiplier, 1))`,
            height: `calc(${fruit.size}px * var(--fruit-size-multiplier, 1))`,
            animationDuration: `${fruit.duration}s`,
            animationDelay: `${fruit.delay}s`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fruit.src}
            alt="fruit"
            className="fruit-img"
            draggable={false}
            onPointerDown={(e) => handlePointerDown(fruit.id, e)}
            onPointerMove={(e) => handlePointerMove(fruit.id, e)}
            onPointerUp={() => handlePointerUp(fruit.id)}
            onPointerCancel={() => handlePointerUp(fruit.id)}
          />
        </div>
      ))}
    </div>
  );
}
