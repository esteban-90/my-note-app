import styled from '@emotion/styled'
import { centered } from '@/styles'

export const Wrapper = styled.div`
  position: absolute;
  right: 1rem;
  background: var(--color-main);
  border: none;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  ${centered}
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  transition: opacity transform 800ms;

  &:active {
    transform: scale(0.9);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  @media (not(hover)), (not(pointer)), (pointer: coarse) and (orientation: landscape) {
    width: 3.2rem;
    height: 3.2rem;
  }
`
