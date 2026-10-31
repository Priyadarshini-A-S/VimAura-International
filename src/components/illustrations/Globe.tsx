import { useId } from 'react'
import { MAP_H, MAP_W, WORLD_DOTS } from './worldDots'

/** A slowly turning dotted globe: the flat dot map drifts behind a circular lens. */
export default function Globe({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  const R = 300
  // scale the map so its height spans the sphere
  const s = (2 * R) / MAP_H
  return (
    <svg className={className} viewBox={`0 0 ${2 * R} ${2 * R}`} aria-hidden="true">
      <defs>
        <clipPath id={`gc-${id}`}>
          <circle cx={R} cy={R} r={R - 2} />
        </clipPath>
      </defs>
      <circle cx={R} cy={R} r={R - 2} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <g clipPath={`url(#gc-${id})`}>
        <g className="globe__drift" style={{ '--drift': `${-MAP_W * s}px` } as React.CSSProperties}>
          <g transform={`scale(${s})`}>
            <path d={WORLD_DOTS} stroke="currentColor" strokeWidth={5.2} strokeLinecap="round" />
            <path d={WORLD_DOTS} stroke="currentColor" strokeWidth={5.2} strokeLinecap="round" transform={`translate(${MAP_W} 0)`} />
          </g>
        </g>
        {[0.25, 0.55, 0.82].map(k => (
          <ellipse key={k} cx={R} cy={R} rx={R * k} ry={R - 2} fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
        ))}
        {[-0.5, 0, 0.5].map(k => (
          <line key={k} x1={0} x2={2 * R} y1={R + k * R} y2={R + k * R} stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        ))}
      </g>
    </svg>
  )
}
