import type { StorybookViteConfig } from '@storybook/builder-vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: '@storybook/react',

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-addon-react-router-v6',
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  features: {
    storyStoreV7: true,
    emotionAlias: false,
  },

  async viteFinal(config) {
    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        include: config.optimizeDeps?.include?.concat('react-router-dom', 'vite'),
      },
      plugins: config.plugins?.concat(tsConfigPaths()),
    }
  },
} as StorybookViteConfig
