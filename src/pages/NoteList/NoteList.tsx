import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NoteItem, Button } from '@/components'
import { useNotes } from '@/contexts'
import { Header, Title, Count, List } from './NoteList.styled'

/**
 * Page for showing a list of notes previously saved, or an empty list if there are no notes yet,
 * and three buttons to change the language, the theme and to go to the Note Detail page.
 * @returns The page.
 */

export const NoteList: FC = () => {
  const { notes } = useNotes()
  const { themeName, toggleTheme } = useTheme()

  const {
    t,
    i18n: { resolvedLanguage, changeLanguage },
  } = useTranslation('note-list')

  const pageHeading = t('page.heading')
  const newNoteTitle = t('buttons.add-note.title')
  const changeLanguageTitle = t('buttons.change-language.title')
  const dayModeTitle = t('buttons.change-theme.day-mode.title')
  const nightModeTitle = t('buttons.change-theme.night-mode.title')

  const handleChangeLanguage = async () => {
    await changeLanguage(resolvedLanguage === 'en' ? 'es' : 'en')
  }

  return (
    <>
      <Header>
        <Title>
          <FontAwesomeIcon icon='book' /> {pageHeading}
        </Title>
        <Count>{notes.length}</Count>
      </Header>
      <List>
        {notes.map((note) => (
          <NoteItem key={note.id} {...note} />
        ))}
      </List>
      <Button
        icon='language'
        title={changeLanguageTitle}
        onClick={handleChangeLanguage}
        style={{ bottom: '10.5rem' }}
      />
      <Button
        icon={themeName === 'night' ? 'sun' : 'moon'}
        title={themeName === 'night' ? dayModeTitle : nightModeTitle}
        onClick={toggleTheme}
        style={{ bottom: '6rem' }}
      />
      <Button icon='add' component={Link} to='/notes' title={newNoteTitle} role='button' style={{ bottom: '1.5rem' }} />
    </>
  )
}
