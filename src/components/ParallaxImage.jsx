import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxImage({ src, alt, className = '' }) {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Scale the image up slightly so we have room to pan it without showing background
  // and map the scroll progress to a vertical translation (e.g. -15% to 15%)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <div 
      ref={ref} 
      className={`parallax-image-container ${className}`} 
      style={{ overflow: 'hidden', width: '100%', height: '100%', position: 'relative' }}
    >
      <motion.img 
        src={src} 
        alt={alt}
        style={{
          y,
          scale: 1.15,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          willChange: 'transform'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
    </div>
  )
}
