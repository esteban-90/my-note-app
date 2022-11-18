import { mockLanguageKey, mockENLanguage, mockESLanguage } from '@/mocks'
import { screen, render, fireEvent, configure } from '@/tests'
import { LanguageProvider, useLanguage } from './Languages'

describe(LanguageProvider.name, () => {
  let asFragment: () => DocumentFragment

  const Child = () => {
    const { language, changeLanguage } = useLanguage()
    return (
      <div role='presentation'>
        <p>{language}</p>
        <button onClick={changeLanguage}>Change language</button>
      </div>
    )
  }

  const UI = (
    <LanguageProvider>
      <Child />
    </LanguageProvider>
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

  it('should provide a specific language at a time to child elements and save it to storage', () => {
    const childElement = screen.getByText(mockENLanguage)
    expect(childElement).toBeInTheDocument()

    const savedLanguage = localStorage.getItem(mockLanguageKey)
    expect(savedLanguage).not.toBeNull()
    expect(savedLanguage).not.toContain(mockESLanguage)
    expect(savedLanguage).toContain(mockENLanguage)
  })

  it('should be able to change language and save it to storage with the new value', () => {
    const buttonElement = screen.getByRole('button', { name: /^change language/i })
    fireEvent.click(buttonElement)

    const childElement = screen.getByText(mockESLanguage)
    expect(childElement).toBeInTheDocument()

    const savedLanguage = localStorage.getItem(mockLanguageKey)
    expect(savedLanguage).not.toBeNull()
    expect(savedLanguage).not.toContain(mockENLanguage)
    expect(savedLanguage).toContain(mockESLanguage)

    localStorage.removeItem(mockLanguageKey)
  })
})
