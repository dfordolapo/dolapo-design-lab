import { useRef } from 'react'
import useParticleSystem from '../hooks/useParticleSystem'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  useParticleSystem(canvasRef)

  return <canvas ref={canvasRef} id="particle-canvas"></canvas>
}
