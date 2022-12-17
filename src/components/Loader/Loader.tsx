import type { FC } from 'react'
import { useTheme } from '@emotion/react'
import { CirclesWithBar } from 'react-loader-spinner'

export const Loader: FC = () => {
  const { colorPalette } = useTheme()

  return (
    <CirclesWithBar
      height='6rem'
      width='6rem'
      ariaLabel='loading indicator'
      wrapperClass='loader'
      barColor={colorPalette.main}
      outerCircleColor={colorPalette.text.accent1}
      innerCircleColor={colorPalette.text.accent2}
    />
  )
}
