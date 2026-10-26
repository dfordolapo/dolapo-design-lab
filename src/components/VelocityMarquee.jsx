import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'

export default function VelocityMarquee({ children, baseVelocity = 2, className = '' }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })
  
  // skew the text based on scroll velocity
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [15, -15])

  const x = useTransform(baseX, (v) => `${(v % 50) - 50}%`)

  const directionFactor = useRef(1)

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    
    // Add scroll velocity to base movement
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }
    
    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get())
    
    baseX.set(baseX.get() + moveBy * 10)
  })

  return (
    <div className={`velocity-marquee-container ${className}`} style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex' }}>
      <motion.div 
        className="velocity-marquee-track" 
        style={{ x, skewX, display: 'flex', gap: '2rem' }}
      >
        <div style={{ display: 'flex', gap: '2rem' }}>
          {children} {children} {children} {children}
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {children} {children} {children} {children}
        </div>
      </motion.div>
    </div>
  )
}
