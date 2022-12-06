import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { mockNotes, getNotes, saveNotes, removeNotes } from '@/mocks'
import { screen, render, userEvent, suggestQueries, switchToEN, switchToES, setName } from '@/tests'
import { NoteDetail } from './NoteDetail'

describe(setName(NoteDetail), () => {
  let asFragment: () => DocumentFragment
  let UI: JSX.Element
  // 👇 this first one will be used.
  const [{ id, content }] = mockNotes

  const setRouterWithInvalidID = () => {
    UI = (
      <MemoryRouter initialEntries={['/notes/test']}>
        <Routes>
          <Route path='notes'>
            <Route path=':id' element={<NoteDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
  }

  const setRouterWithRemovedID = () => {
    UI = (
      <MemoryRouter initialEntries={['/notes/note-la9l6ikp']}>
        <Routes>
          <Route path='notes'>
            <Route path=':id' element={<NoteDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
  }

  const setRouterWithoutID = () => {
    UI = (
      <MemoryRouter initialEntries={['/notes']}>
        <Routes>
          <Route path='notes'>
            <Route index element={<NoteDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
  }

  const setRouterWithID = () => {
    UI = (
      <MemoryRouter initialEntries={[`/notes/${id}`]}>
        <Routes>
          <Route path='notes'>
            <Route path=':id' element={<NoteDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )
  }

  const renderUI = () => {
    void ({ asFragment } = render(UI))
  }

  const renderUIWithNotes = () => {
    saveNotes()
    renderUI()
  }

  const matchSnapshot = () => {
    expect(asFragment()).toMatchSnapshot()
  }

  beforeAll(suggestQueries)

  describe('when the language set is English:', () => {
    beforeAll(switchToEN)

    describe('with bad url param:', () => {
      describe("if it's not a valid id:", () => {
        beforeAll(setRouterWithInvalidID)
        beforeEach(renderUI)

        it('should match snapshot', matchSnapshot)

        it('should display Not Found page', () => {
          const notFoundHeading = screen.getByRole('heading', { name: /^page not found$/i })
          expect(notFoundHeading).toBeInTheDocument()
        })
      })

      describe("if it's a valid id but the note associated with it has been removed:", () => {
        beforeAll(setRouterWithRemovedID)
        beforeEach(renderUI)

        it('should match snapshot', matchSnapshot)

        it('should display Not Found page', () => {
          const notFoundHeading = screen.getByRole('heading', { name: /^page not found$/i })
          expect(notFoundHeading).toBeInTheDocument()
        })
      })
    })

    describe('creation of a note:', () => {
      beforeAll(setRouterWithoutID)
      beforeEach(renderUI)

      it('should match snapshot', matchSnapshot)

      describe('at first:', () => {
        it('there is no content', () => {
          const textBox = screen.getByRole('textbox')
          expect(textBox).toBeInTheDocument()
          expect(textBox).toHaveValue('')
          expect(textBox).toHaveFocus()
        })

        describe('there should be a link with title of:', () => {
          it('"Back to home"', () => {
            const homeLink = screen.getByText(/^back to home$/i)
            expect(homeLink).toBeInTheDocument()
          })

          it('"Add note"', () => {
            const addLink = screen.getByText(/^add note$/i)
            expect(addLink).toBeInTheDocument()
          })
        })
      })

      describe('should succeed:', () => {
        it("if the user doesn't write bad words and add link is clicked", async () => {
          const goodContent = 'Testing title\nTesting body'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, goodContent)

          const addLink = screen.getByText(/^add note$/i)
          await userEvent.click(addLink)

          const addAlert = await screen.findByText(/^add note\?$/i)
          expect(addAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^yes$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const [createdNote] = getNotes()
          expect(createdNote.content).toBe(goodContent)

          removeNotes()
        })

        it("if the user doesn't write bad words and go back link is clicked", async () => {
          const goodContent = 'Testing title\nTesting body'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, goodContent)

          const homeLink = screen.getByText(/^back to home$/i)
          await userEvent.click(homeLink)

          const addAlert = await screen.findByText(/^add note\?$/i)
          expect(addAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^yes$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const [createdNote] = getNotes()
          expect(createdNote.content).toBe(goodContent)

          removeNotes()
        })
      })

      describe('should fail:', () => {
        it('if the user writes bad words', async () => {
          const badContent = 'ash0le'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, badContent)

          const addLink = screen.getByText(/^add note$/i)
          await userEvent.click(addLink)

          const profanityWarn = await screen.findByText(/^profanity is not allowed!$/i)
          expect(profanityWarn).toBeInTheDocument()

          const profanityConfirm = await screen.findByText(/^ok$/i)
          await userEvent.click(profanityConfirm)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const notes = getNotes()
          const badNote = notes.find((note) => note.content === badContent)
          expect(badNote).toBeUndefined()
        })

        it("if there's no content and add note link is clicked", async () => {
          const textBox = screen.getByRole('textbox')
          expect(textBox).toHaveValue('')
          expect(textBox).toHaveFocus()

          const addLink = screen.getByText(/^add note$/i)
          await userEvent.click(addLink)

          const notes = getNotes()
          expect(notes).toHaveLength(0)
        })

        it("if there's already content but cancel button is clicked", async () => {
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
    })

    describe('edition of a note:', () => {
      beforeAll(setRouterWithID)
      beforeEach(renderUIWithNotes)
      afterEach(removeNotes)

      it('should match snapshot', matchSnapshot)

      describe('at first:', () => {
        it('the content to edit should appear', () => {
          const textBox = screen.getByRole('textbox')
          expect(textBox).toBeInTheDocument()
          expect(textBox).toHaveValue(content)
          expect(textBox).not.toHaveFocus()
        })

        describe('there should be a link with title of:', () => {
          it('"Back to home"', () => {
            const homeLink = screen.getByText(/^back to home$/i)
            expect(homeLink).toBeInTheDocument()
          })

          it('"Remove note"', () => {
            const removeLink = screen.getByText(/^remove note$/i)
            expect(removeLink).toBeInTheDocument()
          })
        })
      })

      describe('should succeed:', () => {
        it("if the user doesn't write bad words", async () => {
          const goodContent = ' nice'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, goodContent)

          const homeLink = screen.getByText(/^back to home$/i)
          await userEvent.click(homeLink)

          const updateAlert = await screen.findByText(/^update note\?$/i)
          expect(updateAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^yes$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const [editedNote] = getNotes()
          expect(editedNote.content).toBe(content + goodContent)
        })
      })

      describe('should fail:', () => {
        it('if the previous content is the same as the user has written', async () => {
          const textBox = screen.getByRole('textbox')
          await userEvent.clear(textBox)
          await userEvent.type(textBox, content)

          const homeLink = screen.getByText(/^back to home$/i)
          await userEvent.click(homeLink)

          const notes = getNotes()
          expect(notes.find((note) => note.content === content)).not.toBeUndefined()
        })

        it('if the user writes bad words', async () => {
          const badContent = ' shit'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, badContent)

          const homeLink = screen.getByText(/^back to home$/i)
          await userEvent.click(homeLink)

          const profanityWarn = await screen.findByText(/^profanity is not allowed!$/i)
          expect(profanityWarn).toBeInTheDocument()

          const profanityConfirm = await screen.findByText(/^ok$/i)
          await userEvent.click(profanityConfirm)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const notes = getNotes()
          const badNote = notes.find((note) => note.content.includes(badContent))
          expect(badNote).toBeUndefined()
        })
      })
    })

    describe('deletion of a note:', () => {
      beforeAll(setRouterWithID)
      beforeEach(renderUIWithNotes)
      afterEach(removeNotes)

      it('should match snapshot', matchSnapshot)

      describe('should succeed:', () => {
        it('if note exists', async () => {
          const removeLink = screen.getByText(/^remove note$/i)
          await userEvent.click(removeLink)

          const removeAlert = await screen.findByText(/^remove note\?$/i)
          expect(removeAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^yes$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const noteIds = getNotes().map((note) => note.id)
          expect(noteIds).not.toContain(id)
        })

        it('if the user removes all the content', async () => {
          const textBox = screen.getByRole('textbox')
          await userEvent.clear(textBox)

          const homeLink = screen.getByText(/^back to home$/i)
          await userEvent.click(homeLink)

          const removeAlert = await screen.findByText(/^remove note\?$/i)
          expect(removeAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^yes$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const noteIds = getNotes().map((note) => note.id)
          expect(noteIds).not.toContain(id)
        })
      })
    })
  })

  describe('when the language set is Spanish:', () => {
    beforeAll(switchToES)

    describe('with bad url param:', () => {
      describe("if it's not a valid id:", () => {
        beforeAll(setRouterWithInvalidID)
        beforeEach(renderUI)

        it('should match snapshot', matchSnapshot)

        it('should display Not Found page', () => {
          const notFoundHeading = screen.getByRole('heading', { name: /^página no encontrada$/i })
          expect(notFoundHeading).toBeInTheDocument()
        })
      })

      describe("if it's a valid id but the note associated with it has been removed:", () => {
        beforeAll(setRouterWithRemovedID)
        beforeEach(renderUI)

        it('should match snapshot', matchSnapshot)

        it('should display Not Found page', () => {
          const notFoundHeading = screen.getByRole('heading', { name: /^página no encontrada$/i })
          expect(notFoundHeading).toBeInTheDocument()
        })
      })
    })

    describe('creation of a note:', () => {
      beforeAll(setRouterWithoutID)
      beforeEach(renderUI)

      it('should match snapshot', matchSnapshot)

      describe('at first:', () => {
        it('there is no content', () => {
          const textBox = screen.getByRole('textbox')
          expect(textBox).toBeInTheDocument()
          expect(textBox).toHaveValue('')
          expect(textBox).toHaveFocus()
        })

        describe('there should be a link with title of:', () => {
          it('"Volver a inicio"', () => {
            const homeLink = screen.getByText(/^volver a inicio$/i)
            expect(homeLink).toBeInTheDocument()
          })

          it('"Agregar nota"', () => {
            const addLink = screen.getByText(/^agregar nota$/i)
            expect(addLink).toBeInTheDocument()
          })
        })
      })

      describe('should succeed:', () => {
        it("if the user doesn't write bad words and add link is clicked", async () => {
          const goodContent = 'Título de prueba\nCuerpo de prueba'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, goodContent)

          const addLink = screen.getByText(/^agregar nota$/i)
          await userEvent.click(addLink)

          const addAlert = await screen.findByText(/^¿agregar nota\?$/i)
          expect(addAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^sí$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const [createdNote] = getNotes()
          expect(createdNote.content).toBe(goodContent)

          removeNotes()
        })

        it("if the user doesn't write bad words and go back link is clicked", async () => {
          const goodContent = 'Título de prueba\nCuerpo de prueba'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, goodContent)

          const homeLink = screen.getByText(/^volver a inicio$/i)
          await userEvent.click(homeLink)

          const addAlert = await screen.findByText(/^¿agregar nota\?$/i)
          expect(addAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^sí$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const [createdNote] = getNotes()
          expect(createdNote.content).toBe(goodContent)

          removeNotes()
        })
      })

      describe('should fail:', () => {
        it('if the user writes bad words', async () => {
          const badContent = 'pendej0'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, badContent)

          const addLink = screen.getByText(/^agregar nota$/i)
          await userEvent.click(addLink)

          const profanityWarn = await screen.findByText(/^¡no se permiten malas palabras!$/i)
          expect(profanityWarn).toBeInTheDocument()

          const profanityConfirm = await screen.findByText(/^de acuerdo$/i)
          await userEvent.click(profanityConfirm)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const notes = getNotes()
          const badNote = notes.find((note) => note.content === badContent)
          expect(badNote).toBeUndefined()
        })

        it("if there's no content and add note link is clicked", async () => {
          const textBox = screen.getByRole('textbox')
          expect(textBox).toHaveValue('')
          expect(textBox).toHaveFocus()

          const addLink = screen.getByText(/^agregar nota$/i)
          await userEvent.click(addLink)

          const notes = getNotes()
          expect(notes).toHaveLength(0)
        })

        it("if there's already content but cancel button is clicked", async () => {
          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, 'hola')

          const addLink = screen.getByText(/^agregar nota$/i)
          await userEvent.click(addLink)

          const addAlert = await screen.findByText(/^¿agregar nota\?$/i)
          expect(addAlert).toBeInTheDocument()

          const cancelButton = await screen.findByText(/^no$/i)
          await userEvent.click(cancelButton)

          const notes = getNotes()
          expect(notes).toHaveLength(0)
        })
      })
    })

    describe('edition of a note:', () => {
      beforeAll(setRouterWithID)
      beforeEach(renderUIWithNotes)
      afterEach(removeNotes)

      it('should match snapshot', matchSnapshot)

      describe('at first:', () => {
        it('the content to edit should appear', () => {
          const textBox = screen.getByRole('textbox')
          expect(textBox).toBeInTheDocument()
          expect(textBox).toHaveValue(content)
          expect(textBox).not.toHaveFocus()
        })

        describe('there should be a link with title of:', () => {
          it('"Volver a inicio"', () => {
            const homeLink = screen.getByText(/^volver a inicio$/i)
            expect(homeLink).toBeInTheDocument()
          })

          it('"Eliminar nota"', () => {
            const removeLink = screen.getByText(/^eliminar nota$/i)
            expect(removeLink).toBeInTheDocument()
          })
        })
      })

      describe('should succeed:', () => {
        it("if the user doesn't write bad words", async () => {
          const goodContent = ' bien'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, goodContent)

          const homeLink = screen.getByText(/^volver a inicio$/i)
          await userEvent.click(homeLink)

          const updateAlert = await screen.findByText(/^¿actualizar nota\?$/i)
          expect(updateAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^sí$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const [editedNote] = getNotes()
          expect(editedNote.content).toBe(content + goodContent)
        })
      })

      describe('should fail:', () => {
        it('if the previous content is the same as the user has written', async () => {
          const textBox = screen.getByRole('textbox')
          await userEvent.clear(textBox)
          await userEvent.type(textBox, content)

          const homeLink = screen.getByText(/^volver a inicio$/i)
          await userEvent.click(homeLink)

          const notes = getNotes()
          expect(notes.find((note) => note.content === content)).not.toBeUndefined()
        })

        it('if the user writes bad words', async () => {
          const badContent = ' mierda'

          const textBox = screen.getByRole('textbox')
          await userEvent.type(textBox, badContent)

          const homeLink = screen.getByText(/^volver a inicio$/i)
          await userEvent.click(homeLink)

          const profanityWarn = await screen.findByText(/^¡no se permiten malas palabras!$/i)
          expect(profanityWarn).toBeInTheDocument()

          const profanityConfirm = await screen.findByText(/^de acuerdo$/i)
          await userEvent.click(profanityConfirm)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const notes = getNotes()
          const badNote = notes.find((note) => note.content.includes(badContent))
          expect(badNote).toBeUndefined()
        })
      })
    })

    describe('deletion of a note:', () => {
      beforeAll(setRouterWithID)
      beforeEach(renderUIWithNotes)
      afterEach(removeNotes)

      it('should match snapshot', matchSnapshot)

      describe('should succeed:', () => {
        it('if note exists', async () => {
          const removeLink = screen.getByText(/^eliminar nota$/i)
          await userEvent.click(removeLink)

          const removeAlert = await screen.findByText(/^¿eliminar nota\?$/i)
          expect(removeAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^sí$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const noteIds = getNotes().map((note) => note.id)
          expect(noteIds).not.toContain(id)
        })

        it('if the user removes all the content', async () => {
          const textBox = screen.getByRole('textbox')
          await userEvent.clear(textBox)

          const homeLink = screen.getByText(/^volver a inicio$/i)
          await userEvent.click(homeLink)

          const removeAlert = await screen.findByText(/^¿eliminar nota\?$/i)
          expect(removeAlert).toBeInTheDocument()

          const confirmButton = await screen.findByText(/^sí$/i)
          await userEvent.click(confirmButton)

          expect(navigator.vibrate).toHaveBeenCalledWith(100)

          const noteIds = getNotes().map((note) => note.id)
          expect(noteIds).not.toContain(id)
        })
      })
    })
  })
})
