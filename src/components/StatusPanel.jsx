export default function StatusPanel() {
  return (
    <div className="status-panel" id="status-panel">
      <div className="status-panel__grid">
        <div className="status-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--green-status)' }} className="status-item__icon">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <div className="status-item__content">
            <span className="status-item__label">Lab Status</span>
            <span className="status-item__value status-item__value--online">ONLINE</span>
          </div>
        </div>

        <div className="status-separator"></div>

        <div className="status-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--blue-ambient)' }} className="status-item__icon">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <div className="status-item__content">
            <span className="status-item__label">Active Projects</span>
            <span className="status-item__value status-item__value--accent">04</span>
          </div>
        </div>

        <div className="status-separator"></div>

        <div className="status-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--pink-soft)' }} className="status-item__icon">
            <path d="M9 3h6v11l-3 3-3-3V3z"></path>
            <path d="M6 21h12"></path>
            <path d="M6 21l3-6"></path>
            <path d="M18 21l-3-6"></path>
          </svg>
          <div className="status-item__content">
            <span className="status-item__label">Prototypes Testing</span>
            <span className="status-item__value status-item__value--pink">07</span>
          </div>
        </div>

        <div className="status-separator"></div>

        <div className="status-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--cyan-glow)' }} className="status-item__icon">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
          </svg>
          <div className="status-item__content">
            <span className="status-item__label">Last Deployment</span>
            <span className="status-item__value status-item__value--cyan">TODAY</span>
          </div>
        </div>
      </div>
    </div>
  )
}
