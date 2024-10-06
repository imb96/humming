import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

// import { Button } from './Button'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'sm',
  },
}
