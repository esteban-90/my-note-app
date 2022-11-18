import styled from '@emotion/styled'
import { bgTransition } from '@/styles'

export const Wrapper = styled.div`
  text-align: center;
  background-color: var(--color-lighter);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  ${bgTransition}

  & h1 {
    margin: 0;
    padding: 0.8rem;
    font-size: 1.7rem;
    color: var(--color-main);
    font-weight: 800;
  }
`
