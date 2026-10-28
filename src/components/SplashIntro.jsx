import { useState, useEffect } from 'react'
import useTheme from '../hooks/useTheme'

export default function SplashIntro({ onComplete }) {
  const { theme } = useTheme()
  const logoSrc = theme === 'light' ? "/assets/logo-light.webp" : "/assets/logo-dark.webp"
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isGlitching, setIsGlitching] = useState(true)

  useEffect(() => {
    // Stop glitching after 1.5 seconds so it resolves to a clean logo
    const glitchTimer = setTimeout(() => {
      setIsGlitching(false)
    }, 1500)

    // Hold the clean logo until 2.5 seconds, then fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2500)

    // Complete the sequence after fade out
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3200)

    return () => {
      clearTimeout(glitchTimer)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className={`splash-intro ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="glitch-wrapper">
        <div className="glitch-logo" data-text="Dolapo">
          <img src={logoSrc} alt="Dolapo's Design Lab" className="glitch-img base" decoding="async" />
          {isGlitching && (
            <>
              <img src={logoSrc} alt="Dolapo's Design Lab" className="glitch-img red-channel" decoding="async" />
              <img src={logoSrc} alt="Dolapo's Design Lab" className="glitch-img cyan-channel" decoding="async" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
