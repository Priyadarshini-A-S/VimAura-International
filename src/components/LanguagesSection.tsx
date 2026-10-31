import { useRef } from 'react'
import GermanyScene from './illustrations/GermanyScene'
import JapanScene from './illustrations/JapanScene'
import FranceScene from './illustrations/FranceScene'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import { scrollToId } from '../lib/smoothScroll'
import './LanguagesSection.css'

const LANGS = [
  { key: 'de', id: 'german', name: 'German', native: 'Deutsch', lang: 'de', levels: 'A1 – C1', Scene: GermanyScene },
  { key: 'jp', id: 'japanese', name: 'Japanese', native: '日本語', lang: 'ja', levels: 'N5 – N1', Scene: JapanScene },
  { key: 'fr', id: 'french', name: 'French', native: 'Français', lang: 'fr', levels: 'A1 – C1', Scene: FranceScene },
]

/** Three travel posters, one per language; each opens its program section. */
export default function LanguagesSection() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('.poster').forEach((poster, i) => {
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: poster, start: 'top 92%', end: 'top 30%', scrub: 1 },
          })
          tl.fromTo(poster, { clipPath: 'inset(18% 8% 18% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
            .fromTo(poster.querySelector('.poster__art'), { scale: 1.18, y: 40 }, { scale: 1, y: 0, duration: 1 }, 0)
            .fromTo(poster.querySelector('.poster__stamp'), { scale: 1.8, rotation: i % 2 ? 30 : -30, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.3, ease: 'back.out(2)' }, 0.7)
          gsap.fromTo(
            poster.querySelectorAll('.jp__sun, .fr__tower, .de__sun'),
            { y: 30 },
            { y: -30, ease: 'none', scrollTrigger: { trigger: poster, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
        gsap.fromTo(
          '.poster--jp .jp__blossom',
          { scale: 0, transformOrigin: '50% 50%' },
          { scale: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.poster--jp', start: 'top 70%', end: 'center 50%', scrub: 1 } },
        )
      })
    },
    { scope: root },
  )

  return (
    <section id="languages" ref={root} className="languages" aria-labelledby="languages-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">03 — Our languages</p>
          <span className="section-head__num">German · Japanese · French</span>
        </header>
        <div className="languages__head">
          <h2 id="languages-title" className="display languages__title" data-reveal>
            New languages.
            <br />
            <em>New horizons.</em>
          </h2>
          <p className="body" data-reveal>
            Choose your language and start your journey. Every program follows a structured path, with online, offline and hybrid
            classes.
          </p>
        </div>

        <div className="languages__grid">
          {LANGS.map(({ key, id, name, native, lang, levels, Scene }) => (
            <a
              key={key}
              href={`#${id}`}
              className={`poster poster--${key}`}
              onClick={e => (e.preventDefault(), scrollToId(id))}
              aria-label={`${name} program, levels ${levels}`}
            >
              <span className="poster__art">
                <Scene className="poster__scene" />
              </span>
              <span className="poster__native" lang={lang} aria-hidden="true">
                {native}
              </span>
              <span className="poster__foot">
                <span className="poster__name">{name}</span>
                <span className="poster__more">
                  Explore <span className="arrow">→</span>
                </span>
              </span>
              <span className="poster__stamp" aria-hidden="true">
                <span>Levels</span>
                <b>{levels}</b>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
