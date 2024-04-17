import {HTMLAttributes, createElement} from 'react';

export type SemanticLevelType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: SemanticLevelType;
}

const Heading = (props: HeadingProps) => {
  const {level, children, className} = props;
  const SemanticHeading = level || 'h1';

  return (
    <SemanticHeading className={className} {...props}>
      {children}
    </SemanticHeading>
  );
};

export default Heading;
