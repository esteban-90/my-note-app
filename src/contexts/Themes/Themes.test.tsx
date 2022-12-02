import { useTheme } from '@emotion/react'
import { getTheme, removeTheme } from '@/mocks'
import { screen, contextRender, userEvent, suggestQueries, setName } from '@/tests'
import { ThemeProvider } from './Themes'

describe(setName(ThemeProvider), () => {
  let asFragment: () => DocumentFragment

  const Child = () => {
    const { themeName, toggleTheme } = useTheme()
    return (
      <>
        <p>{themeName}</p>
        <button onClick={toggleTheme}>Change theme</button>
      </>
    )
  }

  const UI = (
    <ThemeProvider>
      <Child />
    </ThemeProvider>
  )

  beforeAll(suggestQueries)

  beforeEach(() => {
    void ({ asFragment } = contextRender(UI))
  })

  afterAll(removeTheme)

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it('should be able to provide "day" theme and save it in local storage', async () => {
    const button = screen.getByRole('button', { name: /^change theme$/i })
    await userEvent.click(button)

    const themedElement = await screen.findByText('day')
    expect(themedElement).toBeInTheDocument()

    const savedTheme = getTheme()
    expect(savedTheme).not.toBeNull()
    expect(savedTheme).not.toContain('night')
    expect(savedTheme).toContain('day')
  })

  it('should be able to provide "night" theme and save it in local storage', async () => {
    const button = screen.getByRole('button', { name: /^change theme$/i })
    await userEvent.click(button)

    const themedElement = await screen.findByText('night')
    expect(themedElement).toBeInTheDocument()

    const savedTheme = getTheme()
    expect(savedTheme).not.toBeNull()
    expect(savedTheme).not.toContain('day')
    expect(savedTheme).toContain('night')
  })
})
