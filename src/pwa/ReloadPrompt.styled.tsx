import styled from '@emotion/styled'

export const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 0;
  height: 0;
`

export const Toast = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 1rem;
  padding: 0.8rem;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  background-color: var(--color-main);
  text-align: center;
`

export const Message = styled.div`
  margin-bottom: 8px;
  color: var(--color-white);
`

export const Button = styled.button`
  border: 1px solid var(--color-border);
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
`
