import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { mockNotes } from '@/mocks'
import { NoteItem } from './NoteItem'

export default {
  title: 'Components/Note Item',
  component: NoteItem,
  args: mockNotes[0],
} as ComponentMeta<typeof NoteItem>

const Template: ComponentStory<typeof NoteItem> = (args) => <NoteItem {...args} />

export const NoteItemExample = Template.bind({})
