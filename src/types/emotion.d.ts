import '@emotion/react'

declare module '@emotion/react' {
  /**
   * App theme.
   */
  export interface Theme {
    /**
     * Theme name corresponding to two possible modes (day or night)
     * which will be saved in local storage.
     */
    readonly themeName: 'night' | 'day'
    /**
     * Colors for day and night modes.
     */
    readonly colorPalette: {
      main: string
      border: string
      background: {
        app: string
        header: string
        content: string
      }
      text: {
        accent1: string
        accent2: string
      }
    }
    /**
     * Function to change theme mode between day and night.
     */
    readonly toggleTheme?: () => void
  }
}
