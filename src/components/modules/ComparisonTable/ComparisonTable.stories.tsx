import ComparisonTable from './ComparisonTable';
import {Document} from '@contentful/rich-text-types';
import type {Meta, StoryFn} from '@storybook/react';

import tableRichText from '@/components/__stories__/tableRichText.json';
import * as HeadlineStory from '@/components/modules/Headline/Headline.stories.tsx';

const body = tableRichText as Document;

const meta: Meta<typeof ComparisonTable> = {
  title: 'Modules/ComparisonTable',
  component: ComparisonTable,
  tags: ['autodocs'],
  argTypes: {
    table: {name: 'Table', control: 'object'},
  },
};

export default meta;

const Template: StoryFn<typeof ComparisonTable> = (args) => {
  return <ComparisonTable {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  table: body
};

export const WithHeadline = Template.bind({});
WithHeadline.args = {
  table: body,
  headline: {...HeadlineStory.Embedded.args}
}
