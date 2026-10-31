/** Line drawing of the Brandenburg Gate; every stroke uses pathLength=1 so it can be drawn on scroll. */
export default function BrandenburgGate({ className = '' }: { className?: string }) {
  const cols = [40, 92, 144, 196, 248, 300, 352, 404]
  return (
    <svg className={className} viewBox="0 0 440 400" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {/* quadriga */}
      <g className="gate__draw">
        <path pathLength={1} d="M196 70 L206 40 L214 52 L222 34 L232 52 L240 40 L246 70 Z" />
        <path pathLength={1} d="M218 34 L218 14 M210 20 L226 20 M214 14 L222 14" />
        <path pathLength={1} d="M180 70 L262 70 L262 84 L180 84 Z" />
      </g>
      {/* attic */}
      <g className="gate__draw">
        <path pathLength={1} d="M20 132 L160 132 L180 84 L262 84 L282 132 L420 132" />
        <path pathLength={1} d="M14 132 L426 132 L426 150 L14 150 Z" />
        <path pathLength={1} d="M14 150 L426 150 L426 176 L14 176 Z" />
        <path pathLength={1} d="M24 163 L416 163" />
      </g>
      {/* columns */}
      <g className="gate__draw">
        {cols.map(x => (
          <path key={x} pathLength={1} d={`M${x - 8} 176 L${x - 8} 352 M${x + 8} 176 L${x + 8} 352 M${x - 13} 182 L${x + 13} 182 M${x - 13} 346 L${x + 13} 346`} />
        ))}
      </g>
      {/* base */}
      <g className="gate__draw">
        <path pathLength={1} d="M6 352 L434 352 L434 368 L6 368 Z" />
        <path pathLength={1} d="M0 368 L440 368" />
      </g>
    </svg>
  )
}
