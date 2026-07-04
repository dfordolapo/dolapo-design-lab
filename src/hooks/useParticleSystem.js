import { useEffect, useRef } from 'react'
import { CONFIG } from '../utils/cinematicConfig'

export default function useParticleSystem(canvasRef) {
  const animFrameRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let active = true

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchstart', handleTouchMove)

    const particles = []
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.5 ? 270 : 300,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      })
    }
    particlesRef.current = particles

    function animate() {
      if (!active) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        // Calculate distance to mouse
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Repulsive force
        const maxDistance = 150
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          p.x -= (dx / distance) * force * 3
          p.y -= (dy / distance) * force * 3
        }

        p.x += p.speedX
        p.y += p.speedY
        p.pulse += p.pulseSpeed

        // Soft wrapping with boundary margin so they don't pop abruptly
        if (p.x < -50) p.x = canvas.width + 50
        if (p.x > canvas.width + 50) p.x = -50
        if (p.y < -50) p.y = canvas.height + 50
        if (p.y > canvas.height + 50) p.y = -50

        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse))

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 75%, ${currentOpacity})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 75%, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 85%, ${currentOpacity * 1.5})`
        ctx.fill()
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      active = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
    }
  }, [canvasRef])
}
