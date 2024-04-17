// @ts-nocheck
import LogoCloud from './LogoCloud';
import LogoCloudImages from './__stories__/logoCloudImages';
import * as HeadlineStory from '@/components/modules/Headline/Headline.stories.tsx';
import type {Meta, StoryFn} from '@storybook/react';

const meta: Meta<typeof LogoCloud> = {
  title: 'Modules/Logo Cloud',
  component: LogoCloud,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {name: 'Eyebrow', control: 'text'},
    images: {name: 'Images', table: {category: 'Advanced'}},
    mobileCount: {name: 'Mobile Count', control: 'number', table: {category: 'Advanced'}},
  },
  args: {
    images: LogoCloudImages.slice(0, 4),
    semanticLevel: 'h2',
  },
};

export default meta;

const Template: StoryFn<typeof LogoCloud> = (args) => {
  return <LogoCloud {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Mobile = Template.bind({});
Mobile.args = {
  images: LogoCloudImages,
};

export const WithHeadline = Template.bind({});
WithHeadline.args = {
  images: LogoCloudImages,
  headline: {...HeadlineStory.Embedded.args}
}