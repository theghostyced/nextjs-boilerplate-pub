'use client';

import styles from './Multicard.module.scss';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import Card from '@/components/elements/Card/Card';
import Carousel, {Slide} from '@/components/elements/Carousel/Carousel';
import {IMulticardFields} from '@/types/contentful';
import formatCta from '@/utils/formatCta';
import {formatImage} from '@/utils/formatMedia';
import {richTextParse} from '@/utils/richTextParser';

import Headline from '@/components/modules/Headline/Headline';
import {flatHeadlineProps} from '@/utils/remapedHeadline';

const Multicard = (props: IDynamicComponent<IMulticardFields>) => {
  const {
    sectionId, 
    theme,
    headline, 
    multicardItems, 
    variant, 
    semanticLevel
  } = props;

  const themeClass = theme ? `theme-${theme}` : '';
  const totalItems = multicardItems.length;
  const isCarouselType = variant == 'carousel' && totalItems > 4;
  const modifierClass = `multicard--${variant}`;
  const gridType = variant == 'grid' ? 'grid--2up' : '';
  const gridColumns = totalItems <= 4 ? totalItems : 4;
  const gridClass = totalItems! > 1 ? 'grid' : '';
  const variantClass = variant == 'grid' ? 'horizontal' : 'vertical';
  const gridColumnClass = totalItems > 1 && variant == 'column' ? `grid--${gridColumns}up` : '';
  const headlineProps = flatHeadlineProps(headline);

  const items = multicardItems?.map((item: any) => {
    return {
      eyebrow: item.fields.eyebrow,
      title: item.fields.title,
      body: documentToReactComponents(item.fields.body, richTextParse),
      figure: formatImage(item.fields.image),
      cta: formatCta(item.fields.cta),
      tag: item.fields.cardTag,
    };
  });

  return (
    <section
      id={sectionId}
      className={cn('section', styles.multicard, styles[`${modifierClass}`], themeClass)}
    >
      {headline && (
        <Headline
          {...headlineProps}
        />
      )}

      {isCarouselType ? (
        <Carousel items={items}>
          {items &&
            items.map((item: any, index: number) => (
              <Slide key={index}>
                <Card
                  eyebrow={item.eyebrow}
                  title={item.title}
                  figure={item.figure}
                  body={item.body}
                  cta={item.cta}
                  tag={item.tag}
                  scope="multicard"
                  scopeStyle={styles}
                  variant={variantClass}
                  btnModifiers={['secondary']}
                  semanticLevel="h3"
                />
              </Slide>
            ))}
        </Carousel>
      ) : (
        <div className={cn(gridClass, gridColumnClass, gridType)}>
          {items &&
            items.map((item: any, index: number) => (
              <Card
                key={index}
                eyebrow={item.eyebrow}
                title={item.title}
                figure={item.figure}
                body={item.body}
                cta={item.cta}
                tag={item.tag}
                scope="multicard"
                scopeStyle={styles}
                variant={variantClass}
                btnModifiers={['secondary']}
                semanticLevel="h3"
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default Multicard;
