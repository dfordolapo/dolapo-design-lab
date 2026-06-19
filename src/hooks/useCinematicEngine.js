import { useState, useEffect, useCallback, useRef } from 'react'
import { CONFIG } from '../utils/cinematicConfig'

export default function useCinematicEngine(initialLoading = false) {
  const [phase, setPhase] = useState('idle')
  const [showCinematic, setShowCinematic] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(initialLoading)
  const hasTransitioned = useRef(false)

  useEffect(() => {
    if (!loadingComplete) return

    const t1 = setTimeout(() => setPhase('walking'), CONFIG.walkingDelay)
    const t2 = setTimeout(() => setPhase('entering'), CONFIG.walkingDelay + CONFIG.walkingDuration)
    const t3 = setTimeout(() => {
      setPhase('inside')
      startSceneLoop()
    }, CONFIG.walkingDelay + CONFIG.walkingDuration + CONFIG.doorOpenDuration)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
    }
  }, [loadingComplete])

  const sceneLoopRef = useRef(null)

  function startSceneLoop() {
    let showInterior = true
    sceneLoopRef.current = setInterval(() => {
      showInterior = !showInterior
      setPhase(showInterior ? 'inside' : 'idle')
    }, 7000)
  }

  useEffect(() => {
    return () => {
      if (sceneLoopRef.current) clearInterval(sceneLoopRef.current)
    }
  }, [])

  const triggerTransition = useCallback(() => {
    if (hasTransitioned.current) return
    hasTransitioned.current = true
    return true
  }, [])

  const resetTransition = useCallback(() => {
    hasTransitioned.current = false
  }, [])

  return {
    phase,
    showCinematic,
    loadingComplete,
    setLoadingComplete,
    setShowCinematic,
    triggerTransition,
    resetTransition,
  }
}
