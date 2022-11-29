import type { FC } from 'react'
import { Global, css } from '@emotion/react'
import { setOptions } from 'notie'
import normalize from 'normalize.css'
import notie from 'notie/dist/notie.min.css'
import { Acme } from '@/fonts'

setOptions({ overlayOpacity: 0, positions: { confirm: 'bottom', force: 'bottom' } })

const styles = css`
  ${normalize}
  ${notie}

  @font-face {
    font-family: Acme;
    src: url(${Acme});
  }

  * {
    font-family: Acme, sans-serif;
    color: inherit;
    font-size: inherit;
    scroll-behavior: smooth;
  }

  body {
    font-weight: 400;
    font-size: 18px;
  }

  a {
    text-decoration: none;
  }

  .notie-container {
    width: 480px;
    left: 50%;
    transform: translateX(-50%);
  }

  .notie-background-info {
    background-color: #f68657;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const GlobalStyles: FC = () => <Global styles={styles} />
