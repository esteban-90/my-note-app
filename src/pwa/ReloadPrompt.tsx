/* eslint-disable import/no-unresolved */
import type { FC } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useTranslation } from 'react-i18next'
import { Wrapper, Toast, Message, Button } from './ReloadPrompt.styled'

export const ReloadPrompt: FC = () => {
  const { t } = useTranslation('reload-prompt')
  const offlineReadyText = t('messages.offline-ready.text')
  const newContentText = t('messages.new-content.text')
  const reloadButtonText = t('buttons.reload.text')
  const closeButtonText = t('buttons.close.text')

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.info(`SW Registered: ${registration}`)
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
