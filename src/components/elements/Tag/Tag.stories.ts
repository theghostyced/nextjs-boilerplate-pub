import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';
import { markdownToReactElement } from "@/utils/markdownParser";
const arrowRight = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" d="m8.4 8.4 7.2 7.2m0-7.2-7.2 7.2"/></svg>';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Elements/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {control: 'text'},
    url: {control: 'text'},
    icon: {control: 'object'},
    modifiers: {control: 'object'},
  },
  args: {
    label: 'Label',
  }
} as Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const Link: Story = {
  args: {
    modifiers: ['link'],
    url: 'https://google.com/',
  },
};

export const Icon: Story = {
  args: {
    modifiers: ['link'],
    url: 'https://google.com/',
    icon: markdownToReactElement(arrowRight)
  },
};