import styled from '@emotion/styled'
import { centered } from '@/styles'

export const Wrapper = styled.div`
  ${centered}
  flex-direction: column;
  color: var(--color-main);
  height: 85%;

  & h2 {
    font-size: 1.5rem;
  }

  & svg {
    animation-duration: 5s;
  }
`
