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
      'not-found': typeof notFoundPageNS
      /**
       * Translations for Note Detail page.
       */
      'note-detail': typeof noteDetailPageNS
      /**
       * Tranlations for Note List page.
       */
      'note-list': typeof noteListPageNS
      /**
       * Tranlations for Reload Prompt component.
       */
      'reload-prompt': typeof reloadPromptNS
    }
  }
}
