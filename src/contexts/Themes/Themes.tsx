import type { FC, PropsWithChildren } from 'react'
import type { Theme } from '@emotion/react'
import { ThemeProvider as Provider } from '@emotion/react'
import useLocalStorage from 'use-local-storage'
import { Themes } from '@/styles'

const defaultValue: Theme['themeName'] = matchMedia('prefers-color-scheme: dark').matches ? 'night' : 'day'

/**
 * Component for providing theme to app.
 * @returns The provider.
 */

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [savedTheme, setSavedTheme] = useLocalStorage('theme', defaultValue)
  const currentTheme = Themes[savedTheme]

  const toggleTheme = () => {
    setSavedTheme((previousTheme) => (previousTheme === 'night' ? 'day' : 'night'))
  }

  const value: Theme = {
    themeName: currentTheme.themeName,
    colorPalette: currentTheme.colorPalette,
    toggleTheme,
  }

  return <Provider theme={value}>{children}</Provider>
}
