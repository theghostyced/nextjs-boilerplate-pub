import List from './List';
import listItems from './__stories__/listItems';
import * as HeadlineStory from '@/components/modules/Headline/Headline.stories.tsx';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof List> = {
  title: 'Modules/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    items: {name: 'List items', control: 'object'},
    showIndex: {name: 'Show index', control: 'boolean'},
    variant: {name: 'Variant', control: 'select', options: ['One column', 'Two columns']},
  },
  args: {
    items: listItems,
    showIndex: true
  },
};

export default meta;

const Template: StoryFn<typeof List> = (args) => {
  return <List {...args} />;
};

export const OneColumn = Template.bind({});
OneColumn.args = {
  variant: 'One column',
};

export const TwoColumn = Template.bind({});
TwoColumn.args = {
  variant: 'Two columns',
};

export const WithHeadline = Template.bind({});
WithHeadline.args = {
  items: listItems,
  headline: {...HeadlineStory.Embedded.args}
}