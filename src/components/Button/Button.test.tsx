import { render } from '@/tests'
import { Button } from './Button'

describe(Button.name, () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    ;({ asFragment } = render(<Button icon='home' />))
  })

  it('should take a snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })
})
