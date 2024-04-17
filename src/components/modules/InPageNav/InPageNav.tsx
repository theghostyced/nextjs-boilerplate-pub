import cn from 'classnames';
import Link from 'next/link';
import styles from './InPageNav.module.scss';
import Heading from '@/components/elements/Heading/Heading';
import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import DynamicComponent from '@/components/DynamicComponent/DynamicComponent';
import {IInPageNavFields} from '@/types/contentful';
import {remapSectionLinks} from "@/utils/remapSectionLinks";

type ISectionList =
  	| IAccordion
	| ICareersList
	| IComparisonTable
	| ICtaBanner
	| IFeature
	| IFeatureStack
	| IHeadline
	| IHero
	| IList
	| ILogoCloud
	| IMarketoForm
	| IMulticard
	| IPanorama
	| IPostList
	| IQuote
	| IText
	| IVideo;

type IProps = {
  sections: ISectionList[] | undefined;
};

const Sections = (props: IProps) => {
  return props.sections?.map((section: ISectionList, index: number) => {
    const semanticLevel = index === 0 ? 'h1' : 'h2';
    const preload = index <= 3;

    return (
      <DynamicComponent
        key={`module-${index}`}
        entry={section}
        index={index}
        semanticLevel={semanticLevel}
        preload={preload}
      />
    );
  });
};

const InPageNav = (props: IDynamicComponent<IInPageNavFields>) => {
	const {
		sectionId,
		theme,
		title,
		sectionLinks,
		layout = 'horizontal',
		semanticLevel = 'h2'
	} = props;

	const navLinks = remapSectionLinks(sectionLinks);
	const themeClass = theme ? `theme-${theme}` : '';
	const layoutClass = layout != 'horizontal' ? `in-page-nav--${layout}` : '';
	const layoutListClass = layout != 'horizontal' ? `in-page-nav__list--${layout}` : 'in-page-nav__list--horizontal';

	return (
		<section
			id={sectionId}
			className={cn(themeClass)}
		>
			{navLinks &&
				<div className={'section', styles[`${layoutClass}`]}>
					<nav className={cn(styles['in-page-nav'])}>
						{title &&
							<Heading level={semanticLevel} className={cn('type-eyebrow-3', styles['in-page-nav__title'])}>{ title }</Heading>
						}
						<ul className={cn(styles['in-page-nav__list'], styles[`${layoutListClass}`])}>
							{navLinks.map((link, index) => {
								return (
									<li key={index} className={cn(styles['in-page-nav__item'])}>
										<Link href={`#${link.id}`} className={cn(styles['in-page-nav__link'])}>{ link.inPageNavTitle || link.title }</Link>
									</li>
								)
							})}
						</ul>
					</nav>
				</div>
			}
			{sectionLinks &&
				<Sections sections={sectionLinks} />
			}
		</section>
	)
}

export default InPageNav;