import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import HttpApiBackend from 'i18next-http-backend'

export const ns = ['not-found', 'note-detail', 'note-list', 'reload-prompt']
export const supportedLngs = ['en', 'es']

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ns,
    supportedLngs,
    fallbackLng: supportedLngs[0],
    backend: {
      backends: [LocalStorageBackend, HttpApiBackend],
      backendOptions: [
        { expirationTime: 14 * 24 * 60 ** 2 * 1_000 },
        { loadPath: '/translations/{{lng}}/{{ns}}.json' },
      ],
    },
  })
