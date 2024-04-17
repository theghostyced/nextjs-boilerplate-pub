import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import {Actions} from '@/components/elements/Button/Button';
import Heading from '@/components/elements/Heading/Heading';
import Media from '@/components/elements/Media/Media';
import {IHeroFields} from '@/types/contentful';
import formatCta from '@/utils/formatCta';
import {formatImage} from '@/utils/formatMedia';
import {richTextParse} from '@/utils/richTextParser';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import styles from './Hero.module.scss';

const Hero = (props: IDynamicComponent<IHeroFields>) => {
  const {
    sectionId,
    theme,
    preload,
    eyebrow,
    title,
    subhead,
    body,
    cta,
    background,
    height,
    semanticLevel,
  } = props;

  const media = formatImage(background);
  const formattedCta = formatCta(cta);
  const themeClass = theme ? `theme-${theme}` : '';
  const heightClass = height ? `hero--${height}` : '';

  return (
    <section
      id={sectionId}
      className={cn('section', 'grid', styles.hero, styles['hero--media'], heightClass, themeClass)}
    >
      <div className={cn(styles.hero__media)}>
        <Media preload={preload} media={media} scopeStyles={styles.frame} />
      </div>

      <div className={cn(styles.hero__content, 'stack', 'stack--l')}>
        {eyebrow && <p className="type-eyebrow-3">{eyebrow}</p>}

        {title && (
          <Heading level={semanticLevel} className="type-display-1">
            {title}
          </Heading>
        )}

        {subhead && <p className="type-subhead-1">{subhead}</p>}

        {body && (
          <div className={cn(styles.hero__content__text, 'type-body-3', 'u-mb--space-fixed-5')}>
            {documentToReactComponents(body, richTextParse)}
          </div>
        )}

        {formattedCta && formattedCta.length > 0 && (
          <Actions cta={formattedCta} scopeStyles={styles} scope="hero" />
        )}
      </div>
    </section>
  );
};

export default Hero;
