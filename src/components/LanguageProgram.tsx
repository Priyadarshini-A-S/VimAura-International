import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, MOTION_OK, DESKTOP } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import { WHATSAPP_URL } from '../lib/contact'
import './LanguageProgram.css'

export type Level = { code: string; title: string; text: string }

type Props = {
  id: string
  eyebrow: string
  native: string
  lang: string
  language: string
  greeting: string
  theme: 'ink' | 'burgundy' | 'paper'
  art: ReactNode
  caption: string
  vocab: string[]
  levels: Level[]
  /** Optional block between the poster and the formats (e.g. the trainer profile). */
  children?: ReactNode
}

const FORMATS = [
  {
    name: 'Online',
    text: 'Learn from anywhere through online classes.',
    icon: (
      <>
        <rect x="8" y="12" width="48" height="32" rx="2" />
        <path d="M2 50 H62" />
        <circle cx="32" cy="28" r="9" />
        <path d="M23 28 H41 M32 19 Q27 28 32 37 Q37 28 32 19" />
      </>
    ),
  },
  {
    name: 'Offline',
    text: 'Experience guided, in-person learning.',
    icon: (
      <>
        <path d="M6 24 L32 8 L58 24 Z" />
        <path d="M10 24 V52 M54 24 V52 M4 56 H60" />
        <path d="M20 30 V50 M32 30 V50 M44 30 V50" />
      </>
    ),
  },
  {
    name: 'Hybrid',
    text: 'Enjoy the flexibility of combining both formats.',
    icon: (
      <>
        <circle cx="24" cy="32" r="16" />
        <circle cx="40" cy="32" r="16" />
        <path d="M32 18 V46" strokeDasharray="2 3" />
      </>
    ),
  },
]

