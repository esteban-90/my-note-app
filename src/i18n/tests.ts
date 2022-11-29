import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as translations from '@/translations'
import { ns, supportedLngs } from './common'

const resources = {
  [supportedLngs[0]]: {
    [ns[0]]: translations.notFoundPageEN,
    [ns[1]]: translations.noteDetailPageEN,
    [ns[2]]: translations.noteListPageEN,
    [ns[3]]: translations.reloadPromptEN,
  },
  [supportedLngs[1]]: {
    [ns[0]]: translations.notFoundPageES,
    [ns[1]]: translations.noteDetailPageES,
    [ns[2]]: translations.noteListPageES,
    [ns[3]]: translations.reloadPromptES,
  },
}

i18n.use(initReactI18next).init({
  ns,
  supportedLngs,
  fallbackLng: supportedLngs[0],
  react: { useSuspense: false },
  resources,
})

export default i18n
