import type { Theme } from '@emotion/react'

const day: Theme = {
  themeName: 'day',

  colorPalette: {
    main: '#873e23',
    border: '#e0e3e6',
    background: {
      app: '#f3f6f9',
      header: '#f9f9f9',
      content: '#fff',
    },
    text: {
      accent1: '#292a2c',
      accent2: '#677',
    },
  },
}

const night: Theme = {
  themeName: 'night',

  colorPalette: {
    main: '#f68657',
    border: '#252629',
    background: {
      app: '#1f2124',
      header: '#292a2c',
      content: '#2e3235',
    },
    text: {
      accent1: '#acb4bd',
      accent2: '#999',
    },
  },
}

export const Themes: Record<string, Theme> = { day, night }
