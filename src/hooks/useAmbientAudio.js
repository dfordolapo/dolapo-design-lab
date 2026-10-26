import { useRef, useCallback } from 'react'

export default function useAmbientAudio() {
  const audioCtxRef = useRef(null)
  const nodesRef = useRef({})
  const isPlayingRef = useRef(false)

  const createAmbientSound = useCallback(() => {
    const audioCtx = audioCtxRef.current
    const nodes = nodesRef.current

    nodes.masterGain = audioCtx.createGain()
    nodes.masterGain.gain.value = 0
    nodes.masterGain.connect(audioCtx.destination)

    nodes.drone = audioCtx.createOscillator()
    nodes.drone.type = 'sine'
    nodes.drone.frequency.value = 55
    nodes.droneGain = audioCtx.createGain()
    nodes.droneGain.gain.value = 0.08
    nodes.drone.connect(nodes.droneGain)
    nodes.droneGain.connect(nodes.masterGain)
    nodes.drone.start()

    nodes.shimmer = audioCtx.createOscillator()
    nodes.shimmer.type = 'sine'
    nodes.shimmer.frequency.value = 220
    nodes.shimmerGain = audioCtx.createGain()
    nodes.shimmerGain.gain.value = 0.02

    nodes.lfo = audioCtx.createOscillator()
    nodes.lfo.frequency.value = 0.3
    nodes.lfoGain = audioCtx.createGain()
    nodes.lfoGain.gain.value = 0.015
    nodes.lfo.connect(nodes.lfoGain)
    nodes.lfoGain.connect(nodes.shimmerGain.gain)
    nodes.lfo.start()

    nodes.shimmer.connect(nodes.shimmerGain)
    nodes.shimmerGain.connect(nodes.masterGain)
    nodes.shimmer.start()

    nodes.pad = audioCtx.createOscillator()
    nodes.pad.type = 'triangle'
    nodes.pad.frequency.value = 330
    nodes.padGain = audioCtx.createGain()
    nodes.padGain.gain.value = 0.01
    nodes.pad.connect(nodes.padGain)
    nodes.padGain.connect(nodes.masterGain)
    nodes.pad.start()
  }, [])

  const toggleAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      createAmbientSound()
    }

    const audioCtx = audioCtxRef.current
    const masterGain = nodesRef.current.masterGain
    if (!masterGain) return

    if (isPlayingRef.current) {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime)
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1)
      isPlayingRef.current = false
    } else {
      if (audioCtx.state === 'suspended') audioCtx.resume()
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime)
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime)
      masterGain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 2)
      isPlayingRef.current = true
    }

    return isPlayingRef.current
  }, [createAmbientSound])

  return { toggleAudio }
}
