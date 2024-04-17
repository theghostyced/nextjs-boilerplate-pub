import Hero from './Hero';
import {Document} from '@contentful/rich-text-types';
import type {Meta, StoryObj} from '@storybook/react';

import {backgroundImage, backgroundVideo} from '@/components/__stories__/background.js';
import bodyRichText from '@/components/__stories__/bodyRichText.json';

const body = bodyRichText as Document;

const meta: Meta<typeof Hero> = {
  title: 'Modules/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {name: 'Eyebrow', control: 'text'},
    title: {name: 'Title', control: 'text'},
    body: {name: 'Body', control: 'object'},
    cta: {name: 'Call to action', control: 'object'},
    background: {name: 'Background', control: 'object'},
    height: {name: 'Height', control: 'select', options: ['media', 'auto']},
    semanticLevel: {
      name: 'semantic level',
      options: ['h1', 'h2', 'h3'],
      control: 'select',
      description: 'sets the html heading level of this module',
    },
  },
  args: {
    title: 'Display Text',
    body: body,
    semanticLevel: 'h2',
    cta: [
      {
        'fields': {
          'text': 'Link',
          'url': 'https://fictivekin.com',
        },
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Image: Story = {
  args: {
    background: backgroundImage,
  },
  render: (args) => <Hero {...args} />,
};

export const Video: Story = {
  args: {
    background: backgroundVideo,
  },
  render: (args) => <Hero {...args} />,
};
