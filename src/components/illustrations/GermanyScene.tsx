/** Poster scene: the Brandenburg Gate against a low burgundy sun. */
export default function GermanyScene({ className = '' }: { className?: string }) {
  const cols = [44, 86, 128, 170, 212, 254, 296]
  return (
    <svg className={className} viewBox="0 0 340 460" aria-hidden="true">
      <circle className="de__sun" cx="170" cy="220" r="96" fill="#701b2b" opacity="0.9" />
      <g fill="#191817">
        <path d="M150 150 L160 128 L166 138 L172 122 L178 138 L184 128 L192 150 Z" />
        <rect x="140" y="150" width="62" height="12" />
        <path d="M30 196 L130 196 L144 162 L198 162 L212 196 L312 196 L312 206 L30 206 Z" />
        <rect x="24" y="206" width="294" height="24" />
        {cols.map(x => (
          <rect key={x} x={x - 6} y="230" width="12" height="150" />
        ))}
        <rect x="18" y="380" width="306" height="14" />
      </g>
      <rect y="394" width="340" height="66" fill="#e8ddc9" />
      <path d="M0 406 H340 M40 420 H300 M80 434 H260" stroke="#b49a69" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}
