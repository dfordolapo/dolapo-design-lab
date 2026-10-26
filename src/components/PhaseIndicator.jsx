import { PHASE_LABELS } from '../utils/cinematicConfig'

export default function PhaseIndicator({ phase }) {
  const label = PHASE_LABELS[phase] || ''
  const color = phase === 'inside' ? 'var(--green-status)' : 'var(--text-secondary)'

  return (
    <div className="phase-indicator" id="phase-indicator">
      <div className="phase-indicator__label">Sequence</div>
      <div className="phase-indicator__value" id="phase-value" style={{ color }}>{label}</div>
    </div>
  )
}
