import path from 'path';
import type {StorybookConfig} from '@storybook/nextjs';

const config: StorybookConfig = {
  'stories': [
    '../src/components/@(elements|layouts|modules)/**/*.mdx', 
    '../src/components/@(elements|layouts|modules)/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  'staticDirs': ['../public'],
  'framework': {
    'name': '@storybook/nextjs',
    'options': {},
  },
  'docs': {
    'autodocs': 'tag',
    'defaultName': 'Documentation'
  },
  webpackFinal: async (config, {configType}) => {
    config.resolve.alias['@/components/modules'] = path.resolve(__dirname, '../src/components/modules')

    return config;
  }
};
export default config;
