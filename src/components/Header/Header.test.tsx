import { screen, render, setName } from '@/tests'
import { Header } from './Header'

describe(setName(Header), () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    void ({ asFragment } = render(<Header />))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it(`should render ${Header.name} component`, () => {
    const headerComponent = screen.getByTestId('app-header')
    expect(headerComponent).toBeInTheDocument()
  })

  it('should display the title of the App', () => {
    const appTitle = screen.getByRole('heading', { name: /^note app$/i })
    expect(appTitle).toBeInTheDocument()
  })
})
