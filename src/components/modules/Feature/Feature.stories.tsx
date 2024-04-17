import Feature from './Feature';
import frame from '/public/storybook-assets/frame-placeholder.jpg';
import {Document} from '@contentful/rich-text-types';
import type {Meta, StoryFn} from '@storybook/react';

import bodyRichText from '@/components/__stories__/bodyRichText.json';

const body = bodyRichText as Document;

const meta: Meta<typeof Feature> = {
  title: 'Modules/Feature',
  component: Feature,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {name: 'Eyebrow', control: 'text'},
    title: {name: 'Title', control: 'text'},
    body: {name: 'Body', control: 'object'},
    textSize: {name: 'Text size', options: ['default', 'small'], control: 'select'},
    textAlignment: {name: 'Text alignment', options: [false, 'bottom', 'top'], control: 'select'},
    vimeoId: {name: 'Vimeo video id', control: 'text'},
    vimeoBtnText: {name: 'Vimeo button text', control: 'text'},
    media: {name: 'Media', control: 'object'},
    mediaSide: {name: 'Media size', options: ['left', 'right'], control: 'select'},
    mediaFixedSize: {name: 'Media fixed size', control: 'boolean'},
    cta: {name: 'Call to action', control: 'object'},
    semanticLevel: {name: 'semantic level', options: ['h1', 'h2', 'h3'], control: 'select'},
  },
};

export default meta;

const defaultArgs = {
  eyebrow: 'Eyebrow',
  title: 'Headline',
  body: body,
  semanticLevel: 'h2',
  media: {
    src: frame.src,
    altText: 'image description',
    quality: 70,
    width: 962,
    height: 982,
    format: 'jpeg',
  },
};

const Template: StoryFn<typeof Feature> = (args) => {
  return <Feature {...args} />;
};

export const Buttons = Template.bind({});
Buttons.args = {
  ...defaultArgs,
  cta: [
    {
      'fields': {
        'text': 'Optional CTA',
        'url': 'https://google.com',
      },
    },
    {
      'fields': {
        'text': 'Optional CTA',
        'url': 'https://google.com',
      },
    },
  ],
};

export const Right = Template.bind({});
Right.args = {
  ...defaultArgs,
  mediaSide: 'Right',
};

export const Bottom = Template.bind({});
Bottom.args = {
  ...defaultArgs,
  textAlignment: 'Bottom',
};

export const Top = Template.bind({});
Top.args = {
  ...defaultArgs,
  textAlignment: 'Top',
};

// export const Video: Story = {
//   args: {
//     ...defaultArgs,
//     media: {
//         src: "https://cdn.coverr.co/videos/coverr-blurred-lights-3400/1080p.mp4",
//         altText: 'video',
//         quality: 70,
//         format: 'mp4',
//     }
//   },
// };

export const Fixed = Template.bind({});
Fixed.args = {
  ...defaultArgs,
  mediaFixedSize: true,
};

export const Vimeo = Template.bind({});
Vimeo.args = {
  ...defaultArgs,
  vimeoId: '359281775',
  vimeoBtnText: 'Watch Intro',
};

export const Embedded = Template.bind({});
Embedded.args = {
  ...defaultArgs,
}
