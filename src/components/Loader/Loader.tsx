import type { FC } from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

export const Loader: FC = () => {
  return <MagnifyingGlass ariaLabel='loader' glassColor='#c0efff' color='#e12235' wrapperClass='loader' />
}
