import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }) {
  // lenis options for a buttery, heavy feel
  const options = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  }

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}
