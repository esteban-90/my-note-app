import type { FC, ReactElement, PropsWithChildren } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import testConfig from '@/i18n/tests'
import { NoteProvider, ThemeProvider } from '@/contexts'
import { GlobalStyles } from '@/styles'

const Wrapper: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <NoteProvider>
          <I18nextProvider i18n={testConfig}>{children}</I18nextProvider>
        </NoteProvider>
      </ThemeProvider>
    </>
  )
}

export const customRender = (UI: ReactElement, options: RenderOptions = {}) => {
  return render(UI, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
