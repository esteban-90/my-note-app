import 'i18next'
import type notFoundPageNS from '../../public/translations/en/not-found.json'
import type noteDetailPageNS from '../../public/translations/en/note-detail.json'
import type noteListPageNS from '../../public/translations/en/note-list.json'
import type reloadPromptNS from '../../public/translations/en/reload-prompt.json'

declare module 'i18next' {
  export interface CustomTypeOptions {
    resources: {
      /**
       * Translations for Not Found page.
       */
      readonly 'not-found': typeof notFoundPageNS
      /**
       * Translations for Note Detail page.
       */
      readonly 'note-detail': typeof noteDetailPageNS
      /**
       * Translations for Note List page.
       */
      readonly 'note-list': typeof noteListPageNS
      /**
       * Translations for Reload Prompt component.
       */
      readonly 'reload-prompt': typeof reloadPromptNS
    }
  }
}
