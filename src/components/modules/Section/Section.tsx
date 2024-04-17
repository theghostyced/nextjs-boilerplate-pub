import styles from './Section.module.scss';
import cn from 'classnames';
import DynamicComponent from '@/components/DynamicComponent/DynamicComponent';
import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import {ISectionFields} from '@/types/contentful';

type ISectionList =
  	| IAccordion
	| IComparisonTable
	| IHero
	| ILogoCloud
	| IMulticard
	| IPostList
	| IText;

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

const Section = (props: IDynamicComponent<ISectionFields>) => {
	const {
		theme, 
		modules,
		flatHierarchy
	} = props;

	const themeClass = theme ? `theme-${theme}` : '';

	return (
		<section className={cn(styles.section, themeClass)}>
		    <div className="container">
		    	{modules &&
					<Sections sections={modules} />
				}
		    </div>
		</section>
	)
}

export default Section;