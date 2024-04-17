import { FC, ReactNode, createElement } from 'react';

interface WrapProps {
	if?: boolean;
	with: typeof createElement.arguments[0];
	wrapperProps: typeof createElement.arguments[1];
	children: NonNullable<ReactNode>;
}

const Wrap: FC<WrapProps> = ({
	if: condition,
	with: wrapper,
	wrapperProps,
	children,
}) =>
	condition ? createElement(wrapper, wrapperProps, [children]) : children;

export default Wrap;