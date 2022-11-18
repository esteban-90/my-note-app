import type { FC, PropsWithChildren } from 'react'
import type { Theme, ThemeUtils } from '@/types'
import { createContext, useContext } from 'react'
import useLocalStorage from 'use-local-storage'
import { makeKey } from '@/helpers'

const defaultValues: ThemeUtils = {
  theme: matchMedia('prefers-color-scheme: dark').matches ? 'night' : 'day',
  changeTheme: () => undefined,
}

const context = createContext<ThemeUtils>(defaultValues)

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>(makeKey('theme'), defaultValues.theme)

  const changeTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'night' ? 'day' : 'night'))
  }

  const { Provider } = context
  const utils: ThemeUtils = { theme, changeTheme }

  return <Provider value={utils}>{children}</Provider>
}

export const useTheme = () => useContext<ThemeUtils>(context)
