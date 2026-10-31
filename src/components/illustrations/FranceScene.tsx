/** Eiffel Tower in line, Parisian mansard rooftops and a café awning. */
export default function FranceScene({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 340 460" aria-hidden="true">
      <g className="fr__awning">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${i * 40 - 10} 0 H${i * 40 + 30} V46 Q${i * 40 + 10} 60 ${i * 40 - 10} 46 Z`} fill={i % 2 ? '#fffcf6' : '#701b2b'} />
        ))}
      </g>
      <g className="fr__tower" fill="none" stroke="#191817" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M170 70 L170 92 M164 92 H176 L178 100 H162 Z" />
        <path d="M166 100 L150 220 M174 100 L190 220" />
        <path d="M146 220 H194 V230 H146 Z" />
        <path d="M150 230 L118 330 M190 230 L222 330" />
        <path d="M112 330 H228 V342 H112 Z" />
        <path d="M116 342 L80 410 M224 342 L260 410" />
        <path d="M128 342 Q170 372 212 342" />
        <path d="M100 410 Q170 360 240 410" />
        <path d="M158 120 L182 150 M182 120 L158 150 M154 160 L186 196 M186 160 L154 196" strokeWidth="0.9" />
        <path d="M134 250 L206 300 M206 250 L134 300" strokeWidth="0.9" />
        <path d="M108 360 L140 396 M232 360 L200 396" strokeWidth="0.9" />
      </g>
      <g className="fr__roofs">
        <path d="M0 360 H40 L52 340 H88 L100 360 V410 H0 Z" fill="#3a3431" />
        <path d="M250 352 L262 332 H312 L326 352 H340 V410 H250 Z" fill="#3a3431" />
        <g fill="#e8ddc9">
          <rect x="14" y="372" width="8" height="12" />
          <rect x="34" y="372" width="8" height="12" />
          <rect x="60" y="372" width="8" height="12" />
          <rect x="268" y="366" width="8" height="12" />
          <rect x="290" y="366" width="8" height="12" />
          <rect x="312" y="366" width="8" height="12" />
          <rect x="62" y="346" width="6" height="8" />
          <rect x="282" y="340" width="6" height="8" />
        </g>
        <rect x="60" y="328" width="6" height="14" fill="#3a3431" />
        <rect x="296" y="318" width="6" height="16" fill="#3a3431" />
      </g>
      <rect y="410" width="340" height="50" fill="#e8ddc9" />
    </svg>
  )
}
