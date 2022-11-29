import { customRender } from '@/tests'
import { Loader } from './Loader'

describe(Loader.name, () => {
  let asFragment: () => DocumentFragment

  beforeEach(() => {
    ;({ asFragment } = customRender(<Loader />))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })
})
