import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
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

export const NoteDetailWithoutContentExample: ComponentStoryObj<typeof NoteDetail> = {
  parameters: {
    reactRouter: {
      routePath: '/notes',
    },
  },
}

export const NoteDetailWithContentExample: ComponentStoryObj<typeof NoteDetail> = {
  parameters: {
    reactRouter: {
      routePath: '/notes/:id',
      routeParams: { id: mockNotes[0].id },
    },
  },
}
