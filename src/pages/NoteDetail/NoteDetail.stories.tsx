import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { mockNotes } from '@/mocks'
import { NoteDetail } from './NoteDetail'

export default {
  title: 'Pages/Note Detail',
  component: NoteDetail,
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
