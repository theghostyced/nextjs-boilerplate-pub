import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Elements/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {name: 'Label', control: 'text'},
    url: {name: 'Url', control: 'text'},
    blank: {name:'Open in a new window', control: 'boolean'},
    modifiers: {name: 'modifiers', description: 'an array of modifiers'},
    isTrueButton: {control: 'boolean'},
    isJsButton: {control: 'boolean'},
    customClass: {control: 'text'},
  },
  args: {
    label: 'Button',
    url: 'https://google.com/',
    blank: false,
    isTrueButton: false,
    isJsButton: false,
  }
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    modifiers: ['secondary'],
  },
};

export const Animated: Story = {
  args: {
    modifiers: ['animated'],
  },
};

export const Link: Story = {
  args: {
    modifiers: ['text'],
  },
};