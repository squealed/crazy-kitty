"use client";

import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Cat } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FloatingCat() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 7, y: 5 });
  const controls = useAnimationControls();
  const catSize = 80;

  const handleClick = () => {
    // Center burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { 
        x: (position.x + catSize/2) / window.innerWidth,
        y: (position.y + catSize/2) / window.innerHeight
      },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
      startVelocity: 30,
      gravity: 0.8,
      scalar: 1.2,
      ticks: 100
    });

    // Animate cat
    controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 360, 0],
      transition: { duration: 0.7 }
    });
  };

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      setPosition((prev) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        // Bounce off edges
        if (newX <= 0 || newX >= windowWidth - catSize) {
          newVelX = -velocity.x;
          controls.start({
            rotate: [0, velocity.x > 0 ? -30 : 30, 0],
            scale: [1, 1.2, 1],
            transition: { duration: 0.3 }
          });
        }
        if (newY <= 0 || newY >= windowHeight - catSize) {
          newVelY = -velocity.y;
          controls.start({
            rotate: [0, velocity.y > 0 ? 30 : -30, 0],
            scale: [1, 1.2, 1],
            transition: { duration: 0.3 }
          });
        }

        setVelocity({ x: newVelX, y: newVelY });

        return {
          x: Math.max(0, Math.min(newX, windowWidth - catSize)),
          y: Math.max(0, Math.min(newY, windowHeight - catSize))
        };
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [velocity, controls, catSize]);

  return (
    <motion.div
      animate={controls}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 50,
        cursor: 'pointer',
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Cat 
        size={catSize} 
        className="text-white drop-shadow-lg" 
        strokeWidth={1.5}
      />
    </motion.div>
  );
}