import { render, setName } from '@/tests'
import { Loader } from './Loader'

describe(setName(Loader), () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    void ({ asFragment } = render(<Loader />))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })
})
