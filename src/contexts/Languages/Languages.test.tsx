import { mockLanguageKey, mockENLanguage, mockESLanguage } from '@/mocks'
import { screen, render, userEvent, configure } from '@/tests'
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
    const providedLanguage = screen.getByText(mockENLanguage)
    expect(providedLanguage).toBeInTheDocument()

    const savedLanguage = localStorage.getItem(mockLanguageKey)
    expect(savedLanguage).not.toBeNull()
    expect(savedLanguage).not.toContain(mockESLanguage)
    expect(savedLanguage).toContain(mockENLanguage)
  })

  it('should be able to change language and save it to storage with the new value', async () => {
    const button = screen.getByRole('button', { name: /^change language$/i })
    await userEvent.click(button)

    const providedLanguage = await screen.findByText(mockESLanguage)
    expect(providedLanguage).toBeInTheDocument()

    const savedLanguage = localStorage.getItem(mockLanguageKey)
    expect(savedLanguage).not.toBeNull()
    expect(savedLanguage).not.toContain(mockENLanguage)
    expect(savedLanguage).toContain(mockESLanguage)

    localStorage.removeItem(mockLanguageKey)
  })
})
