import Multicard from './Multicard';
import MulticardItems from './__stories__/multicardItems';
import * as HeadlineStory from '@/components/modules/Headline/Headline.stories.tsx';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof Multicard> = {
  title: 'Modules/Multicard',
  component: Multicard,
  tags: ['autodocs'],
  argTypes: {
    multicardItems: {name: 'Items', control: 'object', table: {category: 'Advanced'}},
  },
  args: {
    semanticLevel: 'h2',
    multicardItems: MulticardItems,
  },
};

export default meta;

const Template: StoryFn<typeof Multicard> = (args) => {
  return <Multicard {...args} />;
};

export const Column = Template.bind({});
Column.args = {
  variant: 'column',
};

export const Grid = Template.bind({});
Grid.args = {
  variant: 'grid',
};

export const Carousel = Template.bind({});
Carousel.args = {
  variant: 'carousel',
};

export const WithHeadline = Template.bind({});
WithHeadline.args = {
  multicardItems: MulticardItems,
  variant: 'carousel',
  headline: {...HeadlineStory.Embedded.args}
}
