"use client";

import { useEffect, useState } from "react";

// Only verified fruits and food items (no stars or UI buttons)
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
}

export function FloatingFruits() {
  const [fruits, setFruits] = useState<FruitItem[]>([]);

  useEffect(() => {
    // Generate 12 floating fruits with big sizes and staggered animations
    const items: FruitItem[] = [];
    const totalCount = 12;

    for (let i = 0; i < totalCount; i++) {
      const src = FRUIT_IMAGES[i % FRUIT_IMAGES.length];
      const x = Math.floor(Math.random() * 80) + 5;
      const y = Math.floor(Math.random() * 70) + 5;
      const size = Math.floor(Math.random() * 100) + 160; // 160px to 260px (a lot bigger!)
      const duration = Math.floor(Math.random() * 10) + 12; // 12s to 22s
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

  return (
    <div className="floating-container">
      {fruits.map((fruit) => (
        <div
          key={fruit.id}
          className={`floating-fruit float-anim-${fruit.floatType}`}
          style={{
            left: `${fruit.x}%`,
            top: `${fruit.y}%`,
            width: `${fruit.size}px`,
            height: `${fruit.size}px`,
            animationDuration: `${fruit.duration}s`,
            animationDelay: `${fruit.delay}s`,
            transform: `rotate(${fruit.rotation}deg)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fruit.src} alt="fruit" className="fruit-img" />
        </div>
      ))}
    </div>
  );
}
