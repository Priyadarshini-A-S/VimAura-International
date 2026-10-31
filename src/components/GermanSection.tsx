import { useRef } from 'react'
import LanguageProgram, { type Level } from './LanguageProgram'
import BrandenburgGate from './illustrations/BrandenburgGate'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import './GermanSection.css'

const LEVELS: Level[] = [
  { code: 'A1', title: 'Build your foundation', text: 'Learn essential vocabulary, basic grammar, and everyday expressions.' },
  { code: 'A2', title: 'Develop your confidence', text: 'Improve conversational ability and handle common real-life situations.' },
  { code: 'B1', title: 'Communicate independently', text: 'Develop greater fluency and express yourself across familiar everyday topics.' },
  { code: 'B2', title: 'Speak with fluency', text: 'Discuss a wide range of topics with ease and understand more complex texts.' },
  { code: 'C1', title: 'Master the language', text: 'Express yourself flexibly and precisely in social, academic and professional settings.' },
]

const CREDENTIALS = [
  'German B1 certified',
  '400+ students mentored / currently mentoring',
  'Training for A1, A2 and B1 levels',
  'Over 90% student success rate',
]

const STATS = [
  { value: 400, suffix: '+', label: 'Students mentored' },
  { value: 90, suffix: '%+', label: 'Student success rate' },
  { text: 'A1 – C1', label: 'Learning levels' },
]

function Trainer() {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Stats count with scroll (and count back down when scrolling up).
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach(el => {
          const end = Number(el.dataset.count)
          const obj = { v: 0 }
          gsap.to(obj, {
            v: end,
            ease: 'none',
            onUpdate: () => (el.textContent = String(Math.round(obj.v))),
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 55%', scrub: 0.6 },
          })
          el.textContent = '0' // ScrollTrigger brings it to the right value on refresh
        })
        gsap.fromTo(
          '.de-badge__ring',
          { rotation: -90 },
          { rotation: 90, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    },
    { scope: root },
  )

  return (
    <div className="de-trainer container" ref={root}>
      <div className="de-trainer__profile">
        <p className="eyebrow" data-reveal>
          Your trainer
        </p>
        <h3 className="de-trainer__name" data-reveal>
          Mr. Sivakumar S
        </h3>
        <ul className="de-trainer__creds">
          {CREDENTIALS.map((c, i) => (
            <li key={c} data-reveal style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
              {c}
            </li>
          ))}
        </ul>
        <div className="de-badge" aria-hidden="true">
          <svg viewBox="0 0 120 120" className="de-badge__ring">
            <defs>
              <path id="badge-circle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
            </defs>
            <text fontSize="9.5" letterSpacing="3.2" fill="currentColor" fontFamily="Manrope, sans-serif">
              <textPath href="#badge-circle">GERMAN B1 CERTIFIED · TRAINER · </textPath>
            </text>
          </svg>
          <span className="de-badge__core">B1</span>
        </div>
      </div>

      <dl className="de-stats">
        {STATS.map(s => (
          <div className="de-stat" key={s.label} data-reveal>
            <dt className="de-stat__label">{s.label}</dt>
            <dd className="de-stat__value">
              {'value' in s ? (
                <>
                  <span data-count={s.value}>{s.value}</span>
                  <span className="de-stat__suffix">{s.suffix}</span>
                </>
              ) : (
                s.text
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function GermanSection() {
  return (
    <LanguageProgram
      id="german"
      eyebrow="04 — German program"
      native="Deutsch"
      lang="de"
      language="German"
      greeting="Guten Tag"
      theme="ink"
      caption="Brandenburger Tor · Berlin"
      vocab={['Guten Tag', 'Willkommen', 'Die Sprache', 'Danke schön', 'Die Reise', 'Freundschaft', 'Zukunft', 'Auf Wiedersehen']}
      levels={LEVELS}
      art={
        <>
          <div className="lp-poster__sun" />
          <BrandenburgGate className="lp-poster__gate draw" />
          <span className="de-tricolor" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </>
      }
    >
      <Trainer />
    </LanguageProgram>
  )
}
