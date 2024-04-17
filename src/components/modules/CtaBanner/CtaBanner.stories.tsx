import CtaBanner from './CtaBanner';
import {Document} from '@contentful/rich-text-types';
import type {Meta, StoryFn} from '@storybook/react';

import bodyRichText from '@/components/__stories__/bodyRichText.json';

const body = bodyRichText as Document;

const meta: Meta<typeof CtaBanner> = {
  title: 'Modules/Cta Banner',
  component: CtaBanner,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {name: 'Eyebrow', control: 'text'},
    title: {name: 'Title', control: 'text'},
    body: {name: 'Body', control: 'object'},
    alignment: {name: 'Alignment', control: 'select', options: ['left', 'center']},
    cta: {name: 'Call to action', control: 'object'},
    semanticLevel: {
      name: 'semantic level',
      options: ['h1', 'h2', 'h3'],
      control: 'select',
      description: 'sets the html heading level of this module',
    },
  },
  args: {
    title: 'Display',
    eyebrow: 'Our Mission',
    body: body,
    cta: [
      {
        'fields': {
          'text': 'Optional CTA',
          'url': 'https://google.com',
        },
      },
      {
        'fields': {
          'text': 'Optional CTA',
          'url': 'https://google.com',
        },
      },
    ],
    semanticLevel: 'h2',
  },
};

export default meta;

const Template: StoryFn<typeof CtaBanner> = (args) => {
  return <CtaBanner {...args} />;
};

export const Left = Template.bind({});
Left.args = {
  alignment: 'left',
};

export const Center = Template.bind({});
Center.args = {
  alignment: 'center',
};
