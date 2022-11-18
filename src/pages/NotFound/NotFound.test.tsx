import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { mockLanguageKey, mockESLanguage } from '@/mocks'
import { screen, customRender, configure } from '@/tests'
import { NotFound } from './NotFound'

describe(NotFound.name, () => {
  let asFragment: () => DocumentFragment

  const UI = (
    <MemoryRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  )

  beforeAll(() => {
    configure({ throwSuggestions: true })
  })

  describe('when the language set is the one that comes by default (English):', () => {
    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    it('there should be a title with value of "Page not Found"', () => {
      const notFoundHeading = screen.getByRole('heading', { name: /^page not found/i })
      expect(notFoundHeading).toBeInTheDocument()
    })

    it('there should be a link with title "Back to home", which should be able to redirect to Home page', () => {
      const homeLink = screen.getByRole('link', { name: /^back to home/i })
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute('href', '/')
    })
  })

  describe('when the language set is Spanish:', () => {
    beforeAll(() => {
      localStorage.setItem(mockLanguageKey, JSON.stringify(mockESLanguage))
    })

    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    afterAll(() => {
      localStorage.removeItem(mockLanguageKey)
    })

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    it('there should be a title with value of "Página no encontrada"', () => {
      const notFoundHeading = screen.getByRole('heading', { name: /^página no encontrada$/i })
      expect(notFoundHeading).toBeInTheDocument()
    })

    it('there should be a link with title "Volver a inicio", which should be able to redirect to Home page', () => {
      const homeLink = screen.getByRole('link', { name: /^volver a inicio/i })
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute('href', '/')
    })
  })
})
