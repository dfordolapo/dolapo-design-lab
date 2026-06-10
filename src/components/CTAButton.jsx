export default function CTAButton({ onClick }) {
  return (
    <div className="cta-container" id="cta-container">
      <button className="cta-button" id="enter-lab-btn" type="button" aria-label="Enter Dolapo's Design Lab" onClick={onClick}>
        <div className="cta-button__glow"></div>
        <span className="cta-button__text">Enter The Lab</span>
        <span className="cta-button__arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </button>
    </div>
  )
}
