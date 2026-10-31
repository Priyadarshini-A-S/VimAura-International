// the original logo with its paper texture lifted out (scripts/flatten-logo.py), so it multiplies cleanly onto the page
import logoUrl from '../assets/logo-blend.png'
import './Logo.css'

type Props = {
  className?: string
  size?: 'nav' | 'lg' | 'splash'
  /** true = globe and plane in their places; false = globe turned back, plane away. */
  on?: boolean
}

/**
 * The original VimAura logo, never redrawn. It is layered from copies of the same
 * image so the globe can turn and the paper plane can fly in:
 *   1. the full logo
 *   2. a white patch over the plane (invisible once multiplied, so only the flying copy is seen)
 *   3. the globe disc, clipped to a circle, which rotates in place
 *   4. the plane, clipped to its outline, which flies into position
 * The whole stack is multiplied onto the page with feathered edges.
 */
export default function Logo({ className = '', size = 'nav', on = true }: Props) {
  return (
    <span className={`logo logo--${size} ${on ? 'is-on' : ''} ${className}`}>
      <img className="logo__base" src={logoUrl} alt="VimAura International" width={676} height={613} />
      <span className="logo__patch" aria-hidden="true" />
      <img className="logo__globe" src={logoUrl} alt="" aria-hidden="true" />
      <img className="logo__plane" src={logoUrl} alt="" aria-hidden="true" />
    </span>
  )
}
