import type { FC, PropsWithChildren } from 'react'
import type { Language, LanguageUtils } from '@/types'
import { createContext, useContext } from 'react'
import useLocalStorage from 'use-local-storage'
import { IntlProvider } from 'react-intl'
import { makeKey } from '@/helpers'
import { translationEN_US, translationES_PY } from '@/translations'

const defaultValues: LanguageUtils = {
  language: navigator.language as Language,
  changeLanguage: () => undefined,
}

const context = createContext<LanguageUtils>(defaultValues)

export const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
  const defaultLanguage = defaultValues.language
  const [language, setLanguage] = useLocalStorage<Language>(makeKey('language'), defaultLanguage)

  const changeLanguage = () => {
    setLanguage((previousLanguage) => (previousLanguage === 'en-US' ? 'es-PY' : 'en-US'))
  }

  const { Provider } = context
  const utils: LanguageUtils = { language, changeLanguage }
  const messages = { 'en-US': translationEN_US, 'es-PY': translationES_PY }

  return (
    <Provider value={utils}>
      <IntlProvider locale={language} defaultLocale={defaultLanguage} messages={messages[language]}>
        {children}
      </IntlProvider>
    </Provider>
  )
}

export const useLanguage = () => useContext<LanguageUtils>(context)
