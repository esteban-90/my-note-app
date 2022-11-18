import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Layout } from './Layout'

export default {
  title: 'Components/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />

export const LayoutExample = Template.bind({})
