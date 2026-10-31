import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK, DESKTOP } from '../lib/gsap'
import './AboutSection.css'

function WindowView() {
  return (
    <svg className="window__view" viewBox="0 0 300 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="420" fill="#f1e6d2" />
      <rect y="150" width="300" height="140" fill="#ecdcc2" />
      <g className="window__sun">
        <circle cx="168" cy="236" r="40" fill="#b49a69" opacity="0.85" />
        <circle cx="168" cy="236" r="58" fill="none" stroke="#b49a69" strokeWidth="0.8" opacity="0.5" />
      </g>
      {/* far land, faint dotted horizon */}
      <path d="M0 292 L300 288 L300 420 L0 420 Z" fill="#e3d0b1" />
      <path d="M0 300 Q 60 292 120 298 T 240 296 T 300 300 L300 420 L0 420 Z" fill="#d9c29c" opacity="0.7" />
      <g fill="#701b2b" opacity="0.5">
        <rect x="58" y="282" width="3" height="10" />
        <rect x="64" y="278" width="4" height="14" />
        <rect x="71" y="285" width="3" height="7" />
        <path d="M212 292 L222 270 L232 292 Z" />
        <rect x="236" y="281" width="3" height="11" />
      </g>
      <g className="window__clouds-far" fill="#fffcf6" opacity="0.9">
        <ellipse cx="40" cy="180" rx="44" ry="9" />
        <ellipse cx="250" cy="150" rx="36" ry="7" />
        <ellipse cx="380" cy="200" rx="50" ry="9" />
      </g>
      <g className="window__clouds-near" fill="#fffcf6">
        <path d="M-40 330 q30 -26 66 -10 q22 -26 58 -6 q34 -10 50 14 q30 2 30 24 l-210 0 z" />
        <path d="M190 360 q26 -22 58 -8 q22 -20 50 -2 q30 0 36 22 l-160 0 z" opacity="0.95" />
        <path d="M330 320 q26 -20 56 -6 q20 -18 46 0 l-110 8 z" />
      </g>
      {/* wing */}
      <path d="M300 338 L120 412 L126 420 L300 420 Z" fill="#2a2624" />
      <path d="M300 338 L120 412 L124 416 L300 350 Z" fill="#3a3431" />
      <circle cx="128" cy="411" r="2.4" fill="#8e2f41" />
    </svg>
  )
}

export default function AboutSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: MOTION_OK, desktop: DESKTOP }, ctx => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: desktop
            ? { trigger: root.current, start: 'top top', end: '+=150%', pin: true, scrub: 1 }
            : { trigger: '.about__window-wrap', start: 'top 85%', end: 'bottom 30%', scrub: 1 },
        })

        tl.fromTo('.window', { scale: 0.62, rotation: -4, y: 40 }, { scale: 1, rotation: 0, y: 0, duration: 0.35, ease: 'power2.out' }, 0)
          .fromTo('.window__shade', { y: 0, yPercent: 0 }, { y: 0, yPercent: -101, duration: 0.4, ease: 'power2.inOut' }, 0.18)
          .fromTo('.window__sun', { y: 60 }, { y: -10, duration: 0.6 }, 0.25)
          .fromTo('.window__clouds-near', { x: 30 }, { x: -120, duration: 0.8 }, 0.2)
          .fromTo('.window__clouds-far', { x: 0 }, { x: -60, duration: 0.8 }, 0.2)
          .fromTo('.about__tag', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.4)

        if (desktop) {
          tl.fromTo('.about__line > span', { yPercent: 110 }, { yPercent: 0, duration: 0.2, stagger: 0.06, ease: 'power2.out' }, 0.38)
            .fromTo('.about__fade', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.18, stagger: 0.06 }, 0.5)
            .to({}, { duration: 0.15 })
        } else {
          gsap.utils.toArray<HTMLElement>('.about__line > span, .about__fade').forEach(el => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 70%', scrub: 1 } },
            )
          })
        }
      })
    },
    { scope: root },
  )

  return (
    <section id="about" ref={root} className="about" aria-labelledby="about-title">
      <div className="about__inner container">
        <div className="about__window-wrap">
          <div className="window">
            <div className="window__pane">
              <WindowView />
              <div className="window__shade" aria-hidden="true">
                <span className="window__shade-tab" />
              </div>
            </div>
          </div>
          <p className="about__tag">
            <span>Window seat</span> <strong>01A</strong> <span>— now cruising</span>
          </p>
        </div>

        <div className="about__copy">
          <p className="eyebrow about__fade">01 — About VimAura</p>
          <h2 id="about-title" className="display about__title">
            <span className="line-mask about__line">
              <span>Beyond words.</span>
            </span>
            <span className="line-mask about__line">
              <span>
                <em>Beyond borders.</em>
              </span>
            </span>
          </h2>
          <p className="lede about__fade">
            At VimAura International, we believe that language is more than communication — it is a gateway to cultures,
            opportunities, and meaningful connections.
          </p>
          <div className="about__cols">
            <p className="body about__fade">
              We help individuals develop the confidence to communicate across borders through structured foreign language
              training and international consultancy services.
            </p>
            <p className="body about__fade about__mission">
              <span className="about__mission-label">Our mission</span>
              To make global aspirations more accessible, one language at a time.
            </p>
          </div>
          <dl className="about__pass about__fade" aria-label="Your journey">
            <div>
              <dt>From</dt>
              <dd>Your first word</dd>
            </div>
            <div>
              <dt>To</dt>
              <dd>The wider world</dd>
            </div>
            <div>
              <dt>Via</dt>
              <dd>Language</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
