import LanguageProgram, { type Level } from './LanguageProgram'
import FranceScene from './illustrations/FranceScene'

const LEVELS: Level[] = [
  { code: 'A1', title: 'Build your foundation', text: 'Learn essential vocabulary, basic grammar, and everyday expressions.' },
  { code: 'A2', title: 'Develop your confidence', text: 'Improve conversational ability and handle common real-life situations.' },
  { code: 'B1', title: 'Communicate independently', text: 'Develop greater fluency and express yourself across familiar everyday topics.' },
  { code: 'B2', title: 'Speak with fluency', text: 'Discuss a wide range of topics with ease and understand more complex texts.' },
  { code: 'C1', title: 'Master the language', text: 'Express yourself flexibly and precisely in social, academic and professional settings.' },
]

export default function FrenchSection() {
  return (
    <LanguageProgram
      id="french"
      eyebrow="06 — French program"
      native="Français"
      lang="fr"
      language="French"
      greeting="Bonjour"
      theme="paper"
      caption="La tour Eiffel · Paris"
      vocab={['Bonjour', 'Bienvenue', 'La langue', 'Merci beaucoup', 'Le voyage', "L'amitié", "L'avenir", 'Au revoir']}
      levels={LEVELS}
      art={
        <div className="lp-poster__frame">
          <FranceScene className="lp-poster__scene" />
        </div>
      }
    />
  )
}
