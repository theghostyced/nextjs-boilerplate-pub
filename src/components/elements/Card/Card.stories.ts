import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';
import styles from '@/components/modules/Multicard/Multicard.module.scss';
import frame from "/public/storybook-assets/frame-placeholder.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Elements/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {control: 'text', name: 'Eyebrow'},
    title: {control: 'text', name: 'Title'},
    body: {control: 'text', name: 'Body text'},
    figure: {control: 'object', name: 'Image/Video'},
    cta: {control: 'object', name: 'Call to action'},
    tag: {control: 'object', name: 'Tag'},
    variant: {control: 'select', options: ['small', 'big'], name: 'Variant'},
    btnIcon: {control: 'object', name: 'Button icon'},
  },
  args: {
    eyebrow: 'Eyebrow',
    tag: {label: 'Label'},
    title: 'Headline',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra consequat facilisis. Morbi lectus neque, luctus non interdum id, euismod et risus. Vivamus a mi maximus, sodales nisl id, consectetur justo.',
    figure: {
      src: frame.src,
      altText: 'frame',
      quality: 70,
      width: 2880,
      height: 1600,
      format: 'jpg',
    },
    cta: [{label: 'Label', url: 'https://www.google.fr'}],
    scope: 'storybook',
    scopeStyle: styles,
    semanticLevel: 'h2'
  }
} as Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    variant: 'small',
    btnModifiers: ['secondary', 'animated'],
  },
};

export const Big: Story = {
  args: {
    variant: 'big',
    btnModifiers: ['secondary'],
  },
};

