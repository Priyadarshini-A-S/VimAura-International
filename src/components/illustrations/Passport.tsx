/** Burgundy passport with a gold embossed globe. */
export default function Passport({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 300" aria-hidden="true">
      <rect x="14" y="10" width="200" height="284" rx="10" fill="#4f1320" />
      <rect x="6" y="4" width="200" height="284" rx="10" fill="#701b2b" />
      <rect x="6" y="4" width="14" height="284" rx="6" fill="#5e1724" />
      <g fill="none" stroke="#cdb98f" strokeWidth="1.4">
        <circle cx="112" cy="132" r="42" />
        <ellipse cx="112" cy="132" rx="18" ry="42" />
        <line x1="70" y1="132" x2="154" y2="132" />
        <path d="M76 112 Q112 120 148 112 M76 152 Q112 144 148 152" />
        <path d="M150 96 L176 82 L166 104 Z" fill="#cdb98f" stroke="none" />
      </g>
      <text x="112" y="62" textAnchor="middle" fill="#cdb98f" fontFamily="Manrope, sans-serif" fontSize="11" letterSpacing="5">PASSPORT</text>
      <text x="112" y="214" textAnchor="middle" fill="#cdb98f" fontFamily="Cormorant Garamond, serif" fontSize="19" fontStyle="italic">
        to the world
      </text>
      <rect x="92" y="246" width="40" height="26" rx="3" fill="none" stroke="#cdb98f" strokeWidth="1.2" />
      <circle cx="112" cy="259" r="6" fill="none" stroke="#cdb98f" strokeWidth="1.2" />
    </svg>
  )
}
