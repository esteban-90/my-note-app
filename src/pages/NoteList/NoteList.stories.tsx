import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { NoteList } from './NoteList'

export default {
  title: 'Pages/Note List',
  component: NoteList,
  parameters: {
    reactRouter: {
      routePath: '/',
    },
  },
} as ComponentMeta<typeof NoteList>

const Template: ComponentStory<typeof NoteList> = () => <NoteList />

export const NoteListExample = Template.bind({})
