import Headline from './Headline';
import {Document} from '@contentful/rich-text-types';
import type {Meta, StoryFn} from '@storybook/react';

import bodyRichText from '@/components/__stories__/bodyRichText.json';

const body = bodyRichText as Document;

const meta: Meta<typeof Headline> = {
  title: 'Modules/Headline',
  component: Headline,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {name: 'Eyebrow', control: 'text'},
    title: {name: 'Title', control: 'text'},
    body: {name: 'Body', control: 'object'},
    alignment: {name: 'Alignment', control: 'select', options: ['left', 'center']},
    cta: {name: 'Call to actions - primary', control: 'object'},
    isEmbedded: {name: 'Is Embedded', control: 'boolean'},
    semanticLevel: {
      name: 'semantic level',
      options: ['h1', 'h2', 'h3'],
      control: 'select',
      description: 'sets the html heading level of this module',
    },
  },
  args: {
    theme: {
      table: {
        disable: true,
      }
    },
    eyebrow: 'Eyebrow',
    title: 'Headline Text',
    body: body,
    semnaticLevel: 'h3',
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
  },
};

const defaultArgs = {
    theme: {
      table: {
        disable: true,
      }
    },
    eyebrow: 'Eyebrow',
    title: 'Headline Text',
    body: body,
    semnaticLevel: 'h3',
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
  }

export default meta;

const Template: StoryFn<typeof Headline> = (args) => {
  return <Headline {...args} />;
};

export const Embedded = Template.bind({});
Embedded.args = {
  ...defaultArgs,
  isEmbedded: true
}

export const Left = Template.bind({});
Left.args = {
  alignment: 'left',
};

export const Center = Template.bind({});
Center.args = {
  alignment: 'center',
};
