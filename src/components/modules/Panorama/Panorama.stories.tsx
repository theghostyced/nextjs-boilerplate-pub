import Panorama from './Panorama';
import panoramaImages from './__stories__/panoramaImages';
import * as HeadlineStory from '@/components/modules/Headline/Headline.stories.tsx';
import type {Meta, StoryFn} from '@storybook/react';

export default {component: Panorama};
const meta: Meta<typeof Panorama> = {
  title: 'Modules/Panorama',
  component: Panorama,
  tags: ['autodocs'],
  argTypes: {
    images: {name: 'Images', control: 'object'},
    ratio: {name: 'Ratio', control: 'select', options: ['auto', '1-1', '4-5', '16-9']},
  },
};

const Template: StoryFn<typeof Panorama> = (args) => {
  return <Panorama {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  images: panoramaImages,
  ratio: '16-9',
};


export const WithHeadline = Template.bind({});
WithHeadline.args = {
  images: panoramaImages,
  ratio: '1-1',
  headline: {...HeadlineStory.Embedded.args}
}