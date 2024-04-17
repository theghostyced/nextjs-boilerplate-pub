import FeatureStack from './FeatureStack';
import {Document} from '@contentful/rich-text-types';
import type {Meta, StoryFn} from '@storybook/react';

import bodyRichText from '@/components/__stories__/bodyRichText.json';
import * as FeatureStory from '@/components/modules/Feature/Feature.stories.tsx';

const featureArgs = {...FeatureStory.Embedded.args};
const body = bodyRichText as Document;

const meta: Meta<typeof FeatureStack> = {
  title: 'Modules/FeatureStack',
  component: FeatureStack,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {name: 'Eyebrow', control: 'text'},
    title: {name: 'Title', control: 'text'},
    body: {name: 'Body', control: 'object'},
    features: {name: 'Features', control: 'object'},
    semanticLevel: {name: 'semantic level', options: ['h1', 'h2', 'h3'], control: 'select'}
  },
  args: {
    eyebrow: 'Eyebrow',
    title: 'Headline',
    body: body,
    semanticLevel: 'h2',
    features: [{...FeatureStory.Embedded.args, ...FeatureStory.Right.args}]
  },
};

export default meta;

const Template: StoryFn<typeof FeatureStack> = (args) => {
  return <FeatureStack {...args} />;
};

export const Default = Template.bind({});
Default.args = {};