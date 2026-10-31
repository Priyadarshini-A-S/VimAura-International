import LanguageProgram, { type Level } from './LanguageProgram'
import JapanScene from './illustrations/JapanScene'

// JLPT levels, beginner to advanced
const LEVELS: Level[] = [
  { code: 'N5', title: 'Build your foundation', text: 'Read hiragana, katakana and basic kanji, and understand simple everyday phrases.' },
  { code: 'N4', title: 'Develop your confidence', text: 'Follow everyday conversations spoken slowly and read texts on familiar topics.' },
  { code: 'N3', title: 'Communicate in daily life', text: 'Understand Japanese used in everyday situations and take part in natural conversation.' },
  { code: 'N2', title: 'Speak with fluency', text: 'Follow news, articles and conversations at natural speed across a variety of settings.' },
  { code: 'N1', title: 'Master the language', text: 'Understand Japanese used in a wide range of circumstances, including complex and abstract topics.' },
]

export default function JapaneseSection() {
  return (
    <LanguageProgram
      id="japanese"
      eyebrow="05 — Japanese program"
      native="日本語"
      lang="ja"
      language="Japanese"
      greeting="こんにちは"
      theme="burgundy"
      caption="富士山 · Mount Fuji"
      vocab={['こんにちは', 'ようこそ', '言葉', 'ありがとう', '旅', '友情', '未来', 'さようなら']}
      levels={LEVELS}
      art={
        <div className="lp-poster__frame">
          <JapanScene className="lp-poster__scene" />
        </div>
      }
    />
  )
}
