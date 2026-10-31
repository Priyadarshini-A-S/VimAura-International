import { useRef } from 'react'
import Passport from './illustrations/Passport'
import TravelDocs from './illustrations/TravelDocs'
import CareerDocs from './illustrations/CareerDocs'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import { scrollToId } from '../lib/smoothScroll'
import './ServicesSection.css'

const TRAINING = [
  'Beginner to advanced learning pathways',
  'Structured learning programs',
  'Online classes',
  'Offline classes',
  'Hybrid learning options',
  'Guided preparation and mentoring',
]

const GREETINGS = [
  { text: 'Guten Tag', lang: 'de' },
  { text: 'Bonjour', lang: 'fr' },
  { text: 'こんにちは', lang: 'ja' },
  { text: 'Hello', lang: 'en' },
  { text: 'नमस्ते', lang: 'hi' },
]

export default function ServicesSection() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Parallax: each illustration layer drifts at its own depth.
        gsap.utils.toArray<HTMLElement>('[data-depth]').forEach(el => {
          const d = parseFloat(el.dataset.depth || '0')
          gsap.fromTo(
            el,
            { y: () => 120 * d },
            {
              y: () => -120 * d,
              ease: 'none',
              scrollTrigger: { trigger: el.closest('.service'), start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
            },
          )
        })
        gsap.fromTo(
          '.service--training .service__passport',
          { rotation: -14 },
          { rotation: 4, ease: 'none', scrollTrigger: { trigger: '.service--training', start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        gsap.fromTo(
          '.docs__route',
          { strokeDashoffset: 220 },
          { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.service--consult', start: 'top 80%', end: 'center 40%', scrub: true } },
        )
        gsap.fromTo(
          '.career__badge',
          { rotation: -12, svgOrigin: '390 0' },
          { rotation: 6, svgOrigin: '390 0', ease: 'none', scrollTrigger: { trigger: '.service--career', start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        gsap.fromTo(
          '.docs__compass',
          { rotation: -60, svgOrigin: '452 70' },
          { rotation: 20, svgOrigin: '452 70', ease: 'none', scrollTrigger: { trigger: '.service--consult', start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    },
    { scope: root },
  )

  return (
    <section id="services" ref={root} className="services" aria-labelledby="services-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">02 — Services</p>
          <span className="section-head__num">Three paths, one world</span>
        </header>
        <h2 id="services-title" className="display services__title" data-reveal>
          Where would you <em>like to go?</em>
        </h2>

        <article className="service service--consult" aria-labelledby="svc-a">
          <div className="service__copy">
            <span className="service__index" data-reveal>
              A
            </span>
            <h3 id="svc-a" className="service__name" data-reveal>
              Consultancy Services
            </h3>
            <p className="lede service__tag" data-reveal>
              Your aspirations deserve a global direction.
            </p>
            <p className="body" data-reveal>
              VimAura International offers international consultancy services for individuals whose ambitions reach beyond
              borders. Tell us where you hope to go, and let's start the conversation.
            </p>
            <a href="#contact" className="btn" data-reveal onClick={e => (e.preventDefault(), scrollToId('contact'))}>
              Enquire now <span className="arrow">→</span>
            </a>
          </div>
          <div className="service__art service__art--docs" data-depth="0.12">
            <TravelDocs className="service__docs" />
          </div>
        </article>

        <article className="service service--training service--art-left" aria-labelledby="svc-b">
          <div className="service__art">
            <div className="service__words" aria-hidden="true">
              {GREETINGS.map((g, i) => (
                <span key={g.text} lang={g.lang} className={`greet greet--${i}`} data-depth={0.25 + (i % 3) * 0.3}>
                  {g.text}
                </span>
              ))}
            </div>
            <div className="service__passport-wrap" data-depth="0.15">
              <Passport className="service__passport" />
            </div>
          </div>
          <div className="service__copy">
            <span className="service__index" data-reveal>
              B
            </span>
            <h3 id="svc-b" className="service__name" data-reveal>
              Language Training
            </h3>
            <p className="lede service__tag" data-reveal>
              Learn a new language. Discover a new world.
            </p>
            <p className="body" data-reveal>
              We provide structured foreign language training designed to help learners build practical communication skills
              and confidence.
            </p>
            <ol className="service__list">
              {TRAINING.map((t, i) => (
                <li key={t} data-reveal style={{ '--d': `${i * 0.06}s` } as React.CSSProperties}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </li>
              ))}
            </ol>
            <a href="#languages" className="btn btn--ghost" data-reveal onClick={e => (e.preventDefault(), scrollToId('languages'))}>
              Explore our languages <span className="arrow">→</span>
            </a>
          </div>
        </article>

        <article className="service service--career" aria-labelledby="svc-c">
          <div className="service__copy">
            <span className="service__index" data-reveal>
              C
            </span>
            <h3 id="svc-c" className="service__name" data-reveal>
              Internship &amp; Job Opportunities
            </h3>
            <p className="lede service__tag" data-reveal>
              Turn your new language into your next opportunity.
            </p>
            <p className="body" data-reveal>
              VimAura International also helps learners explore internship and job opportunities, so the language you learn can
              open real doors. Tell us what you're looking for, and let's talk about the way forward.
            </p>
            <a href="#contact" className="btn" data-reveal onClick={e => (e.preventDefault(), scrollToId('contact'))}>
              Enquire now <span className="arrow">→</span>
            </a>
          </div>
          <div className="service__art service__art--docs" data-depth="0.12">
            <CareerDocs className="service__docs" />
          </div>
        </article>
      </div>
    </section>
  )
}
