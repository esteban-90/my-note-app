import { MemoryRouter } from 'react-router-dom'
import { getTitle, getDate, getBody } from '@/helpers'
import { mockNote } from '@/mocks'
import { screen, render, setName } from '@/tests'
import { NoteItem } from './NoteItem'

describe(setName(NoteItem), () => {
  let asFragment: () => DocumentFragment

  const UI = (
    <MemoryRouter>
      <NoteItem {...mockNote} />
    </MemoryRouter>
  )

  beforeEach(() => {
    void ({ asFragment } = render(UI))
  })

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot()
  })

  describe(`should render ${NoteItem.name} component with its:`, () => {
    const { content, createdAt } = mockNote

    it('title', () => {
      const noteTitle = getTitle(content)
      const noteTitleElement = screen.getByRole('heading', { name: new RegExp(noteTitle, 'i') })
      expect(noteTitleElement).toBeInTheDocument()
    })

    it('date', () => {
      const noteDate = getDate(createdAt)
      const noteDateElement = screen.getByText(noteDate)
      expect(noteDateElement).toBeInTheDocument()
    })

    it('body', () => {
      const noteBody = getBody(content)
      const noteBodyElement = screen.getByText(noteBody, { trim: false })
      expect(noteBodyElement).toBeInTheDocument()
    })
  })
})
