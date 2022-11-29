import styled from '@emotion/styled'
import { bgTransition } from '@/styles'

export const Wrapper = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colorPalette.background.header};
  box-shadow: 0px 1px 3px ${({ theme }) => theme.colorPalette.border};
  ${bgTransition}

  & h1 {
    margin: 0;
    padding: 0.8rem;
    font-size: 1.7rem;
    color: ${({ theme }) => theme.colorPalette.main};
    font-weight: 800;

    &::selection {
      color: ${({ theme }) => theme.colorPalette.background.header};
      background-color: ${({ theme }) => theme.colorPalette.main};
    }
  }
`
