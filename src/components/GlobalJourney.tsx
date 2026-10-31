import { useRef } from 'react'
import { MAP_H, MAP_W, WORLD_DOTS } from './illustrations/worldDots'
import { ART, STOPS, HORIZONS, PLACES } from './illustrations/landmarks'
import { gsap, useGSAP, MOTION_OK, DESKTOP } from '../lib/gsap'
import './GlobalJourney.css'

const FOLDS = 4

const pt = (id: string) => STOPS.find(l => l.id === id)!.at

// The airplane's legs between route stops
const SEGMENTS = [
  { id: 'seg-1', to: 'australia', d: `M${pt('india')} Q1520 360 ${pt('australia')}` },
  { id: 'seg-2', to: 'japan', d: `M${pt('australia')} Q1730 390 ${pt('japan')}` },
  { id: 'seg-3', to: 'germany', d: `M${pt('japan')} C1500 10 1150 0 ${pt('germany')}` },
  { id: 'seg-4', to: 'france', d: `M${pt('germany')} Q958 180 ${pt('france')}` },
  { id: 'seg-5', to: 'uk', d: `M${pt('france')} Q918 128 ${pt('uk')}` },
  { id: 'seg-6', to: 'usa', d: `M${pt('uk')} C800 30 620 50 ${pt('usa')}` },
]
const LEGS = [
  { start: 0.17, dur: 0.11 },
  { start: 0.29, dur: 0.1 },
  { start: 0.4, dur: 0.17 },
  { start: 0.58, dur: 0.05 },
  { start: 0.64, dur: 0.05 },
  { start: 0.7, dur: 0.12 },
]

function Dots() {
  return <path d={WORLD_DOTS} stroke="currentColor" strokeWidth={5.4} strokeLinecap="round" />
}

function Landmark({ l, tone }: { l: (typeof STOPS)[number]; tone: 'ink' | 'gold' }) {
  const [ax, ay] = l.art ?? l.at
  const [lx, ly] = l.label ?? [0, 30]
  const moved = !!l.art
  return (
    <g id={`lm-${l.id}`} className={`lm lm--${tone}`}>
      {moved && <path className="lm__leader" d={`M${l.at} L${ax} ${ay}`} />}
      <circle cx={l.at[0]} cy={l.at[1]} r={tone === 'ink' ? 7 : 5} className="lm__pin" />
      <g transform={`translate(${ax} ${ay}) scale(${l.scale ?? 1})`}>
        <g className="lm__art">{ART[l.key]}</g>
      </g>
      <g className="lm__label" transform={`translate(${ax + lx} ${ay + ly})`}>
        <text textAnchor="middle" className="lm__title">
          {l.name}
        </text>
        {l.sub && (
          <text textAnchor="middle" y="20" className="lm__sub">
            {l.sub}
          </text>
        )}
      </g>
    </g>
  )
}

