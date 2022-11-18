import styled from '@emotion/styled'

export const Wrapper = styled.div`
  text-align: center;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-main);
  padding: 1rem;

  & svg {
    cursor: pointer;
  }
`

export const TextBox = styled.textarea`
  border: none;
  text-align: justify;
  background-color: var(--color-white);
  padding: 16px 12px;
  width: 80%;
  height: 70vh;
  resize: none;
  scrollbar-width: none;

  &:active,
  &:focus {
    outline: none;
    border: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`
