import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { getTitle, getDate, getBody } from '@/helpers'
import { mockNotes, saveNotes, removeNotes, saveTheme, removeTheme } from '@/mocks'
import { screen, customRender, userEvent, configure } from '@/tests'
import { NoteList } from './NoteList'

describe(NoteList.name, () => {
  let asFragment: () => DocumentFragment

  const UI = (
    <MemoryRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<NoteList />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )

  beforeAll(() => {
    configure({ throwSuggestions: true })
  })

  describe('when there are no notes:', () => {
    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    it('there should be a counter with value of "0"', () => {
      const counter = screen.getByText(/^0$/)
      expect(counter).toBeInTheDocument()
    })
  })

  describe('when there are more than zero notes:', () => {
    const counterValue = mockNotes.length

    beforeAll(saveNotes)

    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    afterAll(removeNotes)

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    it('they should be rendered', () => {
      mockNotes.forEach(({ content, createdAt }) => {
        const noteTitle = getTitle(content)
        const noteTitleElement = screen.getByRole('heading', { name: new RegExp(noteTitle, 'i') })
        expect(noteTitleElement).toBeInTheDocument()

        const noteDate = getDate(createdAt)
        const noteDateElement = screen.getByText(noteDate)
        expect(noteDateElement).toBeInTheDocument()

        const noteBody = getBody(content)
        const noteBodyElement = screen.getByText(noteBody, { trim: false })
        expect(noteBodyElement).toBeInTheDocument()
      })
    })

    it('each of them should be able to redirect to its detail page', () => {
      mockNotes.forEach(({ id, content }) => {
        const noteTitle = getTitle(content)
        const noteItemElement = screen.getByRole('link', { name: new RegExp(noteTitle, 'i') })
        expect(noteItemElement).toHaveAttribute('href', `/notes/${id}`)
      })
    })

    it(`there should be a counter with value of "${counterValue}"`, () => {
      const counter = screen.getByText(counterValue)
      expect(counter).not.toHaveTextContent('0')
      expect(counter).toBeInTheDocument()
    })
  })

  describe('when the language set is the one that comes by default (English):', () => {
    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    it('there should be a title with value of "My notes"', () => {
      const noteListHeading = screen.getByRole('heading', { name: /^my notes$/i })
      expect(noteListHeading).toBeInTheDocument()
    })

    describe('there should be a button with title of:', () => {
      it('"Change language"', () => {
        const changeLanguageButton = screen.getByRole('button', { name: /^change language$/i })
        expect(changeLanguageButton).toBeInTheDocument()
      })

      it('"New note", which should be able to redirect to note detail page if no id', () => {
        const addNoteButton = screen.getByRole('button', { name: /^new note$/i })
        expect(addNoteButton).toBeInTheDocument()
        expect(addNoteButton).toHaveAttribute('href', '/notes')
      })

      describe('and an additional one with title of:', () => {
        it('"Day mode" if the current theme mode is "night"', () => {
          const dayThemeButton = screen.getByRole('button', { name: /^day mode$/i })
          expect(dayThemeButton).toBeInTheDocument()
        })

        it('"Night mode" otherwise', async () => {
          const dayThemeButton = screen.getByRole('button', { name: /^day mode$/i })
          await userEvent.click(dayThemeButton)

          const nightThemeButton = await screen.findByRole('button', { name: /^night mode$/i })
          expect(nightThemeButton).toBeInTheDocument()
        })
      })
    })
  })

  describe('when the language is changed to Spanish:', () => {
    beforeAll(saveTheme)

    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    afterAll(removeTheme)

    it('should match snapshot', async () => {
      const changeLanguageButton = screen.getByRole('button', { name: /change language/i })
      await userEvent.click(changeLanguageButton)

      expect(asFragment()).toMatchSnapshot()
    })

    it('there should be a title with value of "Mis notas"', () => {
      const noteListHeading = screen.getByRole('heading', { name: /^mis notas$/i })
      expect(noteListHeading).toBeInTheDocument()
    })

    describe('there should be a button with title of:', () => {
      it('"Cambiar idioma"', () => {
        const changeLanguageButton = screen.getByRole('button', { name: /^cambiar idioma$/i })
        expect(changeLanguageButton).toBeInTheDocument()
      })

      it('"Nueva nota", which should be able to redirect to note detail page if no id', () => {
        const addNoteButton = screen.getByRole('button', { name: /^nueva nota$/i })
        expect(addNoteButton).toBeInTheDocument()
        expect(addNoteButton).toHaveAttribute('href', '/notes')
      })

      describe('and an additional one with title of:', () => {
        it('"Modo día" if the current theme mode is "night"', () => {
          const dayThemeButton = screen.getByRole('button', { name: /^modo día$/i })
          expect(dayThemeButton).toBeInTheDocument()
        })

        it('"Modo noche" otherwise', async () => {
          const dayThemeButton = screen.getByRole('button', { name: /^modo día$/i })
          await userEvent.click(dayThemeButton)

          const nightThemeButton = await screen.findByRole('button', { name: /^modo noche$/i })
          expect(nightThemeButton).toBeInTheDocument()
        })
      })
    })
  })
})
