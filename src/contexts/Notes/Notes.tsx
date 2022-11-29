import type { FC, PropsWithChildren } from 'react'
import type { Note, NoteUtils } from '@/types'
import { createContext, useContext } from 'react'
import useLocalStorage from 'use-local-storage'
import uniqid from 'uniqid'

const defaultValue: NoteUtils = {
  notes: [],
  getNote: () => undefined,
  addNote: () => undefined,
  updateNote: () => undefined,
  removeNote: () => undefined,
}

/**
 * Note context
 */

const context = createContext(defaultValue)

/**
 * Component for providing notes to children
 * @returns The provider
 */

export const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notes, setNotes] = useLocalStorage('notes', defaultValue.notes)

  const getNote = (id: string) => {
    const note = notes.find((note) => note.id === id)
    return note
  }

  const addNote = (content: string) => {
    const newNote: Note = { id: uniqid('note-'), content, createdAt: new Date().toISOString() }
    const newNotes = notes.concat(newNote)
    setNotes(newNotes)
  }

  const updateNote = (id: string, content: string) => {
    const newNotes = notes.map((note) => (note.id === id ? { ...note, content } : note))
    setNotes(newNotes)
  }

  const removeNote = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }

  const { Provider } = context
  const value: NoteUtils = { notes, getNote, addNote, updateNote, removeNote }

  return <Provider value={value}>{children}</Provider>
}

/**
 * Custom hook for consumer components to use
 * @returns Utilities for working with notes
 */

export const useNotes = () => useContext(context)
