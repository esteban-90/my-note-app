import type { FC, ReactElement, PropsWithChildren } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { NoteProvider, ThemeProvider, LanguageProvider } from '@/contexts'
import { GlobalStyles } from '@/styles'

const Wrapper: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <LanguageProvider>
          <NoteProvider>{children}</NoteProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  )
}

export const customRender = (UI: ReactElement, options: RenderOptions = {}) => {
  return render(UI, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
