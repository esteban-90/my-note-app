import React from 'react'
import type { Parameters, DecoratorFn } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { NoteProvider, ThemeProvider, LanguageProvider } from '../src/contexts'
import { mockNotes, mockNoteKey } from '../src/mocks'
import { GlobalStyles } from '../src/styles'
import '../src/icons'

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withGlobalStyles: DecoratorFn = (Story) => {
  return (
    <>
      <GlobalStyles />
      <Story />
    </>
  )
}

const withThemeProvider: DecoratorFn = (Story) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  )
}

const withLanguageProvider: DecoratorFn = (Story) => {
  return (
    <LanguageProvider>
      <Story />
    </LanguageProvider>
  )
}

const withNoteProvider: DecoratorFn = (Story) => {
  localStorage.setItem(mockNoteKey, JSON.stringify(mockNotes))
  return (
    <NoteProvider>
      <Story />
    </NoteProvider>
  )
}

export const decorators: DecoratorFn[] = [
  withRouter,
  withGlobalStyles,
  withThemeProvider,
  withLanguageProvider,
  withNoteProvider,
]
