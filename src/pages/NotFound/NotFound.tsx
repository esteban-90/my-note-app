import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components'
import { Wrapper } from './NotFound.styled'

/**
 * Page to display if the user tries to go to a page that doesn't exist either because it corresponds
 * to a note previously removed or the id passed by parameter is invalid.
 * @returns The page.
 */

export const NotFound: FC = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  const { t } = useTranslation('not-found')
  const pageHeading = t('page.heading')
  const goBackTitle = t('buttons.go-back.title')

  return (
    <Wrapper>
      <h2>{pageHeading}</h2>
      <FontAwesomeIcon icon='face-sad-tear' size='5x' fade />
      <Button icon='arrow-left' title={goBackTitle} style={{ bottom: '1.5rem' }} onClick={goBack} />
    </Wrapper>
  )
}
