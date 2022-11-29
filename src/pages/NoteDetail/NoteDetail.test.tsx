import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { mockNotes, getNotes, saveNotes, removeNotes } from '@/mocks'
import { screen, customRender, userEvent, configure } from '@/tests'
import { NoteDetail } from './NoteDetail'

describe(NoteDetail.name, () => {
  let asFragment: () => DocumentFragment
  let UI: JSX.Element

  beforeAll(() => {
    configure({ throwSuggestions: true })
  })

  describe('if url param is not a valid id:', () => {
    beforeAll(() => {
      UI = (
        <MemoryRouter initialEntries={['/notes/test']}>
          <Routes>
            <Route path='notes'>
              <Route path=':id' element={<NoteDetail />} />
            </Route>
          </Routes>
        </MemoryRouter>
      )
    })

    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    it('should render Not Found page', () => {
      const notFoundHeading = screen.getByRole('heading', { name: /^page not found$/i })
      expect(notFoundHeading).toBeInTheDocument()
    })
  })

  describe("if url param is a valid id but the note associated with it doesn't exist:", () => {
    beforeAll(() => {
      UI = (
        <MemoryRouter initialEntries={['/notes/note-la9l6ikp']}>
          <Routes>
            <Route path='notes'>
              <Route path=':id' element={<NoteDetail />} />
            </Route>
          </Routes>
        </MemoryRouter>
      )
    })

    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    it('should render Not Found page', () => {
      const notFoundHeading = screen.getByRole('heading', { name: /^page not found$/i })
      expect(notFoundHeading).toBeInTheDocument()
    })
  })

  describe('creation of a new note:', () => {
    beforeAll(() => {
      UI = (
        <MemoryRouter initialEntries={['/notes']}>
          <Routes>
            <Route path='notes'>
              <Route index element={<NoteDetail />} />
            </Route>
          </Routes>
        </MemoryRouter>
      )
    })

    beforeEach(() => {
      ;({ asFragment } = customRender(UI))
    })

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    describe('should render a link with title of:', () => {
      it('"Back to home"', () => {
        const homeLink = screen.getByText(/^back to home$/i)
        expect(homeLink).toBeInTheDocument()
      })

      it('"Add note"', () => {
        const addLink = screen.getByText(/^add note$/i)
        expect(addLink).toBeInTheDocument()
      })
    })

    it('at first, there is no content', () => {
      const textBox = screen.getByRole('textbox')
      expect(textBox).toBeInTheDocument()
      expect(textBox).toHaveValue('')
      expect(textBox).toHaveFocus()
    })

    it("should succeed if the user doesn't write bad words and add link is clicked", async () => {
      const goodNoteContent = 'Testing title\nTesting body'

      const textBox = screen.getByRole('textbox')
      await userEvent.type(textBox, goodNoteContent)

      const addLink = screen.getByText(/^add note$/i)
      await userEvent.click(addLink)

      const addAlert = await screen.findByText(/^add note\?$/i)
      expect(addAlert).toBeInTheDocument()

      const confirmButton = await screen.findByText(/^yes$/i)
      await userEvent.click(confirmButton)

      expect(navigator.vibrate).toHaveBeenCalled()

      const [{ content }] = getNotes()
      expect(content).toBe(goodNoteContent)

      removeNotes()
    })

    it("should succeed if the user doesn't write bad words and go back link is clicked", async () => {
      const goodNoteContent = 'Testing title\nTesting body'

      const textBox = screen.getByRole('textbox')
      await userEvent.type(textBox, goodNoteContent)

      const homeLink = screen.getByText(/^back to home$/i)
      await userEvent.click(homeLink)

      const addAlert = await screen.findByText(/^add note\?$/i)
      expect(addAlert).toBeInTheDocument()

      const confirmButton = await screen.findByText(/^yes$/i)
      await userEvent.click(confirmButton)

      expect(navigator.vibrate).toHaveBeenCalled()

      const [{ content }] = getNotes()
      expect(content).toBe(goodNoteContent)

      removeNotes()
    })

    it('should fail if the user writes bad words', async () => {
      const badNoteContent = 'Fucking title\nShit'

      const textBox = screen.getByRole('textbox')
      await userEvent.type(textBox, badNoteContent)

      const addLink = screen.getByText(/^add note$/i)
      await userEvent.click(addLink)

      const profanityWarn = await screen.findByText(/^profanity is not allowed!$/i)
      expect(profanityWarn).toBeInTheDocument()

      const profanityConfirm = await screen.findByText(/^ok$/i)
      await userEvent.click(profanityConfirm)

      expect(navigator.vibrate).toHaveBeenCalled()

      const notes = getNotes()
      expect(notes.find(({ content }) => content === badNoteContent)).toBeUndefined()
    })

    it("should fail if there's no content and add note link is clicked", async () => {
      const textBox = screen.getByRole('textbox')
      expect(textBox).toHaveValue('')
      expect(textBox).toHaveFocus()

      const addLink = screen.getByText(/^add note$/i)
      await userEvent.click(addLink)

      const notes = getNotes()
      expect(notes).toHaveLength(0)
    })

    it("should fail if there's already content but cancel button is clicked", async () => {
      const textBox = screen.getByRole('textbox')
      await userEvent.type(textBox, 'hello')

      const addLink = screen.getByText(/^add note$/i)
      await userEvent.click(addLink)

      const addAlert = await screen.findByText(/^add note\?$/i)
      expect(addAlert).toBeInTheDocument()

      const cancelButton = await screen.findByText(/^no$/i)
      await userEvent.click(cancelButton)

      const notes = getNotes()
      expect(notes).toHaveLength(0)
    })
  })

  describe('edition of an existing note:', () => {
    const [{ id: idToEdit, content: contentToEdit }] = mockNotes

    beforeAll(() => {
      UI = (
        <MemoryRouter initialEntries={[`/notes/${idToEdit}`]}>
          <Routes>
            <Route path='notes'>
              <Route path=':id' element={<NoteDetail />} />
            </Route>
          </Routes>
        </MemoryRouter>
      )
    })

    beforeEach(() => {
      saveNotes()
      ;({ asFragment } = customRender(UI))
    })

    afterEach(removeNotes)

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    describe('should render a link with title of:', () => {
      it('"Back to home"', () => {
        const homeLink = screen.getByText(/^back to home$/i)
        expect(homeLink).toBeInTheDocument()
      })

      it('"Remove note"', () => {
        const removeLink = screen.getByText(/^remove note$/i)
        expect(removeLink).toBeInTheDocument()
      })
    })

    it('at first, the content should appear', () => {
      const textBox = screen.getByRole('textbox')
      expect(textBox).toBeInTheDocument()
      expect(textBox).toHaveValue(contentToEdit)
      expect(textBox).not.toHaveFocus()
    })

    it("should succeed if the user doesn't write bad words", async () => {
      const goodNoteContent = ' nice'

      const textBox = screen.getByRole('textbox')
      await userEvent.type(textBox, goodNoteContent)

      const homeLink = screen.getByText(/^back to home$/i)
      await userEvent.click(homeLink)

      const updateAlert = await screen.findByText(/^update note\?$/i)
      expect(updateAlert).toBeInTheDocument()

      const confirmButton = await screen.findByText(/^yes$/i)
      await userEvent.click(confirmButton)

      expect(navigator.vibrate).toHaveBeenCalled()

      const [{ content }] = getNotes()
      expect(content).toBe(contentToEdit + goodNoteContent)
    })

    it('should fail if the previous content is the same as the user has typed', async () => {
      const textBox = screen.getByRole('textbox')
      await userEvent.clear(textBox)
      await userEvent.type(textBox, contentToEdit)

      const homeLink = screen.getByText(/^back to home$/i)
      await userEvent.click(homeLink)

      const notes = getNotes()
      expect(notes.find(({ content }) => content === contentToEdit)).not.toBeUndefined()
    })

    it('should fail if the user writes bad words', async () => {
      const badNoteContent = ' fuck!'

      const textBox = screen.getByRole('textbox')
      await userEvent.type(textBox, badNoteContent)

      const homeLink = screen.getByText(/^back to home$/i)
      await userEvent.click(homeLink)

      const profanityWarn = await screen.findByText(/^profanity is not allowed!$/i)
      expect(profanityWarn).toBeInTheDocument()

      const profanityConfirm = await screen.findByText(/^ok$/i)
      await userEvent.click(profanityConfirm)

      expect(navigator.vibrate).toHaveBeenCalled()

      const notes = getNotes()
      expect(notes.find(({ content }) => content.includes(badNoteContent))).toBeUndefined()
    })
  })

  describe('deletion of a note:', () => {
    const [{ id: idToDelete }] = mockNotes

    beforeAll(() => {
      UI = (
        <MemoryRouter initialEntries={[`/notes/${idToDelete}`]}>
          <Routes>
            <Route path='notes'>
              <Route path=':id' element={<NoteDetail />} />
            </Route>
          </Routes>
        </MemoryRouter>
      )
    })

    beforeEach(() => {
      saveNotes()
      ;({ asFragment } = customRender(UI))
    })

    afterEach(removeNotes)

    it('should match snapshot', () => {
      expect(asFragment()).toMatchSnapshot()
    })

    it('should succeed if note exists', async () => {
      const removeLink = screen.getByText(/^remove note$/i)
      await userEvent.click(removeLink)

      const removeAlert = await screen.findByText(/^remove note\?$/i)
      expect(removeAlert).toBeInTheDocument()

      const confirmButton = await screen.findByText(/^yes$/i)
      await userEvent.click(confirmButton)

      expect(navigator.vibrate).toHaveBeenCalled()

      const noteIds = getNotes().map(({ id }) => id)
      expect(noteIds).not.toContain(idToDelete)
    })

    it('should remove the note from storage if the user has deleted all its content', async () => {
      const textBox = screen.getByRole('textbox')
      await userEvent.clear(textBox)

      const homeLink = screen.getByText(/^back to home$/i)
      await userEvent.click(homeLink)

      const removeAlert = await screen.findByText(/^remove note\?$/i)
      expect(removeAlert).toBeInTheDocument()

      const confirmButton = await screen.findByText(/^yes$/i)
      await userEvent.click(confirmButton)

      expect(navigator.vibrate).toHaveBeenCalled()

      const noteIds = getNotes().map(({ id }) => id)
      expect(noteIds).not.toContain(idToDelete)
    })
  })
})
