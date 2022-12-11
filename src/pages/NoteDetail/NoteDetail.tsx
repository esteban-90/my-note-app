import type { FC } from 'react'
import { useRef } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { confirm, force } from 'notie'
import { useNotes } from '@/contexts'
import { hasBadWords } from '@/helpers'
// eslint-disable-next-line capitalized-comments
// import NotFound from '@/pages/NotFound'
import { Wrapper, Content, TextBox } from './NoteDetail.styled'

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

  const makeShake = () => navigator.vibrate(100)
  const goBack = () => navigate(-1)

  /**
   * Displays a warning in case of profanity.
   */
  const warn = () => {
    force({ text: profanityText, type: 'error', buttonText: profanityConfirm }, () => {
      makeShake()
      goBack()
    })
  }

  /**
   * Wrapper function for addNote().
   */
  const add = () => {
    const content = noteRef.current?.value.trim()

    if (content) {
      if (!hasBadWords(content)) {
        confirm(
          { text: addNoteText, ...options },
          () => {
            makeShake()
            addNote(content)
            goBack()
          },
          goBack
        )
      } else {
        warn()
      }
    } else {
      goBack()
    }
  }

  /**
   * Wrapper function for updateNote().
   */
  const update = () => {
    const content = noteRef.current?.value.trim()

    if (content) {
      if (!hasBadWords(content)) {
        if (content !== note?.content) {
          confirm(
            { text: updateNoteText, ...options },
            () => {
              makeShake()
              updateNote(id, content)
              goBack()
            },
            goBack
          )
        } else {
          goBack()
        }
      } else {
        warn()
      }
    } else {
      remove()
    }
  }

  /**
   * Wrapper function for removeNote().
   */
  const remove = () => {
    confirm({ text: removeNoteText, ...options }, () => {
      makeShake()
      removeNote(id)
      goBack()
    })
  }

  return noteIsNew || noteExists ? (
    <Wrapper>
      <Content>
        <FontAwesomeIcon icon='left-long' size='xl' onClick={noteIsNew ? add : update} title={goBackTitle} />
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
    <Navigate to='/not-found' replace />
  )
}
