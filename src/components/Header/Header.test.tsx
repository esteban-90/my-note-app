import { screen, render } from '@/tests'
import { Header } from './Header'

describe(Header.name, () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    ;({ asFragment } = render(<Header />))
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
