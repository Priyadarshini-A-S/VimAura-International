import { useEffect, useState } from 'react'
import Logo from './Logo'
import { SPLASH_MS } from './Splash'
import { NAV_LINKS } from '../lib/contact'
import { scrollToId } from '../lib/smoothScroll'
import './Navbar.css'

// sections without their own nav item light up the nearest one
const SECTION_TO_LINK: Record<string, string> = { languages: 'services', journey: 'french' }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [logoOn, setLogoOn] = useState(false)

  // the nav logo plays its globe-and-plane moment as the opening splash hands over
  useEffect(() => {
    const t = setTimeout(() => setLogoOn(true), SPLASH_MS - 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 60))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Highlight the section currently under the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(SECTION_TO_LINK[e.target.id] ?? e.target.id)),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    ;[...NAV_LINKS.map(l => l.id), ...Object.keys(SECTION_TO_LINK)].forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // let the menu close (and unlock scroll) before scrolling
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__bar">
        <a href="#home" className="nav__brand" onClick={go('home')} aria-label="VimAura International — home">
          <Logo on={logoOn} />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              className={active === l.id ? 'is-active' : ''}
              aria-current={active === l.id ? 'location' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn nav__cta" onClick={go('contact')}>
          Start your journey
        </a>

        <button
          className="nav__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        <nav aria-label="Mobile">
          <ol>
            {NAV_LINKS.map((l, i) => (
              <li key={l.id} style={{ '--i': i } as React.CSSProperties}>
                <a href={`#${l.id}`} onClick={go(l.id)}>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <a href="#contact" className="btn" onClick={go('contact')}>
          Start your journey <span className="arrow">→</span>
        </a>
        <p className="nav__sheet-note">Language is your passport.</p>
      </div>
    </header>
  )
}
