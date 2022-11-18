import type { FC, HTMLAttributes, ElementType } from 'react'
import type { LinkProps } from 'react-router-dom'
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Wrapper } from '@styled/Button'

interface ButtonProps extends HTMLAttributes<HTMLElement> {
  component?: ElementType
  to?: LinkProps['to']
  icon: FontAwesomeIconProps['icon']
}

export const Button: FC<ButtonProps> = ({ component = 'button', icon, ...restProps }) => {
  return (
    <Wrapper {...restProps} as={component}>
      <FontAwesomeIcon icon={icon} size='xl' inverse />
    </Wrapper>
  )
}
