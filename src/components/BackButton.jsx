import React from 'react'

export default function BackButton({ onClick, style }) {
  return (
    <button className="nav-back-button nav-back-button--icon-only" onClick={onClick} style={style} aria-label="Go Back">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  )
}
