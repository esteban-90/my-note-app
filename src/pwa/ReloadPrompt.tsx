/* eslint-disable import/no-unresolved */
import type { FC } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useIntl } from 'react-intl'
import { Wrapper, Toast, Message, Button } from './ReloadPrompt.styled'

export const ReloadPrompt: FC = () => {
  const { formatMessage } = useIntl()

  const offlineReadyText = formatMessage({ id: 'reload-prompt.offline-ready.text' })
  const newContentText = formatMessage({ id: 'reload-prompt.new-content.text' })
  const reloadButtonText = formatMessage({ id: 'reload-prompt.reload-button.text' })
  const closeButtonText = formatMessage({ id: 'reload-prompt.close-button.text' })

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.info('SW Registered: ' + registration)
    },
    onRegisterError(error) {
      console.error('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <Wrapper>
      {(offlineReady || needRefresh) && (
        <Toast>
          <Message>{offlineReady ? <span>{offlineReadyText}</span> : <span>{newContentText}</span>}</Message>
          {needRefresh && <Button onClick={() => updateServiceWorker(true)}>{reloadButtonText}</Button>}
          <Button onClick={close}>{closeButtonText}</Button>
        </Toast>
      )}
    </Wrapper>
  )
}
