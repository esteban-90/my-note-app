/**
 * Note object to be saved to storage
 */
export type Note = {
  /** Unique identifier */
  id: string
  /** Content of the note */
  content: string
  /** Date of creation */
  createdAt: string
}

/**
 * Utilities for notes
 */
export type NoteUtils = {
  /** Array of saved notes */
  notes: Note[]
  /** Gets a note from storage */
  getNote: (id: string) => Note | undefined
  /** Saves a note in storage */
  addNote: (content: string) => void
  /** Updates a previously saved note */
  updateNote: (id: string, content: string) => void
  /** Removes a note from storage */
  removeNote: (id: string) => void
}

/**
 * Theme string to be saved to storage
 */
export type Theme = 'night' | 'day'

/**
 * Utilities for themes
 */
export type ThemeUtils = {
  /** Saved theme as string */
  theme: Theme
  /** Changes the theme and saves it in storage */
  changeTheme: () => void
}

/**
 * Language string to be saved to storage
 */
export type Language = 'en-US' | 'es-PY'

/**
 * Utilities for languages
 */
export type LanguageUtils = {
  language: Language
  changeLanguage: () => void
}
