import type { FC } from 'react'
import type { Note } from '@/types'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { getTitle, getBody } from '@/helpers'
import { Wrapper } from '@styled/NoteItem'

export const NoteItem: FC<Note> = ({ id, content, createdAt }) => {
  const { formatDate } = useIntl()

  return (
    <Link to={`notes/${id}`} data-testid={id} role='link'>
      <Wrapper>
        <h3>{getTitle(content)}</h3>
        <p>
          <span>{formatDate(createdAt, { dateStyle: 'long', timeStyle: 'medium' })}</span>
          <span>{getBody(content)}</span>
        </p>
      </Wrapper>
    </Link>
  )
}
