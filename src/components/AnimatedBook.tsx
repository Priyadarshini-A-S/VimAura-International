import './AnimatedBook.css'

export type PageContent = { label: string; word: string; lang?: string; note?: string; folio: number }

type Props = {
  className?: string
  /** Leaves that can be turned, top-most first: [front, back] of each leaf. */
  leaves?: [PageContent, PageContent][]
  inner?: PageContent
  base?: PageContent
  coverTitle?: string
}

function Face({ page, side }: { page: PageContent; side: 'l' | 'r' }) {
  return (
    <div className={`page page--${side}`}>
      <span className="page__label">{page.label}</span>
      <span className="page__word" lang={page.lang}>
        {page.word}
      </span>
      {page.note && <span className="page__note">{page.note}</span>}
      <span className="page__lines" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="page__folio">{page.folio}</span>
    </div>
  )
}

/**
 * A layered CSS-3D book. Parents animate:
 *   .book__lid   (front cover + inner left page, hinged at the spine)
 *   .book__leaf  (turnable pages, hinged at the spine)
 * Default CSS state = open, no pages turned.
 */
export default function AnimatedBook({ className = '', leaves = [], inner, base, coverTitle = 'VimAura' }: Props) {
  return (
    <div className={`book-scene ${className}`} aria-hidden="true">
      <div className="book">
        <div className="book__shadow" />
        <div className="book__base">
          <div className="book__block book__block--r">{base && <Face page={base} side="r" />}</div>
        </div>

        {leaves.map(([front, back], i) => (
          <div className="book__leaf" key={i} style={{ '--i': i, '--n': leaves.length } as React.CSSProperties}>
            <div className="book__face book__face--front">
              <Face page={front} side="r" />
            </div>
            <div className="book__face book__face--back">
              <Face page={back} side="l" />
            </div>
          </div>
        ))}

        <div className="book__lid">
          <div className="book__face book__face--front book__cover">
            <span className="book__cover-rule" />
            <span className="book__cover-title">{coverTitle}</span>
            <span className="book__cover-sub">International</span>
            <span className="book__cover-rule" />
          </div>
          <div className="book__face book__face--back book__lid-inner">
            <div className="book__block book__block--l">{inner && <Face page={inner} side="l" />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
