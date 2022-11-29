import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import notFoundPageEN from '../../public/translations/en/not-found.json'
import noteDetailPageEN from '../../public/translations/en/note-detail.json'
import noteListPageEN from '../../public/translations/en/note-list.json'
import reloadPromptEN from '../../public/translations/en/reload-prompt.json'
import notFoundPageES from '../../public/translations/es/not-found.json'
import noteDetailPageES from '../../public/translations/es/note-detail.json'
import noteListPageES from '../../public/translations/es/note-list.json'
import reloadPromptES from '../../public/translations/es/reload-prompt.json'
import { ns, supportedLngs } from './common'

const resources = {
  [supportedLngs[0]]: {
    [ns[0]]: notFoundPageEN,
    [ns[1]]: noteDetailPageEN,
    [ns[2]]: noteListPageEN,
    [ns[3]]: reloadPromptEN,
  },
  [supportedLngs[1]]: {
    [ns[0]]: notFoundPageES,
    [ns[1]]: noteDetailPageES,
    [ns[2]]: noteListPageES,
    [ns[3]]: reloadPromptES,
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
