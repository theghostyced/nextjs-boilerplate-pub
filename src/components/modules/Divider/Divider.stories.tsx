import Divider from './Divider';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Hero> = {
  title: 'Modules/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => <Divider {...args} />,
};
