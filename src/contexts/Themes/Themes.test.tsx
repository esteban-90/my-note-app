import { useTheme } from '@emotion/react'
import { getTheme, removeTheme } from '@/mocks'
import { screen, render, userEvent, configure } from '@/tests'
import { ThemeProvider } from './Themes'

describe(ThemeProvider.name, () => {
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

  beforeAll(() => {
    configure({ throwSuggestions: true })
  })

  beforeEach(() => {
    ;({ asFragment } = render(UI))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it('should provide a specific theme at a time to child elements and save it to storage', () => {
    const themedElement = screen.getByText('night')
    expect(themedElement).toBeInTheDocument()

    const savedTheme = getTheme()
    expect(savedTheme).not.toBeNull()
    expect(savedTheme).not.toContain('day')
    expect(savedTheme).toContain('night')
  })

  it('should be able to change theme and save it to storage with the new value', async () => {
    const button = screen.getByRole('button', { name: /^change theme$/i })
    await userEvent.click(button)

    const themedElement = await screen.findByText('day')
    expect(themedElement).toBeInTheDocument()

    const savedTheme = getTheme()
    expect(savedTheme).not.toBeNull()
    expect(savedTheme).not.toContain('night')
    expect(savedTheme).toContain('day')

    removeTheme()
  })
})
