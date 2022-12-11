import type { FC } from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

export const Loader: FC = () => {
  return (
    <MagnifyingGlass
      height='5rem'
      width='5rem'
      ariaLabel='app loader'
      wrapperClass='loader'
      glassColor='transparent'
      color='#f68657'
    />
  )
}
