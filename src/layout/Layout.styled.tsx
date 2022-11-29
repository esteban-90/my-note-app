import styled from '@emotion/styled'
import { bgTransition, centered } from '@/styles'

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colorPalette.background.app};
  ${centered}
  ${bgTransition}
`

export const Content = styled.div`
  width: 100%;
  max-width: 480px;
  height: 90vh;
  background-color: ${({ theme }) => theme.colorPalette.background.content};
  box-shadow: 1px 1px 6px ${({ theme }) => theme.colorPalette.border};
  position: relative;
  overflow-y: hidden;
  ${bgTransition}
`
