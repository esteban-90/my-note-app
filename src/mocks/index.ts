import type { Theme } from '@emotion/react'
import type { Note } from '@/types'
import uniqid from 'uniqid'

let seconds = 0

export const makeMockNote = (content: string): Note => {
  return {
    id: uniqid('note-'),
    content,
    createdAt: new Date(1995, 11, 17, 3, 24, seconds++).toISOString(),
  }
}

const makeMockNotes = (quantity: number) => {
  return new Array(quantity).fill(null).map((_, index) => makeMockNote(`Hello test ${index + 1}\nTesting ${index + 1}`))
}

export const mockNote = makeMockNote('Testing\nNote')
export const mockNotes = makeMockNotes(5)

const noteKey = 'notes'
const themeKey = 'theme'

export const getNotes = () => {
  const savedNotes = localStorage.getItem(noteKey) as string
  const parsedNotes = JSON.parse(savedNotes) as Note[]
  return parsedNotes
}

export const saveNotes = () => {
  localStorage.setItem(noteKey, JSON.stringify(mockNotes))
}

export const removeNotes = () => {
  localStorage.removeItem(noteKey)
}

export const getTheme = () => {
  const savedTheme = localStorage.getItem(themeKey) as Theme['themeName']
  return savedTheme
}

export const saveTheme = () => {
  const nightTheme: Theme['themeName'] = 'night'
  localStorage.setItem(themeKey, JSON.stringify(nightTheme))
}

export const removeTheme = () => {
  localStorage.removeItem(themeKey)
}
