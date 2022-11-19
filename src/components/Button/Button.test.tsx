import { render } from '@/tests'
import { Button } from './Button'

describe(Button.name, () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    ;({ asFragment } = render(<Button icon='home' />))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })
})
