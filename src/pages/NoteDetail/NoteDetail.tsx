import type { FC } from 'react'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { confirm, force } from 'notie'
import { useNotes } from '@/contexts'
import { hasBadWords } from '@/helpers'
import { NotFound } from '@/pages/NotFound'
import { Wrapper, Content, TextBox } from '@styled/NoteDetail'

/**
 * Page to create, edit or just view a note.
 * @returns The page, or Note Found page if id parameter is invalid.
 */

export const NoteDetail: FC = () => {
  const { id = '' } = useParams()
  const { t } = useTranslation('note-detail')
  const navigate = useNavigate()

  const noteRef = useRef<HTMLTextAreaElement>(null)
  const { getNote, addNote, updateNote, removeNote } = useNotes()

  const noteIsNew = !id
  const note = getNote(id)
  const noteExists = !!note

  const addNoteText = t('messages.add-note.text')
  const updateNoteText = t('messages.update-note.text')
  const removeNoteText = t('messages.remove-note.text')

  const submitText = t('buttons.submit.text')
  const cancelText = t('buttons.cancel.text')
  const options = { submitText, cancelText }

  const profanityText = t('messages.profanity-warn.text')
  const profanityConfirm = t('buttons.confirm.text')

  const goBackTitle = t('links.go-back.title')
  const addNoteTitle = t('links.add-note.title')
  const removeNoteTitle = t('links.remove-note.title')

  const warn = () => {
    force({ text: profanityText, type: 'error', buttonText: profanityConfirm }, () => {
      navigator.vibrate(100)
      navigate(-1)
    })
  }

  const add = () => {
    const addedNoteContent = noteRef.current?.value.trim()

    if (addedNoteContent) {
      if (!hasBadWords(addedNoteContent)) {
        confirm(
          { text: addNoteText, ...options },
          () => {
            navigator.vibrate(100)
            addNote(addedNoteContent)
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
    const updatedNoteContent = noteRef.current?.value.trim()

    if (updatedNoteContent) {
      if (!hasBadWords(updatedNoteContent)) {
        if (updatedNoteContent !== note?.content) {
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
      <TextBox aria-label='note content' defaultValue={note?.content} autoFocus={noteIsNew} ref={noteRef} />
    </Wrapper>
  ) : (
    <NotFound />
  )
}
