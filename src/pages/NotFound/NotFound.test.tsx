import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { screen, render, configure } from '@/tests'
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

  beforeEach(() => {
    ;({ asFragment } = render(UI))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the title', () => {
    const notFoundHeading = screen.getByRole('heading', { name: /^page not found$/i })
    expect(notFoundHeading).toBeInTheDocument()
  })

  it('should render a link to home page', () => {
    const homeLink = screen.getByRole('link', { name: /^back to home$/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
