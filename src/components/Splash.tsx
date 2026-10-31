import { useEffect, useState } from 'react'
import Logo from './Logo'
import './Splash.css'

/** How long the opening logo moment holds the screen before the site appears. */
export const SPLASH_MS = 5200

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The first thing a visitor sees: the logo fades in, the globe turns slowly and the
 * paper plane glides into place, then the site opens. Tap to skip.
 */
export default function Splash() {
  const reduced = reducedMotion()
  const [stage, setStage] = useState<'in' | 'play' | 'out' | 'done'>('in')
  const total = reduced ? 1400 : SPLASH_MS

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const t1 = setTimeout(() => setStage('play'), reduced ? 0 : 450)
    const t2 = setTimeout(() => setStage('out'), total - 700)
    const t3 = setTimeout(() => setStage('done'), total + 500)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [reduced, total])

  useEffect(() => {
    if (stage === 'out' || stage === 'done') document.documentElement.style.overflow = ''
  }, [stage])

  if (stage === 'done') return null
  return (
    <div className={`splash splash--${stage}`} aria-hidden="true" onClick={() => setStage('out')}>
      <div className="splash__inner">
        <Logo size="splash" on={stage !== 'in'} />
        <p className="splash__motto">Language is your passport to the world.</p>
      </div>
    </div>
  )
}
