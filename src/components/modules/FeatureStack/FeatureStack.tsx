import {IDynamicComponent} from '../../DynamicComponent/DynamicComponent.types';
import {IFeatureStackFields, IFeatureFields} from '@/types/contentful';
import styles from './FeatureStack.module.scss';
import cn from 'classnames';

import Headline from '@/components/modules/Headline/Headline';
import Feature from '@/components/modules/Feature/Feature';
import slugifyString from '@/utils/slugify';

const FeatureStack = (props: IDynamicComponent<IFeatureStackFields>) => {
	const {
		sectionId,
		theme,
		eyebrow,
		title,
		body,
		features,
		semanticLevel = 'h2'
	} = props;
console.log(features.length);
	const themeClass = theme ? `theme-${theme}` : '';
	const mediaSide = slugifyString(features[0].mediaSide) || "right";

	return (
		<section 
			id={sectionId}
			className={cn('section', styles.featureStack, themeClass)}
		>
			
			{(title || body) &&
				<Headline 
					eyebrow={eyebrow} 
					title={title} 
					body={body}
				/>
			}

			{features && (
				<ul className={cn(styles.featureStack__list)}>
					{features.map((feature: any, index: number) => (
						<li key={index}>
							<Feature 
								title={feature.title}
		                        eyebrow={feature.eyebrow}
		                        body={feature.body}
		                        textSize={feature.textSize}
		                        textAlignment={feature.textAlignment}
		                        theme={feature.theme}
		                        media={feature.media}
		                        mediaSide={mediaSide}
		                        vimeoId={feature.vimeoId}
		                        vimeoBtnText={feature.vimeoBtnText}
		                        cta={feature.cta}
		                        ctaIcon={feature.ctaIcon}
		                        ctaModifiers={feature.ctaModifiers}
		                        mediaFixedSize={feature.mediaFixedSize}
		                        semanticLevel={semanticLevel}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}

export default FeatureStack;