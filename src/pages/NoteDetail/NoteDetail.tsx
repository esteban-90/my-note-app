import type { FC, ChangeEventHandler } from 'react'
import { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { confirm, force } from 'notie'
import { useNotes } from '@/contexts'
import { hasBadWords } from '@/helpers'
import { NotFound } from '@/pages/NotFound'
import { Wrapper, Content, TextBox } from '@styled/NoteDetail'

export const NoteDetail: FC = () => {
  const { id = '' } = useParams()
  const { formatMessage } = useIntl()
  const navigate = useNavigate()

  const { getNote, addNote, updateNote, removeNote } = useNotes()

  const noteIsNew = !id
  const note = getNote(id)
  const noteExists = !!note

  const [noteContent, setNoteContent] = useState<string>('')

  const typingHandler: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setNoteContent(event.target.value)
  }

  useEffect(() => {
    setNoteContent(note?.content ?? '')
  }, [])

  const addNoteText = formatMessage({ id: 'note-detail.add-note.text' })
  const updateNoteText = formatMessage({ id: 'note-detail.update-note.text' })
  const removeNoteText = formatMessage({ id: 'note-detail.remove-note.text' })

  const submitText = formatMessage({ id: 'note-detail.submit.text' })
  const cancelText = formatMessage({ id: 'note-detail.cancel.text' })
  const options = { submitText, cancelText }

  const profanityText = formatMessage({ id: 'note-detail.profanity.text' })
  const profanityConfirm = formatMessage({ id: 'note-detail.profanity.confirm' })

  const goBackTitle = formatMessage({ id: 'note-detail.go-back.title' })
  const addNoteTitle = formatMessage({ id: 'note-detail.add-note.title' })
  const removeNoteTitle = formatMessage({ id: 'note-detail.remove-note.title' })

  const warn = () => {
    force({ text: profanityText, type: 'error', buttonText: profanityConfirm }, () => {
      navigator.vibrate(100)
      navigate(-1)
    })
  }

  const add = () => {
    const newNoteContent = noteContent.trim()

    if (newNoteContent) {
      if (!hasBadWords(newNoteContent)) {
        confirm(
          { text: addNoteText, ...options },
          () => {
            navigator.vibrate(100)
            addNote(newNoteContent)
            navigate(-1)
          },
          () => navigate(-1)
        )
      } else {
        warn()
      }
    } else {
      navigate(-1)
    }
  }

  const update = () => {
    const updatedNoteContent = noteContent.trim()

    if (updatedNoteContent) {
      if (!hasBadWords(updatedNoteContent)) {
        if (noteContent !== note?.content) {
          confirm(
            { text: updateNoteText, ...options },
            () => {
              navigator.vibrate(100)
              updateNote(id, updatedNoteContent)
              navigate(-1)
            },
            () => navigate(-1)
          )
        } else {
          navigate(-1)
        }
      } else {
        warn()
      }
    } else {
      remove()
    }
  }

  const remove = () => {
    confirm({ text: removeNoteText, ...options }, () => {
      navigator.vibrate(100)
      removeNote(id)
      navigate(-1)
    })
  }

  const goBack = () => {
    if (noteIsNew) add()
    else update()
  }

  return noteIsNew || noteExists ? (
    <Wrapper>
      <Content>
        <FontAwesomeIcon icon='left-long' size='xl' onClick={goBack} title={goBackTitle} />
        <FontAwesomeIcon
          icon={noteIsNew ? 'check' : 'trash-can'}
          size='xl'
          title={noteIsNew ? addNoteTitle : removeNoteTitle}
          onClick={noteIsNew ? add : remove}
        />
      </Content>
      <TextBox aria-label='note content' value={noteContent} onChange={typingHandler} autoFocus={noteIsNew} />
    </Wrapper>
  ) : (
    <NotFound />
  )
}
