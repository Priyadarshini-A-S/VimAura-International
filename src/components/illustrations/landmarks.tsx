import type { ReactNode } from 'react'

/**
 * Landmark silhouettes for the journey map, drawn in map units with the ground line at y = 0.
 * `ink` landmarks are stops on the airplane's route; `gold` ones are further horizons.
 */
export const ART: Record<string, ReactNode> = {
  taj: (
    <g>
      <path d="M-30 0 V-34 H30 V0 Z" />
      <path d="M-20 -34 Q-22 -62 0 -72 Q22 -62 20 -34 Z" />
      <path d="M0 -72 V-82" stroke="currentColor" strokeWidth="3" />
      <rect x="-46" y="-60" width="6" height="60" />
      <rect x="40" y="-60" width="6" height="60" />
      <path d="M-14 0 V-18 Q0 -30 14 -18 V0 Z" fill="#f2ead9" />
    </g>
  ),
  opera: (
    <g>
      <path d="M-60 0 Q-50 -40 -20 -50 Q-30 -20 -20 0 Z" />
      <path d="M-26 0 Q-16 -52 18 -64 Q4 -30 14 0 Z" />
      <path d="M10 0 Q22 -40 50 -44 Q38 -20 46 0 Z" />
      <rect x="-70" y="0" width="130" height="6" />
    </g>
  ),
  fuji: (
    <g>
      <circle cx="20" cy="-86" r="26" fill="#701b2b" opacity="0.85" />
      <path d="M-80 0 L-20 -70 Q0 -80 20 -70 L80 0 Z" />
      <path d="M-20 -70 Q0 -80 20 -70 L10 -58 L2 -64 L-6 -54 L-12 -62 Z" fill="#fffcf6" />
    </g>
  ),
  gate: (
    <g>
      <path d="M-52 -58 H52 V-46 H-52 Z" />
      <path d="M-12 -70 H12 L8 -58 H-8 Z" />
      <path d="M-56 -46 H56 V-40 H-56 Z" />
      {[-48, -32, -16, 0, 16, 32, 48].map(x => (
        <rect key={x} x={x - 3} y="-40" width="6" height="40" />
      ))}
      <rect x="-58" y="0" width="116" height="5" />
    </g>
  ),
  eiffel: (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
      <path d="M0 -138 V-126 M-4 -126 H4 L-8 -80 M4 -126 L8 -80" />
      <path d="M-12 -80 H12 M-8 -80 L-20 -40 M8 -80 L20 -40 M-24 -40 H24 M-20 -40 L-36 0 M20 -40 L36 0 M-16 0 Q0 -24 16 0" />
    </g>
  ),
  bigben: (
    <g>
      <rect x="-10" y="-96" width="20" height="96" />
      <rect x="-13" y="-104" width="26" height="10" />
      <path d="M-12 -104 L0 -134 L12 -104 Z" />
      <circle cy="-82" r="7" fill="#f2ead9" />
      <rect x="10" y="-40" width="44" height="40" />
      <path d="M10 -40 L32 -52 L54 -40 Z" />
    </g>
  ),
  liberty: (
    <g>
      <path d="M-22 0 L-16 -40 H16 L22 0 Z" />
      <path d="M-8 -40 L-10 -96 Q0 -104 10 -96 L8 -40 Z" />
      <circle cy="-106" r="7" />
      <path d="M-10 -112 L-16 -120 M-4 -114 L-6 -124 M4 -114 L6 -124 M10 -112 L16 -120" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 -90 L18 -130" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M14 -132 Q19 -146 24 -132 Z" fill="#b49a69" />
    </g>
  ),
  cn: (
    <g>
      <path d="M-4 0 L-2 -110 H2 L4 0 Z" />
      <ellipse cy="-76" rx="12" ry="7" />
      <path d="M0 -110 V-140" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  christ: (
    <g>
      <path d="M-60 0 Q-30 -36 0 -40 Q30 -36 60 0 Z" />
      <rect x="-4" y="-80" width="8" height="42" />
      <rect x="-26" y="-74" width="52" height="6" />
      <circle cy="-86" r="5" />
    </g>
  ),
  burj: (
    <g>
      <path d="M-14 0 V-30 H-8 V-60 H-4 V-96 H-1 V-130 H1 V-96 H4 V-60 H8 V-30 H14 V0 Z" />
    </g>
  ),
  pyramids: (
    <g>
      <path d="M-46 0 L-14 -46 L18 0 Z M4 0 L30 -34 L56 0 Z M-70 0 L-54 -20 L-38 0 Z" />
    </g>
  ),
  colosseum: (
    <g>
      <path d="M-40 0 V-34 Q0 -44 40 -38 V0 Z" />
      {[-30, -18, -6, 6, 18, 30].map(x => (
        <path key={x} d={`M${x - 4} -4 v-10 a4 4 0 0 1 8 0 v10 z M${x - 4} -22 v-6 a4 4 0 0 1 8 0 v6 z`} fill="#f2ead9" />
      ))}
    </g>
  ),
  pagoda: (
    <g>
      <rect x="-3" y="-80" width="6" height="80" />
      {[0, 1, 2, 3].map(i => (
        <path key={i} d={`M${-30 + i * 5} ${-14 - i * 18} Q0 ${-24 - i * 18} ${30 - i * 5} ${-14 - i * 18} L${24 - i * 5} ${-10 - i * 18} H${-24 + i * 5} Z`} />
      ))}
      <rect x="-18" y="-10" width="36" height="10" />
    </g>
  ),
  onion: (
    <g>
      <rect x="-24" y="-34" width="48" height="34" />
      <path d="M-14 -34 Q-24 -52 0 -70 Q24 -52 14 -34 Z" />
      <path d="M0 -70 V-82" stroke="currentColor" strokeWidth="3" />
      <path d="M-34 -24 Q-40 -36 -28 -46 Q-16 -36 -22 -24 Z M22 -24 Q16 -36 28 -46 Q40 -36 34 -24 Z" />
    </g>
  ),
  table: (
    <g>
      <path d="M-70 0 L-50 -30 L-36 -38 H34 L48 -30 L70 0 Z" />
    </g>
  ),
  chichen: (
    <g>
      <path d="M-50 0 H50 L42 -10 H-42 Z M-40 -10 H40 L32 -20 H-32 Z M-30 -20 H30 L22 -30 H-22 Z M-20 -30 H20 L14 -40 H-14 Z" />
      <rect x="-8" y="-50" width="16" height="10" />
    </g>
  ),
}

type Landmark = {
  id: string
  name: string
  sub?: string
  /** where the place is on the map */
  at: [number, number]
  /** where the illustration stands (ground point); defaults to `at` */
  art?: [number, number]
  /** label offset from the art ground point */
  label?: [number, number]
  key: keyof typeof ART
  scale?: number
}

// Equirectangular map units: x = (lon + 180) × 5, y = (80 − lat) × 5
export const STOPS: Landmark[] = [
  { id: 'india', name: 'India', sub: 'where the journey begins', at: [1290, 270], art: [1300, 262], key: 'taj', scale: 0.8 },
  { id: 'australia', name: 'Australia', at: [1656, 569], key: 'opera', scale: 0.8 },
  { id: 'japan', name: 'Japan', sub: '日本語', at: [1598, 222], art: [1716, 232], key: 'fuji' },
  { id: 'germany', name: 'Germany', sub: 'Deutsch', at: [967, 137], art: [1030, 70], key: 'gate', scale: 0.8 },
  { id: 'france', name: 'France', sub: 'Français', at: [912, 156], art: [790, 196], key: 'eiffel', scale: 0.85 },
  { id: 'uk', name: 'UK', at: [899, 142], art: [850, 70], key: 'bigben', scale: 0.62, label: [-34, 0] },
  { id: 'usa', name: 'United States', at: [530, 196], art: [560, 210], key: 'liberty', scale: 0.85 },
]

export const HORIZONS: Landmark[] = [
  { id: 'canada', name: 'Canada', at: [400, 110], key: 'cn', scale: 0.8 },
  { id: 'mexico', name: 'Mexico', at: [457, 296], key: 'chichen', scale: 0.8 },
  { id: 'brazil', name: 'Brazil', at: [684, 514], key: 'christ', scale: 0.9 },
  { id: 'italy', name: 'Italy', at: [962, 190], art: [956, 238], key: 'colosseum', scale: 0.8 },
  { id: 'egypt', name: 'Egypt', at: [1055, 250], art: [1060, 300], key: 'pyramids', scale: 0.8 },
  { id: 'southafrica', name: 'South Africa', at: [992, 569], key: 'table', scale: 0.7 },
  { id: 'uae', name: 'UAE', at: [1176, 274], art: [1180, 312], key: 'burj', scale: 0.7 },
  { id: 'russia', name: 'Russia', at: [1088, 121], art: [1236, 110], key: 'onion', scale: 0.8 },
  { id: 'china', name: 'China', at: [1482, 200], key: 'pagoda', scale: 0.8 },
]

/** Smaller destinations marked with a dot and a name. */
export const PLACES: { name: string; at: [number, number]; anchor?: 'start' | 'end' }[] = [
  { name: 'Ireland', at: [859, 133], anchor: 'end' },
  { name: 'Turkey', at: [1065, 205], anchor: 'start' },
  { name: 'Kenya', at: [1088, 406], anchor: 'start' },
  { name: 'Singapore', at: [1419, 393], anchor: 'start' },
  { name: 'Indonesia', at: [1470, 432], anchor: 'start' },
  { name: 'South Korea', at: [1540, 215], anchor: 'start' },
  { name: 'New Zealand', at: [1774, 607], anchor: 'end' },
  { name: 'Argentina', at: [580, 570], anchor: 'end' },
]
