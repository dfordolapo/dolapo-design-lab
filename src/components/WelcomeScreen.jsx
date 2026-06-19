import { useEffect, useState } from 'react'

export default function WelcomeScreen({ onComplete }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10)
    const hide = setTimeout(() => setVisible(false), 500)
    const done = setTimeout(onComplete, 800)
    return () => { clearTimeout(show); clearTimeout(hide); clearTimeout(done) }
  }, [onComplete])

  return (
    <div className={`welcome-screen${visible ? ' welcome-screen--visible' : ''}`}>
      <div className="welcome-screen__content">
        <h1 className="welcome-screen__title">WELCOME</h1>
      </div>
    </div>
  )
}
