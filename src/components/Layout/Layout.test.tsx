import { screen, render } from '@/tests'
import { Layout } from './Layout'

describe(Layout.name, () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    ;({ asFragment } = render(<Layout />))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it(`should render ${Layout.name} component`, () => {
    const layoutComponent = screen.getByTestId('app-layout')
    expect(layoutComponent).toBeInTheDocument()
  })
})
