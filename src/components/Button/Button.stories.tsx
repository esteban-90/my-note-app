import type { ComponentStoryObj, ComponentMeta } from '@storybook/react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

const argType = { control: false }

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    style: {
      top: '10%',
      left: '10%',
    },
  },
  argTypes: {
    style: argType,
    icon: argType,
    component: argType,
    to: argType,
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
    icon: 'globe',
    title: 'Change language',
  },
}

export const HomeButtonExample: ComponentStoryObj<typeof Button> = {
  args: {
    icon: 'arrow-left',
    component: Link,
    to: '/',
    title: 'Back',
  },
}
