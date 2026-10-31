import { MAP_H, MAP_W, WORLD_DOTS } from './worldDots'

/** Map sheet with a burgundy route, a boarding pass and a compass. */
export default function TravelDocs({ className = '' }: { className?: string }) {
  const s = 460 / MAP_W
  return (
    <svg className={className} viewBox="0 0 520 420" aria-hidden="true">
      {/* map sheet */}
      <g className="docs__map">
        <rect x="20" y="20" width="480" height="300" fill="#fffcf6" stroke="rgba(180,154,105,.5)" />
        <line x1="180" y1="20" x2="180" y2="320" stroke="rgba(25,24,23,.06)" />
        <line x1="340" y1="20" x2="340" y2="320" stroke="rgba(25,24,23,.06)" />
        <g transform={`translate(30 ${170 - (MAP_H * s) / 2}) scale(${s})`}>
          <path d={WORLD_DOTS} stroke="#b49a69" strokeWidth="6" strokeLinecap="round" opacity="0.75" />
        </g>
        <path className="docs__route" d="M360 150 C 320 60, 230 50, 270 96 S 160 130, 140 110" fill="none" stroke="#701b2b" strokeWidth="1.8" strokeDasharray="5 6" />
        <circle cx="360" cy="150" r="5" fill="#701b2b" />
        <circle cx="140" cy="110" r="5" fill="none" stroke="#701b2b" strokeWidth="2" />
        <circle cx="270" cy="96" r="3.5" fill="#701b2b" />
      </g>
      {/* boarding pass */}
      <g className="docs__pass" transform="translate(150 250) rotate(-5)">
        <rect width="300" height="120" fill="#701b2b" />
        <rect x="216" width="84" height="120" fill="#5e1724" />
        <line x1="216" y1="6" x2="216" y2="114" stroke="#cdb98f" strokeDasharray="3 4" />
        <text x="20" y="30" fill="#cdb98f" fontFamily="Manrope, sans-serif" fontSize="9" letterSpacing="3">BOARDING PASS</text>
        <text x="20" y="66" fill="#fffcf6" fontFamily="Cormorant Garamond, serif" fontSize="26" fontStyle="italic">a global direction</text>
        <text x="20" y="96" fill="#cdb98f" fontFamily="Manrope, sans-serif" fontSize="8.5" letterSpacing="2.5">VIMAURA INTERNATIONAL</text>
        <path d="M244 46 L276 58 L244 70 L252 58 Z" fill="#cdb98f" />
        <g fill="#cdb98f" opacity="0.7">
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={234 + i * 5} y="86" width={i % 3 ? 2 : 3} height="18" />
          ))}
        </g>
      </g>
      {/* compass */}
      <g className="docs__compass" transform="translate(452 70)">
        <circle r="44" fill="#f5f0e6" stroke="#b49a69" />
        <circle r="36" fill="none" stroke="#b49a69" strokeWidth="0.6" />
        <path d="M0 -32 L6 0 L0 32 L-6 0 Z" fill="#191817" />
        <path d="M0 -32 L6 0 L-6 0 Z" fill="#701b2b" />
        <text y="-46" dy="-3" textAnchor="middle" fontSize="9" fontFamily="Manrope, sans-serif" fill="#701b2b" letterSpacing="1">N</text>
      </g>
    </svg>
  )
}
