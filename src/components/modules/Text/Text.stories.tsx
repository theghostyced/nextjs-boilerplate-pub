import Text from './Text';
import type {Meta, StoryObj} from '@storybook/react';

import bodyRichText from '@/components/__stories__/bodyRichText.json';

const body = bodyRichText as Document;

const meta: Meta<typeof Hero> = {
  title: 'Modules/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {name: 'Eyebrow', control: 'text'},
    title: {name: 'Title', control: 'text'},
    text: {name: 'Text', control: 'object'},
    textLayout: {name: 'Text Layout', options: ['one-column', 'two-columns'], control: 'select'},
    semanticLevel: {
      name: 'semantic level',
      options: ['h1', 'h2', 'h3'],
      control: 'select',
      description: 'sets the html heading level of this module',
    },
  },
  args: {
    title: 'Display Text',
    text: body,
    semanticLevel: 'h2',
    textLayout: 'one-column',
    theme: 'light'
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  render: (args) => <Text {...args} />,
};
