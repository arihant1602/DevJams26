"use client";

import { useEffect, useState } from "react";

const FRUIT_IMAGES = [
  "/Images/Apple.png",
  "/Images/Beer.png",
  "/Images/Bread.png",
  "/Images/Carrot.png",
  "/Images/Coffee.png",
  "/Images/Donut.png",
  "/Images/Mushroom.png",
  "/Images/Omelette.png",
  "/Images/Orange_Fruit.png",
  "/Images/Watermelon.png",
  "/Images/Star_Green.png",
  "/Images/Star_Orange.png",
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
    const items: FruitItem[] = FRUIT_IMAGES.map((src, i) => {
      // Spread fruits across the screen canvas
      const x = Math.floor(Math.random() * 80) + 10;
      const y = Math.floor(Math.random() * 75) + 5;
      const size = Math.floor(Math.random() * 60) + 75; // 75px to 135px
      const duration = Math.floor(Math.random() * 10) + 10; // 10s to 20s
      const delay = -(Math.random() * 15); // Staggered immediate start

      return {
        id: i,
        src,
        x,
        y,
        size,
        duration,
        delay,
        rotation: Math.floor(Math.random() * 360),
        floatType: i % 4,
      };
    });
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
