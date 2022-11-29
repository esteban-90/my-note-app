import React from 'react'
import type { Parameters, DecoratorFn } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import i18n from './i18next'
import { NoteProvider, ThemeProvider } from '../src/contexts'
import { Layout } from '../src/layout'
import { saveNotes } from '../src/mocks'
import { GlobalStyles } from '../src/styles'
import '../src/icons'

export const parameters: Parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    es: 'Español',
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
      <Layout>
        <Story />
      </Layout>
    </ThemeProvider>
  )
}

const withNoteProvider: DecoratorFn = (Story) => {
  saveNotes()
  return (
    <NoteProvider>
      <Story />
    </NoteProvider>
  )
}

export const decorators: DecoratorFn[] = [withGlobalStyles, withThemeProvider, withNoteProvider, withRouter]
