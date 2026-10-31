type Props = { className?: string; title?: string }

/** Custom burgundy paper airplane, nose pointing right. */
export default function PaperAirplane({ className = '', title }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* far wing */}
      <path d="M118 22 L30 4 L52 36 Z" fill="#8e2f41" />
      {/* keel fold */}
      <path d="M118 22 L52 36 L46 58 Z" fill="#4f1320" />
      {/* near wing */}
      <path d="M118 22 L2 46 L52 36 Z" fill="#701b2b" />
      <path d="M118 22 L2 46 L40 44 Z" fill="#7f2435" />
      {/* crease highlights */}
      <path d="M118 22 L52 36" stroke="#d9b98a" strokeWidth="0.8" opacity="0.7" />
      <path d="M118 22 L30 4" stroke="#fffcf6" strokeWidth="0.6" opacity="0.35" />
    </svg>
  )
}
