import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Layout } from '@/components'
import { mockNotes } from '@/mocks'
import { NoteDetail } from './NoteDetail'

export default {
  title: 'Pages/Note Detail',
  component: NoteDetail,
  decorators: [
    (Story) => {
      return (
        <Layout>
          <Story />
        </Layout>
      )
    },
  ],
} as ComponentMeta<typeof NoteDetail>

const Template: ComponentStory<typeof NoteDetail> = () => <NoteDetail />

export const NoteDetailWithoutContentExample = Template.bind({})

NoteDetailWithoutContentExample.story = {
  parameters: {
    reactRouter: {
      routePath: '/notes',
    },
  },
}

export const NoteDetailWithContentExample = Template.bind({})

NoteDetailWithContentExample.story = {
  parameters: {
    reactRouter: {
      routePath: '/notes/:id',
      routeParams: { id: mockNotes[0].id },
    },
  },
}
