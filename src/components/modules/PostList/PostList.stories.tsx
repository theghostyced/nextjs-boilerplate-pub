import PostList from './PostList';
import * as HeadlineStory from '@/components/modules/Headline/Headline.stories.tsx';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof List> = {
  title: 'Modules/Post List',
  component: PostList,
  tags: ['autodocs'],
  argTypes: {
    sort: {name: 'Sort', control: 'select', options: ['title', 'publishedOn', undefined]},
    order: {name: 'Order', control: 'select', options: ['asc', 'desc', undefined]},
    limit: {name: 'Limit', control: 'number'},
  },
  args: {
    sort: 'title',
    order: 'asc'
  },
};

export default meta;

const Template: StoryFn<typeof PostList> = (args) => {
  return <PostList {...args} />;
};

export const WithHeadline = Template.bind({});
WithHeadline.args = {
  headline: {...HeadlineStory.Embedded.args}
}