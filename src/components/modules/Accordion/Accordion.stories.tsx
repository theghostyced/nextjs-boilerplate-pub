import Accordion from './Accordion';
import accordionItems from './__stories__/accordionItems';
import {Document} from '@contentful/rich-text-types';
import type {Meta, StoryFn} from '@storybook/react';
import * as HeadlineStory from '@/components/modules/Headline/Headline.stories.tsx';

const meta: Meta<typeof Accordion> = {
  title: 'Modules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    semanticLevel: {
      name: 'semantic level',
      options: ['h1', 'h2', 'h3'],
      control: 'select',
      description: 'sets the html heading level of this module',
    },
  },
};

export default meta;

const Template: StoryFn<typeof Accordion> = (args) => {
  return <Accordion {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  items: accordionItems,
  semanticLevel: 'h2',
};


export const WithHeadline = Template.bind({});
WithHeadline.args = {
  items: accordionItems,
  headline: {...HeadlineStory.Embedded.args}
}