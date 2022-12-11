import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { screen, render, suggestQueries, switchToEN, switchToES, setName } from '@/tests'
import { NotFound } from './NotFound'

describe(setName(NotFound), () => {
  let asFragment: () => DocumentFragment

  const renderUI = () => {
    const UI = (
      <MemoryRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    )

    void ({ asFragment } = render(UI))
  }

  const matchSnapshot = () => {
    expect(asFragment()).toMatchSnapshot()
  }

  beforeAll(suggestQueries)

  describe('when the language set is English:', () => {
    beforeAll(switchToEN)
    beforeEach(renderUI)

    it('should match snapshot', matchSnapshot)

    it('should display a title with value of "Page not found"', () => {
      const notFoundHeading = screen.getByRole('heading', { name: /^page not found$/i })
      expect(notFoundHeading).toBeInTheDocument()
    })

    it('should render a link with title of "Back"', () => {
      const backLink = screen.getByRole('button', { name: /^back$/i })
      expect(backLink).toBeInTheDocument()
    })
  })

  describe('when the language set is Spanish:', () => {
    beforeAll(switchToES)
    beforeEach(renderUI)

    it('should match snapshot', matchSnapshot)

    it('should display a title with value of "Página no encontrada"', () => {
      const notFoundHeading = screen.getByRole('heading', { name: /^página no encontrada$/i })
      expect(notFoundHeading).toBeInTheDocument()
    })

    it('should render a link with title of "Atrás"', () => {
      const backLink = screen.getByRole('button', { name: /^atrás$/i })
      expect(backLink).toBeInTheDocument()
    })
  })
})
