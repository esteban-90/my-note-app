import type { Note, Language, Theme } from '@/types'
import uniqid from 'uniqid'
import { makeKey } from '@/helpers'

let seconds = 0

export const makeMockNote = (content: string): Note => {
  return {
    id: uniqid('note-'),
    content,
    createdAt: new Date(1995, 11, 17, 3, 24, seconds++).toISOString(),
  }
}

const makeMockNotes = (quantity = 1): Note[] => {
  return new Array(quantity).fill(null).map((_, index) => makeMockNote(`Hello test ${index + 1}\nTesting ${index + 1}`))
}

export const mockNotes = makeMockNotes(5)

export const mockNoteKey = makeKey('notes')
export const mockLanguageKey = makeKey('language')
export const mockThemeKey = makeKey('theme')

export const mockENLanguage: Language = 'en-US'
export const mockESLanguage: Language = 'es-PY'

export const mockDayTheme: Theme = 'day'
export const mockNightTheme: Theme = 'night'

export const formatMockDate = (date: string, locale: Language = 'en-US') => {
  return new Date(date).toLocaleString(locale, { dateStyle: 'long', timeStyle: 'medium' })
}
