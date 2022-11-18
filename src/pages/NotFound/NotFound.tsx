import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components'
import { Wrapper } from '@styled/NotFound'

export const NotFound: FC = () => {
  const { formatMessage } = useIntl()
  const goBackTitle = formatMessage({ id: 'not-found.go-back.title' })

  return (
    <Wrapper>
      <FormattedMessage id='not-found.heading' tagName='h2' />
      <FontAwesomeIcon icon='face-sad-tear' size='5x' fade />
      <Button icon='house' component={Link} to='/' title={goBackTitle} style={{ bottom: '1.5rem' }} />
    </Wrapper>
  )
}
