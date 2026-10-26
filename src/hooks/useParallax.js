import { useEffect, useRef } from 'react'

export default function useParallax(phase) {
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handleMouse(e) {
      targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    document.addEventListener('mousemove', handleMouse)
    return () => document.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    const entrance = document.getElementById('scene-entrance')
    const holos = document.querySelectorAll('.holo-element')
    let animFrame

    function update() {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05

      if (entrance) {
        const moveX = mouseRef.current.x * -5
        const moveY = mouseRef.current.y * -3
        const scale = phase === 'walking' ? 1.08 : phase === 'entering' ? 1.15 : 1
        entrance.style.transform = `scale(${scale}) translate(${moveX}px, ${moveY}px)`
      }

      holos.forEach((holo, i) => {
        const depth = (i + 1) * 3
        holo.style.transform = `translate(${mouseRef.current.x * depth}px, ${mouseRef.current.y * depth}px)`
      })

      animFrame = requestAnimationFrame(update)
    }

    update()
    return () => cancelAnimationFrame(animFrame)
  }, [phase])
}
