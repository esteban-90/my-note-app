import { screen, render, setName } from '@/tests'
import { Layout } from './Layout'

describe(setName(Layout), () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    void ({ asFragment } = render(<Layout />))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it(`should render ${Layout.name} component`, () => {
    const layoutComponent = screen.getByTestId('app-layout')
    expect(layoutComponent).toBeInTheDocument()
  })
})
