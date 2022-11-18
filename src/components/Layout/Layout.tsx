import type { FC, PropsWithChildren } from 'react'
import { useTheme } from '@/contexts'
import { Wrapper, Content } from '@styled/Layout'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <Wrapper className={theme} data-testid='app-layout'>
      <Content>{children}</Content>
    </Wrapper>
  )
}
