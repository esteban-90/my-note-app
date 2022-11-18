import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Layout } from '@/components'
import { NoteList } from './NoteList'

export default {
  title: 'Pages/Note List',
  component: NoteList,
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
      routePath: '/',
    },
  },
} as ComponentMeta<typeof NoteList>

const Template: ComponentStory<typeof NoteList> = () => <NoteList />

export const NoteListExample = Template.bind({})
