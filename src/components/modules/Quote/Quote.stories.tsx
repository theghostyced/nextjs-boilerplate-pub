// @ts-nocheck
import Quote from './Quote';
import quoteText from '@/components/__stories__/bodyRichText.json';
import frame from '/public/storybook-assets/frame-placeholder.jpg';
import {Document} from '@contentful/rich-text-types';
import type {Meta, StoryFn} from '@storybook/react';

const text = quoteText as Document;

const meta: Meta<typeof Quote> = {
  title: 'Modules/Quote',
  component: Quote,
  tags: ['autodocs'],
  argTypes: {
    alignment: {
      name: 'Alignment',
      options: ['left', 'center'],
      control: 'select',
      description: 'Sets the horizontal alignment of text in the module',
    },
    citation: {
      name: 'Citation',
      control: 'text',
      description: "The source of the quote, typically a person's name",
    },
    citationDescriptor: {
      name: 'Citation Descriptor',
      control: 'text',
      description: 'Additional information about the citation, typically a company or job title',
    },
    image: {
      name: 'Image',
      description:
        'An optional image that appears alongside the quote, commonly a headshot or company logo',
    },
    text: {
      name: 'Body',
      control: 'object',
      description:
        'The quoted text. Quotation marks will be added automatically and should not be included.',
    },
  },
  args: {
    text: text,
    citation: 'Lauren Ipsum',
    citationDescriptor: 'Info',
  },
};

export default meta;

const Template: StoryFn<typeof Quote> = (args) => {
  return <Quote {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Center = Template.bind({});
Center.args = {
  alignment: 'center',
};

export const Image = Template.bind({});
Image.args = {
  image: {
    src: frame.src,
    altText: 'image description',
    quality: 70,
    width: 2000,
    height: 1400,
    format: 'jpeg',
  },
  ratio: '1-1',
};
