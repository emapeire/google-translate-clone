import { type FromLanguage, type Language } from '../types.d'
import { SUPPORTED_LANGUAGES } from '../constants'
import { port } from '../constants/index'

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const fromText =
    fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toText = SUPPORTED_LANGUAGES[toLanguage]

  try {
    const response = await fetch(`http://localhost:${port}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromLanguage: fromText,
        toLanguage: toText,
        text
      })
    })

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }

    const translation = await response.json()
    return translation
  } catch (error) {
    console.error(error)
    throw error
  }
}
