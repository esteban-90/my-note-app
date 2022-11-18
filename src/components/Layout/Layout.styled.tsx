import styled from '@emotion/styled'
import { bgTransition, centered } from '@/styles'

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  color: var(--color-text);
  background-color: var(--color-bg);
  ${centered}
  ${bgTransition}
`

export const Content = styled.div`
  width: 100%;
  max-width: 480px;
  height: 90vh;
  background-color: var(--color-white);
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow-y: hidden;
  ${bgTransition}
`
