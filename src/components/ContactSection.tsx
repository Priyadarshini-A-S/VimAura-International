import { useEffect, useRef, useState } from 'react'
import AnimatedBook from './AnimatedBook'
import PaperAirplane from './PaperAirplane'
import Logo from './Logo'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import { CONTACT, WHATSAPP_URL } from '../lib/contact'
import './ContactSection.css'

export default function ContactSection() {
  const root = useRef<HTMLElement>(null)
  const [logoOn, setLogoOn] = useState(false)
  useReveal(root)

  // replay the globe-and-plane logo moment each time the sign-off comes into view
  useEffect(() => {
    const el = root.current?.querySelector('.signoff')
    if (!el) return
    const io = new IntersectionObserver(([e]) => setLogoOn(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const W = () => window.innerWidth
        const H = () => window.innerHeight
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 5%', scrub: 1, invalidateOnRefresh: true },
        })
        // The destination rises into view…
        tl.fromTo('.contact__panel', { clipPath: 'inset(14% 5% 0% 5%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 }, 0)
          .fromTo('.contact__rise', { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.35 }, 0.1)
          // …the book closes on its journey…
          .fromTo('.contact .book__lid', { rotationY: -178, z: 0 }, { rotationY: -2, z: 4, duration: 0.45, ease: 'power2.inOut' }, 0.25)
          .fromTo('.contact .book__shadow', { left: '2%' }, { left: '50%', duration: 0.45, ease: 'power2.inOut' }, 0.25)
          .fromTo('.contact__book', { x: 0, xPercent: 0 }, { x: 0, xPercent: -25, duration: 0.45, ease: 'power2.inOut' }, 0.25)
          // …and the airplane lands on it.
          .fromTo('.contact__plane', { x: () => -W() * 0.55 }, { x: 0, duration: 0.55, ease: 'power1.out' }, 0.45)
          .fromTo('.contact__plane', { y: () => -H() * 0.45 }, { y: 0, duration: 0.55, ease: 'power3.in' }, 0.45)
          .fromTo('.contact__plane', { rotation: -28, scale: 1.9, autoAlpha: 0 }, { rotation: 0, scale: 1, autoAlpha: 1, duration: 0.55 }, 0.45)
          .fromTo('.contact__plane-shadow', { scaleX: 0.2, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.2 }, 0.8)
      })
    },
    { scope: root },
  )

  return (
    <section id="contact" ref={root} className="contact" aria-labelledby="contact-title">
      <div className="contact__panel">
        <div className="container contact__grid">
          <div className="contact__copy">
            <p className="eyebrow contact__rise">08 — The final destination</p>
            <h2 id="contact-title" className="display contact__title contact__rise">
              Let's open a new world <em>together.</em>
            </h2>
            <p className="lede contact__rise">Your journey towards a new language begins with a conversation.</p>

            <div className="contact__ctas contact__rise">
              <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.2Z" />
                </svg>
                Enquire on WhatsApp
              </a>
              <a className="btn btn--ghost" href={CONTACT.phoneTel}>
                Call now
              </a>
            </div>

            <dl className="contact__list contact__rise">
              <div>
                <dt>Contact person</dt>
                <dd>{CONTACT.person}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a className="link-underline" href={CONTACT.phoneTel}>
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a className="link-underline" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a className="link-underline" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                    Sivakumar S <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="contact__stage" aria-hidden="true">
            <AnimatedBook
              className="contact__book"
              inner={{ label: 'Epilogue', word: 'Bis bald.', lang: 'de', note: 'See you soon.', folio: 98 }}
              base={{ label: 'The end', word: '…of this chapter.', note: 'The next one is yours.', folio: 99 }}
            />
            <div className="contact__plane">
              <span className="contact__plane-shadow" />
              <PaperAirplane className="contact__plane-svg" />
            </div>
          </div>
        </div>
      </div>

      <div className="signoff container">
        <Logo size="lg" className="signoff__logo" on={logoOn} />
        <div>
          <p className="eyebrow eyebrow--plain" data-reveal>
            VimAura International
          </p>
          <p className="display signoff__line" data-reveal="mask">
            <span>
              Language is <em>your passport.</em>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
