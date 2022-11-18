import type { FC, PropsWithChildren } from 'react'
import type { Note, NoteUtils } from '@/types'
import { createContext, useContext } from 'react'
import useLocalStorage from 'use-local-storage'
import uniqid from 'uniqid'
import { makeKey } from '@/helpers'

const defaultValues: NoteUtils = {
  notes: [],
  getNote: () => undefined,
  addNote: () => undefined,
  updateNote: () => undefined,
  removeNote: () => undefined,
}

const context = createContext<NoteUtils>(defaultValues)

export const NoteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notes, setNotes] = useLocalStorage<Note[]>(makeKey('notes'), defaultValues.notes)

  const getNote = (id: string) => {
    const note: Note | undefined = notes.find((note) => note.id === id)
    return note
  }

  const addNote = (content: string) => {
    const newNote: Note = { id: uniqid('note-'), content, createdAt: new Date().toISOString() }
    const newNotes: Note[] = notes.concat(newNote)
    setNotes(newNotes)
  }

  const updateNote = (id: string, content: string) => {
    const newNotes: Note[] = notes.map((note) => (note.id === id ? { ...note, content } : note))
    setNotes(newNotes)
  }

  const removeNote = (id: string) => {
    const newNotes: Note[] = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }

  const { Provider } = context
  const utils: NoteUtils = { notes, getNote, addNote, updateNote, removeNote }

  return <Provider value={utils}>{children}</Provider>
}

export const useNotes = () => useContext<NoteUtils>(context)
