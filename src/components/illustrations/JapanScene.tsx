/** Mount Fuji, a pagoda silhouette and a cherry blossom branch. */
export default function JapanScene({ className = '' }: { className?: string }) {
  const blossoms: [number, number, number][] = [
    [236, 58, 7], [262, 44, 6], [284, 70, 8], [212, 84, 5], [300, 36, 6], [250, 96, 6], [318, 88, 5], [196, 54, 4], [276, 108, 4],
  ]
  return (
    <svg className={className} viewBox="0 0 340 460" aria-hidden="true">
      <circle className="jp__sun" cx="120" cy="190" r="70" fill="#701b2b" opacity="0.9" />
      <g className="jp__fuji">
        <path d="M-20 400 L118 236 Q170 214 222 236 L360 400 Z" fill="#191817" />
        <path d="M118 236 Q170 214 222 236 L196 266 L182 254 L170 272 L156 252 L142 268 Z" fill="#fffcf6" />
      </g>
      <g className="jp__pagoda" fill="#3a3431">
        <rect x="262" y="300" width="4" height="100" />
        {[0, 1, 2, 3].map(i => (
          <g key={i} transform={`translate(0 ${i * 26})`}>
            <path d={`M${236 + i * 2} 318 Q264 ${306} ${292 - i * 2} 318 L${286 - i * 2} 322 L${242 + i * 2} 322 Z`} />
            <rect x={250} y="322" width="28" height="12" />
          </g>
        ))}
        <path d="M258 300 L264 282 L270 300 Z" />
      </g>
      <rect y="400" width="340" height="60" fill="#e8ddc9" />
      <path d="M0 410 H340 M30 424 H310 M70 438 H270" stroke="#b49a69" strokeWidth="1" opacity="0.6" />
      <g className="jp__branch">
        <path d="M360 20 Q300 40 260 70 Q230 90 190 70 M270 62 Q280 90 270 110 M300 40 Q318 60 320 90" fill="none" stroke="#191817" strokeWidth="3" strokeLinecap="round" />
        {blossoms.map(([x, y, r], i) => (
          <g key={i} className="jp__blossom" transform={`translate(${x} ${y})`}>
            {[0, 72, 144, 216, 288].map(a => (
              <ellipse key={a} rx={r * 0.55} ry={r} cy={-r * 0.8} fill={i % 3 ? '#e7bfc3' : '#d9a6ae'} transform={`rotate(${a})`} />
            ))}
            <circle r={r * 0.3} fill="#701b2b" />
          </g>
        ))}
      </g>
    </svg>
  )
}
