import { useState, useEffect, useCallback, useRef } from 'react'
import { CONFIG } from '../utils/cinematicConfig'

export default function useCinematicEngine(initialLoading = false) {
  const [phase, setPhase] = useState('inside')
  const [showCinematic, setShowCinematic] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(initialLoading)
  const hasTransitioned = useRef(false)

  // Keep it static without the phase sequence
  useEffect(() => {
    if (!loadingComplete) return
    setPhase('inside')
  }, [loadingComplete])

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
