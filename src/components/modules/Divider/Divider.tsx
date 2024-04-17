import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import {IDividerFields} from '@/types/contentful';

import styles from './Divider.module.scss';

const Divider = (props: IDynamicComponent<IDividerFields>) => {
	const {theme} = props;
	const themeClass = theme ? `theme-${theme}` : '';

	return (
		<section className={cn('section', styles.divider, themeClass)}>
			<hr />
		</section>
	);
};

export default Divider;