import type { FC, PropsWithChildren } from 'react'
import { Wrapper, Content } from './Layout.styled'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper data-testid='app-layout'>
      <Content>{children}</Content>
    </Wrapper>
  )
}
