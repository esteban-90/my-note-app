import { getTitle, getDate, getBody } from '@/helpers'
import { mockNotes, saveNotes, removeNotes } from '@/mocks'
import { screen, render, configure } from '@/tests'
import { NoteProvider, useNotes } from './Notes'

describe(NoteProvider.name, () => {
  let asFragment: () => DocumentFragment

  const Child = () => {
    const { notes } = useNotes()
    return (
      <ul>
        {notes.map(({ id, content, createdAt }) => (
          <li key={id}>
            <p>{getTitle(content)}</p>
            <p>{getBody(content)}</p>
            <p>{getDate(createdAt)}</p>
          </li>
        ))}
      </ul>
    )
  }

  const UI = (
    <NoteProvider>
      <Child />
    </NoteProvider>
  )

  beforeAll(() => {
    configure({ throwSuggestions: true })
    saveNotes()
  })

  beforeEach(() => {
    ;({ asFragment } = render(UI))
  })

  afterAll(() => {
    removeNotes()
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  it('should provide notes to child elements', () => {
    mockNotes.forEach(({ content, createdAt }) => {
      const noteTitle = getTitle(content)
      const noteTitleElement = screen.getByText(noteTitle)
      expect(noteTitleElement).toBeInTheDocument()

      const noteBody = getBody(content)
      const noteBodyElement = screen.getByText(noteBody, { trim: false })
      expect(noteBodyElement).toBeInTheDocument()

      const noteDate = getDate(createdAt)
      const noteDateElement = screen.getByText(noteDate)
      expect(noteDateElement).toBeInTheDocument()
    })
  })

  it('should provide the right number of notes', () => {
    const noteItems = screen.getAllByRole('listitem')
    expect(noteItems).toHaveLength(mockNotes.length)
  })
})
