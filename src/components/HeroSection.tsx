import { useRef } from 'react'
import AnimatedBook, { type PageContent } from './AnimatedBook'
import PaperAirplane from './PaperAirplane'
import { SPLASH_MS } from './Splash'
import Globe from './illustrations/Globe'
import { gsap, useGSAP, MOTION_OK, DESKTOP } from '../lib/gsap'
import { scrollToId } from '../lib/smoothScroll'
import './HeroSection.css'

const LEAVES: [PageContent, PageContent][] = [
  [
    { label: 'Deutsch', word: 'Guten Tag.', lang: 'de', note: 'Your first words.', folio: 3 },
    { label: 'Français', word: 'Bonjour.', lang: 'fr', note: 'A new horizon.', folio: 4 },
  ],
  [
    { label: '日本語', word: 'こんにちは', lang: 'ja', note: 'A new horizon.', folio: 5 },
    { label: 'English', word: 'Hello, world.', note: 'Beyond borders.', folio: 6 },
  ],
  [
    { label: 'Chapter II', word: 'Find your voice.', note: 'Beyond words.', folio: 7 },
    { label: 'Chapter III', word: 'Every journey…', note: '…begins with a conversation.', folio: 8 },
  ],
]

export default function HeroSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: MOTION_OK, desktop: DESKTOP }, ctx => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return

        const leaves = gsap.utils.toArray<HTMLElement>('.book__leaf')
        const n = leaves.length

        // ---- 1. Load: the book opens, the airplane slips out of the pages ----
        // wait for the opening logo splash
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: SPLASH_MS / 1000 - 0.5 })
        intro
          .from('.hero__stage', { autoAlpha: 0, y: 50, duration: 1.4 })
          .fromTo('.hero .book__lid', { rotationY: -24, z: n + 3 }, { rotationY: -178, z: 0, duration: 2.2, ease: 'power3.inOut' }, 0.3)
          .from('.hero__globe', { autoAlpha: 0, scale: 0.85, duration: 2 }, 0.4)
          .from('.hero__line > span', { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0.5)
          .from('.hero__intro-fade', { autoAlpha: 0, y: 20, duration: 1, stagger: 0.1 }, 1.2)
          .fromTo(
            '.hero__plane-intro',
            { x: '30%', y: '160%', scale: 0.12, rotation: -20, autoAlpha: 0 },
            { x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: 1.9, ease: 'power2.out' },
            1.7,
          )
          .from('.hero__scroll', { autoAlpha: 0, duration: 0.8 }, 2.6)

        // ---- 2. Scroll: pages turn, the airplane flies at the visitor and away ----
        const W = () => window.innerWidth
        const H = () => window.innerHeight
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: desktop ? '+=170%' : '+=120%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to('.hero__scroll', { autoAlpha: 0, duration: 0.05 }, 0)
        leaves.forEach((leaf, i) => {
          tl.fromTo(
            leaf,
            { rotationY: 0, z: n - i },
            { rotationY: -176 + i * 0.6, z: i + 1, duration: 0.22, ease: 'power1.inOut' },
            0.04 + i * 0.16,
          )
        })
        tl.to(
          '.hero__plane',
          {
            // re-evaluated on every refresh (invalidateOnRefresh) so the flight fits any viewport
            motionPath: (() => ({
              path: [
                { x: 0, y: 0 },
                { x: -W() * 0.06, y: H() * 0.1 },
                { x: W() * 0.12, y: H() * 0.26 },
                { x: W() * 0.42, y: H() * 0.08 },
                { x: W() * 0.8, y: -H() * 0.6 },
              ],
              curviness: 1.3,
              autoRotate: true,
            })) as unknown as gsap.TweenVars['motionPath'],
            scale: desktop ? 3.6 : 2.6,
            duration: 0.7,
            ease: 'power1.in',
          },
          0.08,
        )
        // desktop dissolves into the next scene; on phones the hero simply scrolls away, so it never goes blank
        if (desktop) {
          tl.to('.hero__copy', { y: -80, autoAlpha: 0, duration: 0.3 }, 0.66)
          tl.to('.hero__stage', { y: () => -H() * 0.12, scale: 0.86, autoAlpha: 0, duration: 0.32 }, 0.68)
        } else {
          tl.to({}, { duration: 0.2 }, 0.7)
        }
      })
    },
    { scope: root },
  )

  return (
    <section id="home" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__intro-fade">VimAura International</p>
          <h1 id="hero-title" className="display hero__title">
            <span className="line-mask hero__line">
              <span>The world</span>
            </span>
            <span className="line-mask hero__line">
              <span>is waiting.</span>
            </span>
            <span className="line-mask hero__line">
              <span>
                <em>Speak its language.</em>
              </span>
            </span>
          </h1>
          <p className="hero__sub hero__intro-fade">
            Discover new cultures, unlock global opportunities, and find your voice beyond borders.
          </p>
          <div className="hero__ctas hero__intro-fade">
            <a href="#services" className="btn" onClick={e => (e.preventDefault(), scrollToId('services'))}>
              Explore our programs <span className="arrow">→</span>
            </a>
            <a href="#about" className="btn btn--ghost" onClick={e => (e.preventDefault(), scrollToId('about'))}>
              Discover VimAura
            </a>
          </div>
        </div>

        <div className="hero__stage">
          <Globe className="hero__globe" />
          <AnimatedBook
            className="hero__book"
            leaves={LEAVES}
            inner={{ label: 'Chapter I', word: 'A language is a passport.', note: 'To the world.', folio: 2 }}
            base={{ label: 'Chapter IV', word: 'The world is waiting.', note: 'Turn the page.', folio: 9 }}
          />
          <div className="hero__plane">
            <div className="hero__plane-intro">
              <PaperAirplane className="hero__plane-svg" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
