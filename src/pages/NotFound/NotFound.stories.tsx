import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Layout } from '@/components'
import { NotFound } from './NotFound'

export default {
  title: 'Pages/Not Found',
  component: NotFound,
  decorators: [
    (Story) => {
      return (
        <Layout>
          <Story />
        </Layout>
      )
    },
  ],
  parameters: {
    reactRouter: {
      routePath: '/test',
    },
  },
} as ComponentMeta<typeof NotFound>

const Template: ComponentStory<typeof NotFound> = () => <NotFound />

export const NotFoundExample = Template.bind({})
