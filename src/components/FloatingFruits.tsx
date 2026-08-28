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

interface FruitState {
  id: number;
  src: string;
  left: number;
  top: number;
  baseSize: number;
  animType: number;
  duration: number;
  delay: number;
  dragX: number;
  dragY: number;
  isDragging: boolean;
}

export function FloatingFruits() {
  const [fruits, setFruits] = useState<FruitState[]>([]);
  const activeDrag = useRef<{
    id: number;
    startX: number;
    startY: number;
    initialDragX: number;
    initialDragY: number;
  } | null>(null);

  useEffect(() => {
    const initialItems: FruitState[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const src = FRUIT_IMAGES[i % FRUIT_IMAGES.length];
      const left = Math.floor(Math.random() * 70) + 10;
      const top = Math.floor(Math.random() * 65) + 10;
      const baseSize = Math.floor(Math.random() * 50) + 140;
      const duration = Math.floor(Math.random() * 8) + 14;
      const delay = -(Math.random() * 12);

      initialItems.push({
        id: i,
        src,
        left,
        top,
        baseSize,
        animType: i % 4,
        duration,
        delay,
        dragX: 0,
        dragY: 0,
        isDragging: false,
      });
    }

    setFruits(initialItems);
  }, []);

  const handlePointerDown = (id: number, e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    const fruit = fruits.find((f) => f.id === id);
    if (!fruit) return;

    activeDrag.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialDragX: fruit.dragX,
      initialDragY: fruit.dragY,
    };

    setFruits((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isDragging: true } : f))
    );
  };

  const handlePointerMove = (id: number, e: React.PointerEvent<HTMLImageElement>) => {
    if (!activeDrag.current || activeDrag.current.id !== id) return;

    const dx = e.clientX - activeDrag.current.startX;
    const dy = e.clientY - activeDrag.current.startY;

    const nextX = activeDrag.current.initialDragX + dx;
    const nextY = activeDrag.current.initialDragY + dy;

    setFruits((prev) =>
      prev.map((f) => (f.id === id ? { ...f, dragX: nextX, dragY: nextY } : f))
    );
  };

  const handlePointerUp = (id: number, e: React.PointerEvent<HTMLImageElement>) => {
    if (activeDrag.current?.id === id) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Fallback if pointer release fails
      }
      activeDrag.current = null;
    }
    setFruits((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isDragging: false } : f))
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
              transform: fruit.dragX || fruit.dragY ? `translate3d(${fruit.dragX}px, ${fruit.dragY}px, 0)` : undefined,
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
              onPointerUp={(e) => handlePointerUp(fruit.id, e)}
              onPointerCancel={(e) => handlePointerUp(fruit.id, e)}
            />
          </div>
        );
      })}
    </div>
  );
}
