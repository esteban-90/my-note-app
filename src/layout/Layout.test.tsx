import { screen, customRender } from '@/tests'
import { Layout } from './Layout'

describe(Layout.name, () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    ;({ asFragment } = customRender(<Layout />))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it(`should render ${Layout.name} component`, () => {
    const layoutComponent = screen.getByTestId('app-layout')
    expect(layoutComponent).toBeInTheDocument()
  })
})
