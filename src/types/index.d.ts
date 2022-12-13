/**
 * Note to be saved in local storage.
 */
export interface Note {
  /**
   * Unique identifier for each note, is assigned automatically.
   */
  readonly id: string
  /**
   * The content that the user writes.
   */
  readonly content: string
  /**
   * The date of creation, is assigned automatically.
   */
  readonly createdAt: string
}

/**
 * Utilities for working with notes and local storage.
 */
export interface NoteUtils {
  /**
   * Array of saved notes.
   */
  readonly notes: Note[]
  /**
   * Retrieves -or not- a note based on its identifier.
   * @param id The identifier corresponding to that note or an empty string.
   * @returns The note if exists, undefined otherwise.
   */
  readonly getNote: (id: string) => Note | undefined
  /**
   * Saves a new note receiving its content from the user and assigning it an identifier and a date of creation.
   * @param content The content for the new note.
   */
  readonly addNote: (content: string) => void
  /**
   * Updates an existing note based on its identifier.
   * @param id The identifier corresponding to the note which will be updated.
   * @param content The updated content for that note.
   */
  readonly updateNote: (id: string, content: string) => void
  /**
   * Removes an existing note based on its identifier.
   * @param id The identifier corresponding to the note which will be removed.
   */
  readonly removeNote: (id: string) => void
}
