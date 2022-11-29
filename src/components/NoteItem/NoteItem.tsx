import type { FC } from 'react'
import type { Note } from '@/types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getTitle, getDate, getBody } from '@/helpers'
import { Wrapper } from '@styled/NoteItem'

export const NoteItem: FC<Note> = ({ id, content, createdAt }) => {
  const {
    i18n: { resolvedLanguage },
  } = useTranslation()

  return (
    <Link to={`notes/${id}`} data-testid={id} role='link'>
      <Wrapper>
        <h3>{getTitle(content)}</h3>
        <p>
          <span>{getDate(createdAt, resolvedLanguage)}</span>
          <span>{getBody(content)}</span>
        </p>
      </Wrapper>
    </Link>
  )
}
