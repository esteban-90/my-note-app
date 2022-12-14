import type { FC } from 'react'
import { Global, css } from '@emotion/react'
import normalize from 'normalize.css'
import notie from 'notie/dist/notie.min.css'

const styles = css`
  ${normalize}
  ${notie}

  @font-face {
    font-family: Acme;
    src: url('/fonts/Acme-Regular.ttf');
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
    font-size: 1.2rem;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const GlobalStyles: FC = () => <Global styles={styles} />
