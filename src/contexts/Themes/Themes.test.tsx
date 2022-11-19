import { mockThemeKey, mockNightTheme, mockDayTheme } from '@/mocks'
import { screen, render, userEvent, configure } from '@/tests'
import { ThemeProvider, useTheme } from './Themes'

describe(ThemeProvider.name, () => {
  let asFragment: () => DocumentFragment

  const Child = () => {
    const { theme, changeTheme } = useTheme()
    return (
      <div className={theme} role='presentation'>
        <button onClick={changeTheme}>Change theme</button>
      </div>
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
    const themedElement = screen.getByRole('presentation')
    expect(themedElement).toHaveClass(mockNightTheme)
    expect(themedElement).not.toHaveClass(mockDayTheme)

    const savedTheme = localStorage.getItem(mockThemeKey)
    expect(savedTheme).not.toBeNull()
    expect(savedTheme).not.toContain(mockDayTheme)
    expect(savedTheme).toContain(mockNightTheme)
  })

  it('should be able to change theme and save it to storage with the new value', async () => {
    const button = screen.getByRole('button', { name: /^change theme$/i })
    await userEvent.click(button)

    const themedElement = await screen.findByRole('presentation')
    expect(themedElement).not.toHaveClass(mockNightTheme)
    expect(themedElement).toHaveClass(mockDayTheme)

    const savedTheme = localStorage.getItem(mockThemeKey)
    expect(savedTheme).not.toBeNull()
    expect(savedTheme).not.toContain(mockNightTheme)
    expect(savedTheme).toContain(mockDayTheme)

    localStorage.removeItem(mockThemeKey)
  })
})
