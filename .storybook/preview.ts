import type {Preview} from '@storybook/react';
import '@/scss/screen.scss';

const preview: Preview = {
  argTypes: {
    id: {name: 'Section ID', control: 'text'},
    theme: {name: 'Theme', options: [false, 'dark', 'light'], control: 'select'}
  },
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Documentation',
          ['Introduction', '*'],
          'Elements',
          'Modules',
          ['Nav', 'Footer', '*'],
          '*',
        ]
      }
    }
  },
};

export default preview;
