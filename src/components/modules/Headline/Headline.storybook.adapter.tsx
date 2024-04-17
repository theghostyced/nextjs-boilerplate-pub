import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import lazyLoadComponent from '@/utils/lazyLoadComponent';

export type IHeadlineProps = {
  eyebrow?: string;
  title?: any;
  body?: any;
  alignment?: string;
  semanticLevel?: any;
  cta?: any;
  alignmentClass?: string;
};

const WrappedHeadlineComponent = lazyLoadComponent<IHeadlineProps>('Headline');

const Headline = (props: IDynamicComponent<IHeadlineProps>) => {
    const {storybookArgs} = props;
    
    const alignmentClass =
        storybookArgs?.alignment == 'center'
        ? `headline--${storybookArgs?.alignment}`
        : '';

    return (
        <WrappedHeadlineComponent
        semanticLevel={storybookArgs?.semanticLevel}
        eyebrow={storybookArgs?.eyebrow}
        title={storybookArgs?.title}
        body={storybookArgs?.body}
        alignmentClass={alignmentClass}
        cta={storybookArgs?.cta}
        />
    );
};

export default Headline;
