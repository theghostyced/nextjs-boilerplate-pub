import styles from './Text.module.scss';
import Heading from '@/components/elements/Heading/Heading';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import {ITextFields} from '@/types/contentful';
import {richTextParse} from '@/utils/richTextParser';

const Text = (props: IDynamicComponent<ITextFields>) => {
	const {
		eyebrow,
		title,
		text,
		textLayout,
		semanticLevel
	} = props;

	const textLayoutClass = textLayout == 'two-columns' ? `text-module--${textLayout}` : 'text-module--one-column';
	return (
		<section className="section">
			<div className="container">
				<article className={cn('text-module', 'grid', styles['text-module'], textLayoutClass)}>
					<hgroup className={cn(styles['text-module__header'], 'u-mb--space-4')}>
						{eyebrow &&
							<p className="type-eyebrow-3">{ eyebrow }</p>
						}

						{title &&
							<Heading
				              level={semanticLevel}
				              className={cn(styles['text-module__title'], 'type-display-3')}
				            >
				              {title}
				            </Heading>
						}
					</hgroup>

					{text &&
						<div className={cn(styles['text-module__text'], 'text', 'stack')}>
			              {documentToReactComponents(text, richTextParse)}
			            </div>
					}
				</article>
			</div>
		</section>
	)
}

export default Text;