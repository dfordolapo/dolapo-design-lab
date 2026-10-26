import { useState } from 'react'

export default function AudioToggle({ onToggle }) {
  const [playing, setPlaying] = useState(false)

  function handleClick() {
    const isPlaying = onToggle()
    setPlaying(isPlaying)
  }

  return (
    <button className={`audio-toggle${playing ? ' playing' : ''}`} id="audio-toggle" aria-label="Toggle ambient audio" onClick={handleClick}>
      <div className="audio-toggle__bars">
        <div className="audio-toggle__bar" style={{ height: 4 }}></div>
        <div className="audio-toggle__bar" style={{ height: 8 }}></div>
        <div className="audio-toggle__bar" style={{ height: 12 }}></div>
        <div className="audio-toggle__bar" style={{ height: 6 }}></div>
      </div>
      <span className="audio-toggle__text">Ambient</span>
    </button>
  )
}
