import {IDynamicComponent} from '../../DynamicComponent/DynamicComponent.types';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';
import Image from 'next/image';

import {Actions} from '@/components/elements/Button/Button';
import Heading from '@/components/elements/Heading/Heading';
import {Play} from '@/components/elements/Icons/Icons';
import Media from '@/components/elements/Media/Media';
import styles from '@/components/modules/Feature/Feature.module.scss';
import {IFeatureFields} from '@/types/contentful';
import formatCta from '@/utils/formatCta';
import {formatImage} from '@/utils/formatMedia';
import {richTextParse} from '@/utils/richTextParser';
import slugifyString from '@/utils/slugify';

const Feature = (props: IDynamicComponent<IFeatureFields>) => {
  const {
    sectionId,
    theme,
    eyebrow,
    title,
    body,
    cta,
    media,
    textSize,
    textAlignment,
    vimeoId,
    vimeoBtnText,
    mediaSide,
    mediaFixedSize,
    semanticLevel,
  } = props;

  const formattedCta = formatCta(cta);
  const figure = formatImage(media);
  const size = slugifyString(textSize);
  const alignment = slugifyString(textAlignment);
  const side = slugifyString(mediaSide);
  const headlineClass = size == 'small' ? 'type-headline-3' : 'type-display-3';
  const bodyClass = size == 'small' ? 'type-body-3' : 'type-subhead-3';
  const themeClass = theme ? `theme-${theme}` : '';

  const isImage = figure && figure.format == ('jpeg' || 'webp');
  let mediaContent;

  // Media rendering conditions
  if (isImage || vimeoId!) {
    if (mediaFixedSize) {
      mediaContent = (
        <Image
          className={cn(styles.feature__img, styles['feature__img--fixed'])}
          src={figure!.src}
          alt={figure!.altText}
          width={figure!.width}
          height={figure!.height}
          loading="lazy"
          decoding="async"
        />
      );
    } else {
      mediaContent = <Media media={figure} ratio="1-1" />;
      if (vimeoId) {
        mediaContent = (
          <>
            <Media media={figure} ratio="1-1" />
            <div className={cn(styles['feature__vimeo-play'], 'type-eyebrow')}>
              <Play />
              <span>{vimeoBtnText}</span>
            </div>
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}`}
              srcDoc={`<style>*{margin:0;padding:0;overflow:hidden}a{position:absolute;width:100%;top:0;bottom:0;}</style><a href=https://player.vimeo.com/video/${vimeoId}?autoplay=1&transparent=0></a>`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${title} Video`}
              className={cn(styles.feature__vimeo)}
            ></iframe>
          </>
        );
      }
    }
  }

  return (
    <section 
      id={sectionId}
      className="section"
    >
      <div className="container">
        <article
          className={cn(
            styles.feature,
            styles[`feature--content-${alignment}`],
            themeClass,
            'grid',
          )}
        >
          {/* Media */}
          <figure className={cn(styles.feature__media, styles[`feature__media--${side}`])}>
            {mediaContent}
          </figure>

          {/* Content */}
          <div className={cn(styles.feature__content, 'stack')}>
            {/* Header */}
            {(eyebrow! || title!) && (
              <header className={cn(styles['feature__card-header'], 'stack', 'stack--s')}>
                {eyebrow && <p className="type-eyebrow-3">{eyebrow}</p>}
                {title && (
                  <Heading
                    level={semanticLevel!}
                    className={cn(styles['feature__card-title'], headlineClass)}
                  >
                    {title}
                  </Heading>
                )}
              </header>
            )}

            {/* Body */}
            {body! && (
              <div className={cn(styles['feature__card-text'], bodyClass, 'text')}>
                {documentToReactComponents(body, richTextParse)}
              </div>
            )}

            {/* Cta */}
            {formattedCta && formattedCta.length ? (
              <Actions cta={formattedCta} scopeStyles={styles['feature__card-cta']} />
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Feature;
