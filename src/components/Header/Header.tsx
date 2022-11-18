import type { FC } from 'react'
import { Wrapper } from '@styled/Header'

export const Header: FC = () => {
  return (
    <Wrapper data-testid='app-header'>
      <h1>Note App</h1>
    </Wrapper>
  )
}