/** A full language program: travel-poster opener, vocabulary band, formats and a level "rail line". */
export default function LanguageProgram(p: Props) {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  useGSAP(
    () => {
      const el = root.current!
      const q = (s: string) => el.querySelector(s)
      const mm = gsap.matchMedia()
      mm.add({ motion: MOTION_OK, desktop: DESKTOP }, ctx => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return

        const poster = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('.lp-poster'), start: 'top 75%', end: 'center 40%', scrub: 1 },
        })
        poster
          .fromTo('.lp-poster__line > span', { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 0.4 }, 0.1)
        if (q('.lp-poster__frame')) poster.fromTo('.lp-poster__frame', { y: 80, rotation: 3 }, { y: 0, rotation: 0, duration: 1 }, 0)
        if (q('.draw path')) {
          poster
            .fromTo('.draw path', { strokeDashoffset: 1, strokeDasharray: 1 }, { strokeDashoffset: 0, stagger: 0.04, duration: 0.6 }, 0)
            .fromTo('.lp-poster__sun', { y: 120, scale: 0.8 }, { y: 0, scale: 1, duration: 1 }, 0)
        }

        gsap.fromTo(
          '.lp-vocab__track',
          { xPercent: 0 },
          { xPercent: -50, ease: 'none', scrollTrigger: { trigger: q('.lp-vocab'), start: 'top bottom', end: 'bottom top', scrub: true } },
        )

        // A rail line drawn station by station, with a little train riding along. Scrubbed, so it reverses.
        const rail = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('.lp-levels'), start: 'top 70%', end: 'bottom 60%', scrub: 1 },
        })
        const step = 1 / p.levels.length
        rail
          .fromTo('.lp-rail__fill', desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 }, { scaleX: 1, scaleY: 1, duration: 1 }, 0)
          .fromTo('.lp-rail__train', desktop ? { left: '0%' } : { top: '0%' }, desktop ? { left: '100%', duration: 1 } : { top: '100%', duration: 1 }, 0)
          .fromTo('.lp-level', { autoAlpha: 0.25, y: 20 }, { autoAlpha: 1, y: 0, stagger: step, duration: 0.15 }, 0)
          .fromTo('.lp-level__dot', { scale: 0.4, backgroundColor: '#e8ddc9' }, { scale: 1, backgroundColor: '#701b2b', stagger: step, duration: 0.15 }, 0)
      })
    },
    { scope: root },
  )

  const codes = p.levels.map(l => l.code)

  return (
    <section id={p.id} ref={root} className={`lp lp--${p.theme}`} aria-labelledby={`${p.id}-title`}>
      <div className="lp-poster">
        <div className="container lp-poster__inner">
          <div className="lp-poster__copy">
            <p className="eyebrow lp-poster__eyebrow">
              {p.eyebrow} · <span lang={p.lang}>{p.native}</span>
            </p>
            <h2 id={`${p.id}-title`} className="display lp-poster__title">
              <span className="line-mask lp-poster__line">
                <span>Your {p.language}</span>
              </span>
              <span className="line-mask lp-poster__line">
                <span>journey</span>
              </span>
              <span className="line-mask lp-poster__line">
                <span>
                  <em>starts here.</em>
                </span>
              </span>
            </h2>
            <p className="lp-poster__sub" data-reveal>
              From your first <i lang={p.lang}>{p.greeting}</i> to confident communication — build your {p.language} language
              skills with structured guidance{p.id === 'german' ? ' and experienced mentorship' : ''}.
            </p>
            <a className="btn lp-poster__btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-reveal>
              Start your {p.language} journey <span className="arrow">→</span>
            </a>
          </div>
          <div className="lp-poster__art">
            {p.art}
            <span className="lp-poster__caption">{p.caption}</span>
          </div>
        </div>
        <div className="lp-vocab" aria-hidden="true">
          <div className="lp-vocab__track">
            {[...p.vocab, ...p.vocab].map((w, i) => (
              <span key={i} lang={p.lang}>
                {w}
                <b>·</b>
              </span>
            ))}
          </div>
        </div>
      </div>

      {p.children}

      <div className="lp-formats container">
        <header className="lp-sub-head">
          <p className="eyebrow" data-reveal>
            Available learning formats
          </p>
          <h3 className="lp-sub-title" data-reveal>
            Learn {p.language} <em>your way.</em>
          </h3>
        </header>
        <ul className="lp-formats__list">
          {FORMATS.map((f, i) => (
            <li key={f.name} className="lp-format" data-reveal style={{ '--d': `${i * 0.1}s` } as React.CSSProperties}>
              <svg viewBox="0 0 64 64" className="lp-format__icon" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                {f.icon}
              </svg>
              <h4 className="lp-format__name">{f.name}</h4>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="lp-levels container" style={{ '--n': p.levels.length } as React.CSSProperties}>
        <header className="lp-sub-head">
          <p className="eyebrow" data-reveal>
            {p.language} levels
          </p>
          <h3 className="lp-sub-title lp-sub-title--codes" data-reveal>
            {codes.map((c, i) => (
              <span key={c}>
                {i > 0 && <span className="lp-arrow"> → </span>}
                {c}
              </span>
            ))}
          </h3>
        </header>
        <div className="lp-rail-wrap">
          <div className="lp-rail" aria-hidden="true">
            <span className="lp-rail__fill" />
            <svg className="lp-rail__train" viewBox="0 0 40 22">
              <rect x="2" y="2" width="34" height="14" rx="4" fill="#701b2b" />
              <rect x="8" y="6" width="6" height="5" fill="#f5f0e6" />
              <rect x="17" y="6" width="6" height="5" fill="#f5f0e6" />
              <rect x="26" y="6" width="6" height="5" fill="#f5f0e6" />
              <circle cx="10" cy="18" r="3" fill="#191817" />
              <circle cx="28" cy="18" r="3" fill="#191817" />
            </svg>
          </div>
          <ol className="lp-levels__list">
            {p.levels.map(l => (
              <li key={l.code} className="lp-level">
                <span className="lp-level__dot" aria-hidden="true" />
                <span className="lp-level__code">{l.code}</span>
                <h4 className="lp-level__title">{l.title}</h4>
                <p>{l.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="lp-cta" data-reveal>
          <p className="lede">Your first {p.language} lesson is one conversation away.</p>
          <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Start your {p.language} journey <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
