import {IDynamicComponent} from './DynamicComponent.types';

import * as Adapters from '@/components/moduleImports';

const CONTENT_TYPE_MAP = {};

// eslint-disable-next-line guard-for-in
for (const property in Adapters) {
  // @ts-ignore
  CONTENT_TYPE_MAP[property] = Adapters[property];
}

const DynamicComponent = ({entry, index, semanticLevel, preload, posts}: IDynamicComponent<any>) => {
  const contentType = entry.sys.contentType.sys.id;

  if (!contentType) {
    console.error('Could not determine contentType from entry: ', entry);
    return null;
  }

  // @ts-ignore
  const Component = CONTENT_TYPE_MAP[contentType];

  if (!Component) {
    console.error(`No matching component was found for: ${contentType}.`);
    return null;
  }

  return (
    <Component
      {...entry.fields}
      id={entry.sys.id}
      index={index}
      semanticLevel={semanticLevel}
      preload={preload}
      posts={posts}
    />
  );
};

export default DynamicComponent;
