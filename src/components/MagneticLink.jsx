import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticLink({ children, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // 30% pull strength
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Only enable if pointer is fine
  const isMagnetic = typeof window !== 'undefined'
    && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!isMagnetic) {
    return <div className={className} style={{ display: 'inline-block' }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      style={{
        x: smoothX,
        y: smoothY,
        display: 'inline-block'
      }}
    >
      {children}
    </motion.div>
  );
}
