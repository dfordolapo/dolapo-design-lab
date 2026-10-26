export default function TransitionOverlay({ active }) {
  return <div className={`transition-overlay${active ? ' active' : ''}`} id="transition-overlay"></div>
}
