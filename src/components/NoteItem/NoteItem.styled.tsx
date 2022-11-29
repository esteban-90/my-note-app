import styled from '@emotion/styled'

export const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colorPalette.border};
  padding: 0.1rem 1rem;
  transition: all 0.2s ease-in-out;
  font-weight: 600;

  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.colorPalette.background.app};
      cursor: pointer;
    }
  }

  & p {
    font-size: 0.8rem;

    & span:first-of-type {
      color: ${({ theme }) => theme.colorPalette.text.accent2};
      display: inline-block;
      margin-right: 0.5rem;
    }
  }

  & p,
  & h3 {
    color: ${({ theme }) => theme.colorPalette.text.accent1};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & h3::first-letter {
    text-transform: uppercase;
  }
`
