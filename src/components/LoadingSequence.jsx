import { useState, useEffect } from 'react'
import { CONFIG, LOADING_MESSAGES } from '../utils/cinematicConfig'
import useSoundEffects from '../hooks/useSoundEffects'
import useTheme from '../hooks/useTheme'

export default function LoadingSequence({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [hidden, setHidden] = useState(false)
  const { playPowerOn } = useSoundEffects()
  const { theme } = useTheme()

  useEffect(() => {
    const interval = CONFIG.loadingDuration / LOADING_MESSAGES.length
    const msgTimer = setInterval(() => {
      setMessageIndex(prev => Math.min(prev + 1, LOADING_MESSAGES.length - 1))
    }, interval)

    const hideTimer = setTimeout(() => {
      setHidden(true)
      playPowerOn()
      setTimeout(onComplete, 1200)
    }, CONFIG.loadingDuration)

    return () => {
      clearInterval(msgTimer)
      clearTimeout(hideTimer)
    }
  }, [onComplete, playPowerOn])

  return (
    <div className={`loading-sequence${hidden ? ' hidden' : ''}`}>
      <div className="loading-logo">
        <img src={theme === 'light' ? "/assets/logo-light.webp" : "/assets/logo-dark.webp"} alt="Dolapo's Design Lab" className="loading-logo-img" />
      </div>
      <div className="loading-bar">
        <div className="loading-bar__fill"></div>
      </div>
      <div className="loading-status" id="loading-status">
        {LOADING_MESSAGES[messageIndex]}
      </div>
    </div>
  )
}
