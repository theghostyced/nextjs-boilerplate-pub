import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import ListItem from '@/components/elements/ListItem/ListItem';
import styles from '@/components/modules/List/List.module.scss';
import {IListFields} from '@/types/contentful';
import formatCta from '@/utils/formatCta';
import {richTextParse} from '@/utils/richTextParser';
import slugify from '@/utils/slugify';

import Headline from '@/components/modules/Headline/Headline';
import {flatHeadlineProps} from '@/utils/remapedHeadline';

const List = (props: IDynamicComponent<IListFields>) => {
  const {
    sectionId, 
    theme,
    headline, 
    items, 
    variant, 
    showIndex, 
    semanticLevel
  } = props;

  const _variant = slugify(variant);
  const themeClass = theme ? `theme-${theme}` : '';
  const headlineProps = flatHeadlineProps(headline);

  return (
    <section 
      id={sectionId}
      className={cn('section', themeClass, {listModule: headline})}
    >
      <div className={cn('container', {grid: headline})}>
        {headline && (
          <div className={cn(styles.list__headline)}>
            <Headline
              {...headlineProps}
            />
          </div>
        )}
        <ul
          className={cn(styles.list, {
            [styles['list--headline']]: headline,
            [styles[`list--${_variant}`]]: _variant,
            [styles['list--ordered']]: showIndex,
          })}
          style={{['--total' as string]: items.length}}
        >
          {items &&
            items.map((item: any, index: number) => (
              <ListItem
                key={index}
                title={item.fields.title}
                body={documentToReactComponents(item.fields.body, richTextParse)}
                cta={formatCta(item.fields.link)}
                scopeStyle={styles}
              />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default List;
