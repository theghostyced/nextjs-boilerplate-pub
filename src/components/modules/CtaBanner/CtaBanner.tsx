import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import {Actions} from '@/components/elements/Button/Button';
import Heading from '@/components/elements/Heading/Heading';
import styles from '@/components/modules/CtaBanner/CtaBanner.module.scss';
import {ICtaBannerFields} from '@/types/contentful';
import formatCta from '@/utils/formatCta';
import {richTextParse} from '@/utils/richTextParser';

const CtaBanner = (props: IDynamicComponent<ICtaBannerFields>) => {
  const {
    sectionId, 
    theme, 
    eyebrow, 
    title, 
    body, 
    cta, 
    alignment, 
    semanticLevel
  } = props;
  
  const alignmentClass = alignment == 'center' ? `ctaBanner--${alignment}` : '';
  const themeClass = theme ? `theme-${theme}` : '';
  const formattedCta = formatCta(cta!);

  return (
    <section
      id={sectionId}
      className={cn(
        'section',
        styles.ctaBanner,
        styles[`${alignmentClass}`],
        themeClass,
      )}
    >
      <div className="container | stack stack--l">
        <div className={cn(styles.ctaBanner__content, 'stack', 'stack--l')}>
          {eyebrow && <p className={cn('type-eyebrow-3')}>{eyebrow}</p>}
          <Heading level={semanticLevel!} className={cn('type-display-1')}>
            {title}
          </Heading>

          {body && (
            <div className="type-body-3">{documentToReactComponents(body, richTextParse)}</div>
          )}
        </div>

        {cta && (
          <Actions cta={formattedCta} scopeStyles={styles} scope="ctaBanner" isAnimated={true} />
        )}
      </div>
    </section>
  );
};

export default CtaBanner;
