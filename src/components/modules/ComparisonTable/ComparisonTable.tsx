import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import {IComparisonTableFields} from '@/types/contentful';
import {richTextParse} from '@/utils/richTextParser';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import styles from './ComparisonTable.module.scss';

import Headline from '@/components/modules/Headline/Headline';
import {flatHeadlineProps} from '@/utils/remapedHeadline';

const ComparisonTable = (props: IDynamicComponent<IComparisonTableFields>) => {
	const {
		theme,
		sectionId,
		headline,
		table
	} = props;

	const themeClass = theme ? `theme-${theme}` : '';
	const headlineProps = flatHeadlineProps(headline);

	return (
		<section 
		id={sectionId}
		className={cn('section', styles.comparisonTable, themeClass)}>
			{headline && (
		        <Headline
		          {...headlineProps}
		        />
		    )}

			<div className="container">
		        <div className="text">
		            {documentToReactComponents(table, richTextParse)}
		        </div>
		    </div>
		</section>
	);
};

export default ComparisonTable;