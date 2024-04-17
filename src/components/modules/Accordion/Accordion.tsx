import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import Heading from '@/components/elements/Heading/Heading';
import {Minus, Plus} from '@/components/elements/Icons/Icons';
import Media from '@/components/elements/Media/Media';
import styles from '@/components/modules/Accordion/Accordion.module.scss';
import {IAccordionFields} from '@/types/contentful';
import {formatImage} from '@/utils/formatMedia';
import {richTextParse} from '@/utils/richTextParser';

import Headline from '@/components/modules/Headline/Headline';
import {flatHeadlineProps} from '@/utils/remapedHeadline';

const Accordion = (props: IDynamicComponent<IAccordionFields>) => {
  const {
    sectionId, 
    theme, 
    headline, 
    items, 
    semanticLevel
  } = props;

  const themeClass = theme ? `theme-${theme}` : '';

  const headlineProps = flatHeadlineProps(headline);

  const accordionItems = items?.map((item: any) => {
    const media = item.fields.media?.fields.image;

    return {
      media: media ? formatImage(media) : undefined,
      title: item.fields.content.fields.title,
      body: documentToReactComponents(item.fields.content.fields.text, richTextParse),
    };
  });

  return (
    <section 
      id={sectionId}
      className={cn('section', themeClass)}
    >
      {headline && (
        <Headline
          {...headlineProps}
        />
      )}
      <div className="container">
        {accordionItems &&
          accordionItems.map((item: any, index: number) => (
            <details key={index} className={cn(styles.accordion__item)}>
              <summary className={cn(styles.accordion__title, 'type-subhead')}>
                <span className={cn(styles.accordion__icon)}>
                  <span className={cn(styles['accordion__icon--open'])}>
                    <Plus />
                  </span>
                  <span className={cn(styles['accordion__icon--close'])}>
                    <Minus />
                  </span>
                </span>
                <Heading level={semanticLevel}>{item.title}</Heading>
              </summary>

              <div className={cn(styles.accordion__text, 'grid')}>
                {item.media && (
                  <Media
                    media={item.media}
                    ratio="1-1"
                    scopeStyles={styles.accordion__text__frame}
                  />
                )}
                <div
                  className={cn('text', {
                    [styles['accordion__media__text']]: item.media,
                    [styles['accordion__text__text']]: !item.media,
                  })}
                >
                  {item.body}
                </div>
              </div>
            </details>
          ))}
      </div>
    </section>
  );
};

export default Accordion;
