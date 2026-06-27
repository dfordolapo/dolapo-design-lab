import useSoundEffects from '../hooks/useSoundEffects'

export default function TopBar({ onBack, title = "DOLAPO'S DESIGN LAB", rightElement }) {
  const { playHover, playClick } = useSoundEffects()

  return (
    <div className="top-bar">
      <button
        className="top-bar__back"
        onClick={(e) => { playClick(); onBack(e) }}
        onMouseEnter={playHover}
        aria-label="Go Back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <span className="top-bar__title">{title}</span>
      {rightElement && (
        <div className="top-bar__right">
          {rightElement}
        </div>
      )}
    </div>
  )
}
