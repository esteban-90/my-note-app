import styled from '@emotion/styled'

export const Wrapper = styled.div`
  border-bottom: 1px solid var(--color-border);
  padding: 0.1rem 1rem;
  transition: all 0.2s ease-in-out;
  font-weight: 600;

  @media (hover: hover) {
    &:hover {
      background-color: var(--color-bg);
      cursor: pointer;
    }
  }

  & p {
    font-size: 0.8rem;
    color: var(--color-light);

    & span:first-of-type {
      color: var(--color-gray);
      display: inline-block;
      margin-right: 0.5rem;
    }
  }

  & p,
  h3 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & h3::first-letter {
    text-transform: uppercase;
  }
`
