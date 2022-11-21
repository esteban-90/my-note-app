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

  :root {
    --color-main: #873e23;
    --color-text: #383a3f;
    --color-dark: #1f2124;
    --color-gray: #677;
    --color-bg: #f3f6f9;
    --color-light: #292a2c;
    --color-lighter: #f9f9f9;
    --color-white: #fff;
    --color-border: #e0e3e6;
  }

  .night {
    --color-main: #f68657;
    --color-text: #d6d1d1;
    --color-dark: #f5f6f7;
    --color-gray: #999;
    --color-bg: #1f2124;
    --color-light: #acb4bd;
    --color-lighter: #292a2c;
    --color-white: #2e3235;
    --color-border: #252629;
  }

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

  *::selection {
    color: var(--color-white);
    background-color: var(--color-main);
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
    background-color: var(--color-main);
  }
`

export const GlobalStyles: FC = () => <Global styles={styles} />
