const ICONS = [
  {
    path: (
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </>
    ),
  },
  {
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <rect x="7" y="7" width="10" height="10" rx="1" ry="1"></rect>
        <line x1="3" y1="12" x2="7" y2="12"></line>
        <line x1="17" y1="12" x2="21" y2="12"></line>
        <line x1="12" y1="3" x2="12" y2="7"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </>
    ),
  },
  {
    path: (
      <>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
        <path d="M12 12v9"></path>
        <path d="M8 17l4 4 4-4"></path>
      </>
    ),
  },
  {
    path: (
      <>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </>
    ),
  },
  {
    path: (
      <>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </>
    ),
  },
]

export default function HolographicElements() {
  return (
    <>
      {ICONS.map((icon, i) => (
        <div key={i} className={`holo-element holo-element--${i + 1}`}>
          <div className="holo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {icon.path}
            </svg>
          </div>
        </div>
      ))}
    </>
  )
}
