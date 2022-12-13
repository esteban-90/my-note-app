import type { FC, ReactElement, PropsWithChildren } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render, configure } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { i18nInstance } from '@/i18n/tests'
import { NoteProvider, ThemeProvider } from '@/contexts'
import { GlobalStyles } from '@/styles'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <NoteProvider>
          <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
        </NoteProvider>
      </ThemeProvider>
    </>
  )
}

const customRender = (UI: ReactElement, options: RenderOptions = {}) => {
  return render(UI, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { customRender as render, render as contextRender }
export { default as userEvent } from '@testing-library/user-event'

const { changeLanguage } = i18nInstance

/**
 * Changes the language of the app to English.
 */
export const switchToEN = async () => await changeLanguage('en')

/**
 * Changes the language of the app to Spanish.
 */
export const switchToES = async () => await changeLanguage('es')

/**
 * Suggests better queries for tests.
 */
export const suggestQueries = () => configure({ throwSuggestions: true })

/**
 * Formats the name of a function in order to make it more readable during tests.
 * @param fn The function.
 * @returns The name formatted.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const setName = (fn: Function) => `${fn.name.replace(/(\w)([A-Z])/g, '$1 $2').toUpperCase()}:`
