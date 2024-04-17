import type { Meta, StoryObj } from '@storybook/react';

import Media from './Media';
import frame from "/public/storybook-assets/frame-placeholder.jpg";

// TODO: how to import public video assets
// import video from "/public/storybook-assets/video-placeholder.mp4";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Elements/Media',
  component: Media,
  tags: ['autodocs'],
  argTypes: {
    media: {control: 'object', name: 'Image/Video'},
    ratio: {control: 'select', options: ['auto', '16-9', '4-5', '1-1']},
  },
} as Meta<typeof Media>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Image: Story = {
  args: {
    media: {
        src: frame.src,
        altText: 'frame',
        quality: 70,
        width: 2880,
        height: 1600,
        format: 'jpg',
    }
  },
};

export const Video: Story = {
  args: {
    media: {
        src: "https://cdn.coverr.co/videos/coverr-blurred-lights-3400/1080p.mp4",
        altText: 'video',
        quality: 70,
        format: 'mp4',
    }
  },
};

