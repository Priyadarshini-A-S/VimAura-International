import { NAV_LINKS, CONTACT, WHATSAPP_URL } from '../lib/contact'
import { scrollToId } from '../lib/smoothScroll'
import './Footer.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <nav aria-label="Footer">
          <ul className="footer__nav">
            {NAV_LINKS.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="link-underline" onClick={e => (e.preventDefault(), scrollToId(l.id))}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="footer__contact">
          <li>
            <a className="link-underline" href={CONTACT.phoneTel}>
              {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>
            <a className="link-underline" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </li>
          <li>
            <a className="link-underline" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <a className="link-underline" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="footer__copy">© {YEAR} VimAura International. All rights reserved.</p>
        <p className="footer__motto">Language is your passport to the world.</p>
      </div>
    </footer>
  )
}
