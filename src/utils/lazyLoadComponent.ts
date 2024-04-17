import dynamic from 'next/dynamic';

// TODO: Add comments about this funtion
const lazyLoadComponent = <T>(componentName: string) => {
  const Component = dynamic<T>(
    () =>
      import(`@/components/modules/${componentName}/${componentName}`).then(
        (component) => component.default,
      ),
    {ssr: false},
  );

  return Component;
};

export default lazyLoadComponent;
