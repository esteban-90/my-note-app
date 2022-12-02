import { render, setName } from '@/tests'
import { Button } from './Button'

describe(setName(Button), () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    void ({ asFragment } = render(<Button icon='home' />))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })
})
