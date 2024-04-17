import styles from './Post.module.scss';
import {buildTOC, calculateReadingTime, getTagNames} from './utils';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import slugifyString from '@/utils/slugify';

import Media from '@/components/elements/Media/Media';
import Tag from '@/components/elements/Tag/Tag';
import {IPost} from '@/types/contentful';
import {formatImage} from '@/utils/formatMedia';
import {markdownToReactElement} from '@/utils/markdownParser';
import {richTextParse} from '@/utils/richTextParser';
import {Date} from '@/utils/time';
import Breadcrumbs from '@/components/elements/Breadcrumbs/Breadcrumbs';

const Post = async ({post}: {post: IPost}) => {
  const {title, eyebrow, subhead, subheadDescription, author, theme, publishedOn, text, heroImage, category, type} = post.fields;
  const formattedDate = Date(publishedOn, 'DDD');
  const readingTime = calculateReadingTime(text);
  const formattedImage = formatImage(heroImage);
  const tags = await getTagNames(post.metadata.tags);
  const themeClass = theme ? `theme-${theme}` : '';

  // Breacrumbs data 
  const postTypeLink = {text: type, url: `/${slugifyString(type)}/all`};
  const postCategoryLink = {text: category, url: `/${slugifyString(type)}/${slugifyString(category)}`};
  const breadcrumbsData = [postTypeLink, postCategoryLink];
  // const tableOfContent = buildTOC(text);
  // console.log(tableOfContent);

  return (
    <article className={cn(styles.post, themeClass)}>
      <header className={cn(styles['post-header'], `theme-${theme || 'light'}`)}>
        <div className="container | grid">
          {heroImage && (
            <figure className={cn(styles['post-hero'])}>
                <Media
                  media={formattedImage}
                  srcSet={[300]}
                  loading="eager"
                  sizes="(min-width: 1024px) 40vw, (min-width: 600px) 50vw, 100vw"
                />
            </figure>
          )}
          <div className={cn(styles['post-header__content'], 'container | stack')}>
            {breadcrumbsData && <Breadcrumbs entries={breadcrumbsData} currentEntry={title} />}

            <h1 className={cn(styles.postTitle, 'type-headline-1')}>{title}</h1>

            {eyebrow && <p className="type-eyebrow-2">{ eyebrow }</p>}

            {(subhead && subheadDescription) && (
              <div className={cn(styles.post__subhead)}>
                  {subhead && <p className={cn(styles['post__subhead-title'],'type-subhead-1')}>{subhead}</p>}
                  {subheadDescription && <p className={cn(styles['post__subhead-description'], 'type-body-3')}>{subheadDescription}</p>}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={cn(styles['post-body'], 'container | grid')}>
        <div className={cn(styles['post-meta'], 'stack')}>
           {author && 
            <div className={cn(styles['post-author'])}>
                {author?.fields.photo && (
                  <div className={cn(styles['post-author__photo'])}>
                      <Media
                        media={formatImage(author?.fields.photo)}
                        srcSet={[300]}
                        sizes="(min-width: 1024px) 40vw, (min-width: 600px) 50vw, 100vw"
                        loading="eager"
                      />
                  </div>
                )}

                {author?.fields.name && <p className={cn(styles['post-author__name'])}>By { author?.fields.name }</p>}
                {author?.fields.title && <p className={cn(styles['post-author__title'])}>{author?.fields.title}</p>}

                {/*author?.fields.bio && <p className={cn(styles['post-author__bio'])}>{markdownToReactElement(author?.fields.bio)}</p>*/}
            </div>
          }

          {readingTime && <p className={cn(styles['post-meta__reading'])}>Reading Time — <span>{readingTime}</span></p>}

          {publishedOn && <time className={cn(styles['post-meta__date'])} dateTime={formattedDate}>{formattedDate}</time>}
        </div>

        <div className={cn(styles['post-content'], 'grid grid--no-row-gap')}>
          <div className={cn(styles['post-text'], 'stack | text | type-body-3 | grid grid--no-row-gap')}>
            {text && documentToReactComponents(text, richTextParse)}
          </div>
          {tags && (
            <ul className={cn(styles['post-tags'])}>
              {tags.map((tag, index) => (
                <li key={index} className={cn(styles['post-tags__item'])}>
                  <Tag label={tag?.name || ''} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
