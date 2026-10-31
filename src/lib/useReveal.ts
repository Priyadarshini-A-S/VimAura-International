import { useEffect } from 'react'

/**
 * Simple reversible reveals: any `[data-reveal]` inside the root gets `is-in`
 * when it enters the viewport, and loses it again when it drops below the
 * viewport (so scrolling back up replays the reveal in reverse).
 */
export function useReveal(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add('is-in')
          else if (e.boundingClientRect.top > 0) e.target.classList.remove('is-in')
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [root])
}
