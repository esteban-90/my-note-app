import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    icon: { control: false },
    component: { control: false },
    to: { control: false },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const NewNoteButtonExample = Template.bind({})
NewNoteButtonExample.args = {
  icon: 'add',
  component: Link,
  to: '/notes',
  title: 'New note',
}

export const DayModeButtonExample = Template.bind({})
DayModeButtonExample.args = {
  icon: 'sun',
  title: 'Day mode',
}

export const NightModeButtonExample = Template.bind({})
NightModeButtonExample.args = {
  icon: 'moon',
  title: 'Night mode',
}

export const LanguageButtonExample = Template.bind({})
LanguageButtonExample.args = {
  icon: 'language',
  title: 'Change language',
}

export const HomeButtonExample = Template.bind({})
HomeButtonExample.args = {
  icon: 'house',
  component: Link,
  to: '/',
  title: 'Back to home',
}
