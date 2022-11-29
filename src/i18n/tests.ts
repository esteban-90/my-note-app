import type { Resource } from 'i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ns, supportedLngs } from './common'

const resources: Resource = {}

for (const n of ns) {
  for (const lng of supportedLngs) {
    resources[lng] ??= {}
    resources[lng] = {
      ...resources[lng],
      [n]: await import(`../../public/translations/${lng}/${n}.json`),
    }
  }
}

i18n.use(initReactI18next).init({
  ns,
  supportedLngs,
  fallbackLng: supportedLngs[0],
  react: { useSuspense: false },
  resources,
})

export default i18n
