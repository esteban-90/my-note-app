import styled from '@emotion/styled'
import { centered } from '@/styles'

export const Header = styled.div`
  ${centered}
  justify-content: space-between;
  color: ${({ theme }) => theme.colorPalette.main};
  padding: 0 1rem;
  font-weight: 700;
`

export const Title = styled.h2`
  font-size: 1.5rem;

  &::selection {
    color: ${({ theme }) => theme.colorPalette.background.content};
    background-color: ${({ theme }) => theme.colorPalette.main};
  }
`

export const Count = styled.p`
  color: ${({ theme }) => theme.colorPalette.text.accent2};
  font-size: 1.2rem;
`

export const List = styled.div`
  padding: 0;
  margin: 0 1rem;
  height: 75vh;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (not(hover)), (not(pointer)), (pointer: coarse) {
    & a:last-child > div {
      margin-bottom: 5rem;
    }

    @media (orientation: landscape) {
      & ~ button {
        bottom: 1.5rem !important;

        &:first-of-type {
          right: 9rem;
        }

        &:last-of-type {
          right: 5rem;
        }
      }
    }
  }
`
