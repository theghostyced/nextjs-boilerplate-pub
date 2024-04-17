'use client';

import cn from 'classnames';
import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import Carousel, {Slide} from '@/components/elements/Carousel/Carousel';
import Media from '@/components/elements/Media/Media';
import {IPanoramaFields} from '@/types/contentful';
import {formatImage} from '@/utils/formatMedia';

import Headline from '@/components/modules/Headline/Headline';
import {flatHeadlineProps} from '@/utils/remapedHeadline';

const Panorama = (props: IDynamicComponent<IPanoramaFields>) => {
  const {
    sectionId,
    theme,
    headline,
    images, 
    ratio
  } = props;

  const themeClass = theme ? `theme-${theme}` : '';
  const headlineProps = flatHeadlineProps(headline);

  return (
    <section 
      id={sectionId}
      className={cn('panorama', 'section', 'section--flush-padding', themeClass)}
    >
      {headline && (
        <Headline
          {...headlineProps}
        />
      )}
      
      <Carousel
        items={images}
        settings={{
          breakpoints: {
            960: {slidesPerView: 2},
            1280: {slidesPerView: 2},
            1440: {slidesPerView: 2},
          },
        }}
      >
        {images.map((img: any, index: number) => (
          <Slide key={index}>
            <div className="panorama__item">
              <Media media={formatImage(img)} ratio={ratio} />
            </div>
          </Slide>
        ))}
      </Carousel>
    </section>
  );
};

export default Panorama;
