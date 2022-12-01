import type { Resource } from 'i18next'
import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ns, supportedLngs } from './app'

const resources: Resource = {}
export const i18nInstance = createInstance()

void (async () => {
  for (const n of ns) {
    for (const lng of supportedLngs) {
      resources[lng] ??= {}
      resources[lng] = {
        ...resources[lng],
        [n]: await import(`../../public/translations/${lng}/${n}.json`),
      }
    }
  }
})()

i18nInstance.use(initReactI18next).init({
  ns,
  supportedLngs,
  fallbackLng: supportedLngs[0],
  lng: supportedLngs[0],
  react: { useSuspense: false },
  resources,
})