export default function GlobalJourney() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: MOTION_OK, desktop: DESKTOP }, ctx => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return

        const viewport = root.current!.querySelector<HTMLElement>('.journey__viewport')!
        const pan = root.current!.querySelector<HTMLElement>('.journey__pan')!
        // Keep the plane in view when the map is wider than the screen (mobile).
        const panTo = (f: number) => () => {
          const vw = viewport.clientWidth
          const sw = pan.offsetWidth
          if (sw <= vw) return 0
          return gsap.utils.clamp(vw - sw, 0, vw / 2 - f * sw)
        }
        const fx = (pt: readonly number[]) => pt[0] / MAP_W

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: desktop ? '+=440%' : '+=360%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // 1. The journal map unfolds
        tl.fromTo('.journey__intro > *', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.02, duration: 0.06 }, 0)
          .fromTo('.journey__map', { scaleX: 0.3, autoAlpha: 0.4 }, { scaleX: 1, autoAlpha: 1, duration: 0.12, ease: 'power2.out' }, 0.02)
          .fromTo('.fold', { rotationY: i => (i % 2 ? -78 : 78) }, { rotationY: 0, duration: 0.12, ease: 'power2.out' }, 0.02)
          .fromTo('.fold__crease', { autoAlpha: 1 }, { autoAlpha: 0.35, duration: 0.08 }, 0.1)
          .fromTo('.journey__pan', { x: panTo(fx(pt('india'))) }, { x: panTo(fx(pt('india'))), duration: 0.01 }, 0)
          .fromTo('.journey__overlay', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, 0.12)
          .fromTo('.route--plan', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.06 }, 0.12)
          .fromTo('.journey__plane', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.15)

        // 2. The paper airplane flies each leg; routes draw behind it; landmarks rise on arrival
        tl.fromTo('#lm-india .lm__art', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.05 }, 0.13)
          .fromTo('#lm-india .lm__label', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, 0.14)
        SEGMENTS.forEach((seg, i) => {
          const { start, dur } = LEGS[i]
          tl.to(
            '.journey__plane',
            { motionPath: { path: `#${seg.id}`, align: `#${seg.id}`, alignOrigin: [0.5, 0.5], autoRotate: true }, duration: dur, ease: 'power1.inOut' },
            start,
          )
            .fromTo(`#${seg.id}-draw`, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' }, start)
            .to('.journey__pan', { x: panTo(fx(pt(seg.to))), duration: dur, ease: 'power1.inOut' }, start)
            .fromTo(
              `#lm-${seg.to} .lm__art`,
              { autoAlpha: 0, y: 40, scale: 0.6, transformOrigin: '50% 100%' },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.05, ease: 'back.out(1.6)' },
              start + dur - 0.03,
            )
            .fromTo(`#lm-${seg.to} .lm__label, #lm-${seg.to} .lm__leader`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, start + dur)
        })

        // Further horizons, in gold, rise across the world as the plane travels
        tl.fromTo('.lm--gold .lm__art', { autoAlpha: 0, y: 30, transformOrigin: '50% 100%' }, { autoAlpha: 1, y: 0, stagger: 0.035, duration: 0.05 }, 0.3)
          .fromTo('.lm--gold .lm__label, .lm--gold .lm__leader', { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.035, duration: 0.04 }, 0.32)
          .fromTo('.place', { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.025, duration: 0.03 }, 0.35)

        // 3. Final message
        tl.to('.journey__h-start', { autoAlpha: 0, y: -40, duration: 0.05 }, 0.84)
          .fromTo('.journey__h-end', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.07 }, 0.86)
          .fromTo('.journey__closing', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.05 }, 0.9)
          .to('.journey__pan', { x: panTo(0.5), duration: 0.1, ease: 'power1.inOut' }, 0.84)
          .to({}, { duration: 0.04 })
      })
    },
    { scope: root },
  )

  const s = 0.62 // plane scale in map units

  return (
    <section id="journey" ref={root} className="journey" aria-labelledby="journey-title">
      <div className="container journey__intro">
        <p className="eyebrow">07 — The global journey</p>
        <div className="journey__titles">
          <h2 id="journey-title" className="display journey__h journey__h-start">
            One language can <em>take you places.</em>
          </h2>
          <p className="display journey__h journey__h-end" role="heading" aria-level={2}>
            Your next chapter <em>has no borders.</em>
          </p>
        </div>
      </div>

      <div className="journey__viewport">
        <div className="journey__pan">
          <div className="journey__map" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
            {Array.from({ length: FOLDS }, (_, i) => (
              <div className="fold" key={i} style={{ left: `${(i * 100) / FOLDS}%`, width: `${100 / FOLDS}%` }}>
                <svg
                  className="fold__map"
                  viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                  style={{ width: `${FOLDS * 100}%`, marginLeft: `${-i * 100}%` }}
                  aria-hidden="true"
                >
                  <Dots />
                </svg>
                <span className="fold__crease" />
              </div>
            ))}

            <svg className="journey__overlay" viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="A paper airplane route from India to Australia, Japan, Germany, France, the United Kingdom and the United States, with landmarks across the world">
              {/* faint planned route, then the burgundy route drawn as the plane flies */}
              {SEGMENTS.map(seg => (
                <path key={seg.id} id={seg.id} d={seg.d} className="route route--plan" pathLength={1} />
              ))}
              {SEGMENTS.map(seg => (
                <path key={seg.id} id={`${seg.id}-draw`} d={seg.d} className="route route--done" pathLength={1} />
              ))}

              {PLACES.map(p => (
                <g key={p.name} className="place" transform={`translate(${p.at})`}>
                  <circle r="4" />
                  <text x={p.anchor === 'end' ? -9 : 9} y="5" textAnchor={p.anchor ?? 'start'}>
                    {p.name}
                  </text>
                </g>
              ))}
              {HORIZONS.map(l => (
                <Landmark key={l.id} l={l} tone="gold" />
              ))}
              {STOPS.map(l => (
                <Landmark key={l.id} l={l} tone="ink" />
              ))}
              <circle cx={pt('india')[0]} cy={pt('india')[1]} r="16" className="lm__pulse" />

              <g className="journey__plane" transform="translate(560 170) rotate(160)">
                <g transform={`scale(${s})`}>
                  <path d="M118 22 L30 4 L52 36 Z" fill="#8e2f41" />
                  <path d="M118 22 L52 36 L46 58 Z" fill="#4f1320" />
                  <path d="M118 22 L2 46 L52 36 Z" fill="#701b2b" />
                  <path d="M118 22 L2 46 L40 44 Z" fill="#7f2435" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="container journey__closing">
        <p className="lede">Every language opens a door. Every journey begins with a conversation.</p>
        <ul className="journey__legend" aria-label="Map legend">
          <li>
            <i className="dot dot--now" /> German · Japanese · French
          </li>
          <li>
            <i className="dot" /> Destinations across the world
          </li>
        </ul>
      </div>
    </section>
  )
}
