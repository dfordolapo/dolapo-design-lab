import React, { useRef, useEffect, useState } from 'react'
import '../styles/dot-portrait.css'

/**
 * DotPortrait component:
 * - Reveals from top to bottom like an artist penciling in tiny tiny stipple dots.
 * - Scanline moves smoothly down from top to bottom over ~2 seconds.
 * - Above the scanline, all tiny dots are penciled into place.
 * - At the scanline, an active pencil/stipple stylus tip taps across the row.
 * - Below the scanline, untouched black background.
 * - Sits directly on pure #000000 with zero frame or container borders.
 */
export default function DotPortrait({
  src = '/assets/dolapo-dot-portrait.webp',
  fallbackSrc = '/assets/dolapo-dot-portrait.jpg',
  alt = 'Dolapo dot-art portrait',
  duration = 2000,
  skipAnimation = false,
  onAssembled
}) {
  const canvasRef = useRef(null)
  const [isAssembled, setIsAssembled] = useState(skipAnimation)
  const animFrameRef = useRef(null)

  useEffect(() => {
    if (skipAnimation) {
      setIsAssembled(true)
      onAssembled?.()
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setIsAssembled(true)
      onAssembled?.()
      return
    }

    let isCancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    img.onerror = () => {
      if (img.src !== fallbackSrc) {
        img.src = fallbackSrc
      } else {
        setIsAssembled(true)
        onAssembled?.()
      }
    }

    const handleImageReady = () => {
      if (isCancelled) return

      // Use native sharp aspect ratio (682 x 1024)
      const W = 682
      const H = 1024
      canvas.width = W
      canvas.height = H

      // Offscreen canvas holding the complete portrait
      const offscreen = document.createElement('canvas')
      offscreen.width = W
      offscreen.height = H
      const offCtx = offscreen.getContext('2d')
      offCtx.drawImage(img, 0, 0, W, H)

      const startTime = performance.now()

      const render = (now) => {
        if (isCancelled) return

        const elapsed = now - startTime
        const progress = Math.min(1, elapsed / duration)

        // Clear canvas to pure black
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, W, H)

        if (progress > 0) {
          // Current pencil scanline height from top to bottom
          const currentY = Math.floor(progress * H)

          // 1. Draw already penciled-in portion from top (0) down to currentY
          ctx.drawImage(
            offscreen,
            0, 0, W, currentY, // source rectangle
            0, 0, W, currentY  // destination rectangle
          )

          // 2. Active Penciling Effect at the leading edge
          if (progress < 1 && currentY > 0) {
            // Pencil tip horizontal position oscillates across the active row
            const oscSpeed = elapsed * 0.018
            const pencilX = W * (0.5 + 0.42 * Math.sin(oscSpeed))
            const pencilY = currentY

            // Draw a subtle soft pencil lead tip & stipple glow at current drawing position
            ctx.save()

            // Soft stipple tap glow
            const tapGlow = ctx.createRadialGradient(pencilX, pencilY, 0.5, pencilX, pencilY, 8)
            tapGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
            tapGlow.addColorStop(0.3, 'rgba(255, 180, 100, 0.65)')
            tapGlow.addColorStop(1, 'rgba(255, 90, 54, 0)')

            ctx.fillStyle = tapGlow
            ctx.beginPath()
            ctx.arc(pencilX, pencilY, 8, 0, Math.PI * 2)
            ctx.fill()

            // Micro pencil tip point (tiny stipple stylus)
            ctx.fillStyle = '#FFFFFF'
            ctx.beginPath()
            ctx.arc(pencilX, pencilY, 1.2, 0, Math.PI * 2)
            ctx.fill()

            // Micro stipple ink taps around the pencil tip
            for (let i = 0; i < 4; i++) {
              const offsetX = (Math.sin(oscSpeed * 3 + i) * 16)
              const offsetY = (Math.cos(oscSpeed * 2 + i) * 2)
              ctx.fillStyle = 'rgba(255, 230, 200, 0.8)'
              ctx.beginPath()
              ctx.arc(pencilX + offsetX, pencilY + offsetY, 0.9, 0, Math.PI * 2)
              ctx.fill()
            }

            ctx.restore()
          }
        }

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(render)
        } else {
          // Fully penciled in! Draw full image crisply and notify
          ctx.drawImage(offscreen, 0, 0, W, H)
          setIsAssembled(true)
          onAssembled?.()
        }
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    if (img.complete && img.naturalWidth > 0) {
      handleImageReady()
    } else {
      img.onload = handleImageReady
    }

    return () => {
      isCancelled = true
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [src, fallbackSrc, duration, skipAnimation, onAssembled])

  return (
    <div
      className={`dot-portrait-standalone-wrapper ${isAssembled ? 'is-assembled' : ''}`}
      role="img"
      aria-label={alt}
    >
      {/* Canvas displaying the top-to-bottom penciling reveal */}
      <canvas
        ref={canvasRef}
        className="dot-portrait-canvas"
        aria-hidden="true"
      />

      {/* Semantic image for SEO, accessibility, and screen readers */}
      <img
        src={fallbackSrc}
        alt={alt}
        className="sr-only"
        loading="eager"
      />
    </div>
  )
}
