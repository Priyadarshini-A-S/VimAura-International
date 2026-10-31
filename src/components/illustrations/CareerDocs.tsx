/** An ID badge on a lanyard, a briefcase and an opportunity letter. */
export default function CareerDocs({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 420" aria-hidden="true">
      {/* letter */}
      <g className="career__letter" transform="translate(40 70) rotate(-6)">
        <rect width="250" height="310" fill="#fffcf6" stroke="rgba(180,154,105,.6)" />
        <rect x="24" y="26" width="60" height="6" fill="#701b2b" />
        <text x="24" y="70" fontFamily="Cormorant Garamond, serif" fontSize="26" fontStyle="italic" fill="#191817">
          Opportunity
        </text>
        {[96, 112, 128, 144, 170, 186, 202].map((y, i) => (
          <rect key={y} x="24" y={y} width={i % 3 === 2 ? 130 : 200} height="2" fill="rgba(25,24,23,.15)" />
        ))}
        <path d="M24 262 q20 -22 36 0 t36 -4" fill="none" stroke="#191817" strokeWidth="1.4" />
        <circle cx="200" cy="262" r="26" fill="none" stroke="#701b2b" strokeWidth="1.4" />
        <circle cx="200" cy="262" r="20" fill="none" stroke="#701b2b" strokeWidth="0.8" />
        <path d="M188 262 l8 8 l16 -16" fill="none" stroke="#701b2b" strokeWidth="2" />
      </g>
      {/* briefcase */}
      <g className="career__case" transform="translate(250 230)">
        <path d="M70 0 v-22 h80 v22" fill="none" stroke="#191817" strokeWidth="8" strokeLinejoin="round" />
        <rect x="0" y="0" width="220" height="150" rx="8" fill="#701b2b" />
        <rect x="0" y="0" width="220" height="62" rx="8" fill="#5e1724" />
        <rect x="96" y="50" width="28" height="26" rx="3" fill="#cdb98f" />
        <path d="M0 62 H96 M124 62 H220" stroke="#4f1320" strokeWidth="2" />
      </g>
      {/* lanyard + badge */}
      <g className="career__badge">
        <path d="M352 0 L390 120 M428 0 L402 120" stroke="#b49a69" strokeWidth="5" fill="none" />
        <g transform="translate(350 118) rotate(8)">
          <rect width="104" height="140" rx="8" fill="#fffcf6" stroke="#b49a69" strokeWidth="1.5" />
          <rect x="38" y="10" width="28" height="6" rx="3" fill="#e8ddc9" />
          <circle cx="52" cy="54" r="20" fill="#e8ddc9" />
          <circle cx="52" cy="48" r="8" fill="#b49a69" />
          <path d="M38 68 q14 -16 28 0" fill="#b49a69" />
          <rect x="22" y="88" width="60" height="5" fill="#191817" />
          <rect x="30" y="100" width="44" height="3" fill="rgba(25,24,23,.3)" />
          <rect x="22" y="116" width="60" height="10" fill="#701b2b" />
        </g>
      </g>
    </svg>
  )
}
