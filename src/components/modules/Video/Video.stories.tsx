import Video from './Video';
import type {Meta, StoryFn} from '@storybook/react';

import {posterImage} from '@/components/__stories__/background.js';
import * as HeadlineStory from '@/components/modules/Headline/Headline.stories.tsx';

const meta: Meta<typeof Video> = {
  title: 'Modules/Video',
  component: Video,
  tags: ['autodocs'],
  argTypes: {
    url: {name: 'Video url', control: 'text'},
    poster: {
      name: 'Poster',
      control: 'object',
      description: 'A fallback poster image',
    },
    thumbnail: {
      name: 'Poster',
      control: 'object',
      description: 'A fallback poster image',
    },
    openInModal: {
      name: 'Open in modal',
      control: 'boolean',
    },
    title: {name: 'Title', control: 'text'},
  },
  args: {
    url: 'https://vimeo.com/58291553',
  },
};

export default meta;

const Template: StoryFn<typeof Video> = (args) => {
  return <Video {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Modal = Template.bind({});
Modal.args = {
  openInModal: true,
  poster: {
    'metadata': {
      'tags': [],
    },
    'sys': {
      'space': {
        'sys': {
          'type': 'Link',
          'linkType': 'Space',
          'id': 'jh1n7xpsj7g4',
        },
      },
      'type': 'Asset',
      'id': '5Y6d0BGV8uMR7OKHBX0q5O',
      'revision': 0,
      'createdAt': '2024-01-26T16:51:11.872Z',
      'updatedAt': '2024-01-26T16:51:20.970Z',
      'environment': {
        'sys': {
          'id': 'master',
          'type': 'Link',
          'linkType': 'Environment',
        },
      },
      'locale': 'en',
    },
    'fields': {
      'title': 'video-bg',
      'description': '',
      'file': {
        'url':
          '//images.ctfassets.net/jh1n7xpsj7g4/5Y6d0BGV8uMR7OKHBX0q5O/820db1b20f4fdfdf4be8dcefe1cb7ca7/video-bg.jpg',
        'details': {
          'size': 1231762,
          'image': {
            'width': 3616,
            'height': 1844,
          },
        },
        'fileName': 'video-bg.jpg',
        'contentType': 'image/jpeg',
      },
    },
  },
};

export const WithHeadline = Template.bind({});
WithHeadline.args = {
  url: 'https://vimeo.com/58291553',
  headline: {...HeadlineStory.Embedded.args}
}