import type { Parameters, DecoratorFn } from '@storybook/react'
import React from 'react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { NoteProvider, ThemeProvider } from '../src/contexts'
import { i18nInstance } from '../src/i18n/tests'
import { Layout } from '../src/layout'
import { saveNotes } from '../src/mocks'
import { GlobalStyles } from '../src/styles'
import '../src/icons'

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

export const decorators = [withGlobalStyles, withThemeProvider, withNoteProvider, withRouter]

export const parameters: Parameters = {
  i18n: i18nInstance,
  locales: {
    en: 'English',
    es: 'Español',
  },
  layout: 'fullscreen',
}
