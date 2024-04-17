import styles from './Quote.module.scss';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import Media from '@/components/elements/Media/Media';
import {IQuoteFields} from '@/types/contentful';
import {formatImage} from '@/utils/formatMedia';
import {IMediaProps} from '@/utils/responsiveImg';
import {richTextParse} from '@/utils/richTextParser';

export type IQuoteProps = {
  theme?: string;
  alignment?: string;
  body: React.ReactNode;
  citation?: string;
  citationDescriptor?: string;
  image?: IMediaProps;
  ratio?: any;
};

const Quote = (props: IDynamicComponent<IQuoteFields>) => {
  const {
    theme, 
    image, 
    text, 
    alignment, 
    citation, 
    citationDescriptor, 
    imageAspectRatio
  } = props;
  
  const figure = formatImage(image!);
  const body = documentToReactComponents(text, richTextParse);
  const themeClass = theme ? `theme-${theme}` : '';
  const alignmentClass = alignment ? `quote--${alignment}` : '';

  return (
    <section className={cn('section', styles.quote, styles[`${alignmentClass}`], themeClass)}>
      <figure className="grid">
        {figure && (
          <div className={cn(styles.quote__media)}>
            <Media media={figure} ratio={imageAspectRatio} />
          </div>
        )}

        <div className={cn(styles.quote__content)}>
          {body && (
            <blockquote className={cn(styles.quote__text, 'stack', 'type-subhead-1')}>
              {body}
            </blockquote>
          )}

          {(citation || citationDescriptor) && (
            <figcaption className={cn(styles.quote__caption)}>
              {citation && <div className={cn(styles.quote__citation)}>{citation}</div>}
              {citationDescriptor && (
                <div className={cn(styles.quote__citationDescriptor)}>{citationDescriptor}</div>
              )}
            </figcaption>
          )}
        </div>
      </figure>
    </section>
  );
};

export default Quote;
