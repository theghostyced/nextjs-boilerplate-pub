import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import {Actions} from '@/components/elements/Button/Button';
import Heading, {SemanticLevelType} from '@/components/elements/Heading/Heading';
import styles from '@/components/modules/Headline/Headline.module.scss';
import {IHeadlineFields} from '@/types/contentful';
import formatCta from '@/utils/formatCta';
import {richTextParse} from '@/utils/richTextParser';

const Headline = (props: IDynamicComponent<IHeadlineFields>) => {
  const {sectionId, eyebrow, title, body, subhead, alignment, cta, isEmbedded = false} = props;

  const alignmentClass = alignment == 'center' ? `headline--${alignment}` : '';
  const formattedCta = formatCta(cta);

  let semanticLevel = isEmbedded ? 'h2' : 'h1';

  return (
    <>
      {isEmbedded && (
        <div
          id={sectionId}
          className={cn(styles.headline, styles[`${alignmentClass}`], 'u-mb--space-3')}
        >
          <div className="container grid">
            <div className={cn(styles.headline__content)}>
              {eyebrow && <p className="type-eyebrow-3">{eyebrow}</p>}

              {title && (
                <Heading
                  level={semanticLevel as SemanticLevelType}
                  className={cn(styles.headline__title, 'type-headline-2')}
                >
                  {title}
                </Heading>
              )}

              {body && (
                <div className={cn(styles.headline__body, 'type-body-3')}>
                  {documentToReactComponents(body, richTextParse)}
                </div>
              )}
            </div>

            {formattedCta && (
              <Actions cta={formattedCta} scopeStyles={styles} scope="headline" isAnimated={true} />
            )}
          </div>
        </div>
      )}

      {!isEmbedded && (
        <section
          id={sectionId}
          className={cn('section', styles.headline, styles[`${alignmentClass}`])}
        >
          <div className="container grid">
            <div className={cn(styles.headline__content)}>
              {eyebrow && <p className="type-eyebrow-3">{eyebrow}</p>}

              {title && (
                <Heading
                  level={semanticLevel as SemanticLevelType}
                  className={cn(styles.headline__title, 'type-headline-2')}
                >
                  {title}
                </Heading>
              )}

              {body && (
                <div className={cn(styles.headline__body, 'type-body-3')}>
                  {documentToReactComponents(body, richTextParse)}
                </div>
              )}
            </div>

            {formattedCta && (
              <Actions cta={formattedCta} scopeStyles={styles} scope="headline" isAnimated={true} />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Headline;
