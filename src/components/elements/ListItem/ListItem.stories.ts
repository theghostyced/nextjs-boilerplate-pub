import type { Meta, StoryObj } from '@storybook/react';
import ListItem from './ListItem';
import styles from '@/components/modules/List/List.module.scss';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Elements/List Item',
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    title: {name: 'Title', control: 'text'},
    body: {name: 'Body', control: 'text'},
    cta: {name: 'Call to action', control: 'object'},
    htmlTag: {name: 'Html tag', control: 'text'},
  },
  args: {
    title: 'Title',
    body: 'Supporting line text',
    scopeStyle: styles
  }
} as Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const Link: Story = {
  args: {
    cta: [{text: 'Link', url: 'https://www.google.fr'}],
    htmlTag: 'div',
  },
};