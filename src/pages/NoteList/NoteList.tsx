import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NoteItem, Button } from '@/components'
import { useNotes, useLanguage, useTheme } from '@/contexts'
import { Header, Title, Count, List } from '@styled/NoteList'

export const NoteList: FC = () => {
  const { notes } = useNotes()
  const { changeLanguage } = useLanguage()
  const { theme, changeTheme } = useTheme()

  const { formatMessage } = useIntl()
  const changeLanguageTitle = formatMessage({ id: 'note-list.change-language.title' })
  const dayModeTitle = formatMessage({ id: 'note-list.change-theme.day.title' })
  const nightModeTitle = formatMessage({ id: 'note-list.change-theme.night.title' })
  const newNoteTitle = formatMessage({ id: 'note-list.add-note.title' })

  return (
    <>
      <Header>
        <Title>
          <FontAwesomeIcon icon='book' /> <FormattedMessage id='note-list.heading' />
        </Title>
        <Count>{notes.length}</Count>
      </Header>
      <List>
        {notes.map((note) => (
          <NoteItem key={note.id} {...note} />
        ))}
      </List>
      <Button icon='language' title={changeLanguageTitle} onClick={changeLanguage} style={{ bottom: '10.5rem' }} />
      <Button
        icon={theme === 'night' ? 'sun' : 'moon'}
        title={theme === 'night' ? dayModeTitle : nightModeTitle}
        onClick={changeTheme}
        style={{ bottom: '6rem' }}
      />
      <Button icon='add' component={Link} to='/notes' title={newNoteTitle} role='button' style={{ bottom: '1.5rem' }} />
    </>
  )
}
