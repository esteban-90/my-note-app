import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
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

export const NewNoteButtonExample: ComponentStoryObj<typeof Button> = {
  args: {
    icon: 'add',
    component: Link,
    to: '/notes',
    title: 'New note',
  },
}

export const DayModeButtonExample: ComponentStoryObj<typeof Button> = {
  args: {
    icon: 'sun',
    title: 'Day mode',
  },
}

export const NightModeButtonExample: ComponentStoryObj<typeof Button> = {
  args: {
    icon: 'moon',
    title: 'Night mode',
  },
}

export const LanguageButtonExample: ComponentStoryObj<typeof Button> = {
  args: {
    icon: 'language',
    title: 'Change language',
  },
}

export const HomeButtonExample: ComponentStoryObj<typeof Button> = {
  args: {
    icon: 'house',
    component: Link,
    to: '/',
    title: 'Back to home',
  },
}
