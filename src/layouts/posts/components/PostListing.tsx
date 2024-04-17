'use client';

import {createContext, useContext, useEffect, useState} from 'react';

import styles from '../Post.module.scss';
import slugify from '@sindresorhus/slugify';
import cn from 'classnames';
import Link from 'next/link';
import {useParams, useSearchParams} from 'next/navigation';

import Card from '@/components/elements/Card/Card';
import Headline from '@/components/modules/Headline/Headline';
import {IPostListingPosts} from '@/lib/api';
import {IPost} from '@/types/contentful';
import {formatImage} from '@/utils/formatMedia';
import {Date} from '@/utils/time';
import buildUrl from '@/utils/buildUrl';

interface IPostListingProps {
  posts: IPostListingPosts[];
  postsSource: IPostListingPosts[];
  postListingSettings?: any;
  onTopicChange?: (topic: string) => void;
}

const PostListingContext = createContext<IPostListingProps>({posts: [], postsSource: []});

const PostListingProvider = ({
  children,
  posts,
  postListingSettings,
}: {
  children: React.ReactNode;
  posts: IPostListingPosts[];
  postListingSettings: any;
}) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const searchParams = useSearchParams();
  const topicParams = searchParams.get('topic') || 'all';

  const handleTopicChange = (topic: string) => {
    if (topic === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post: any) => post.tags.includes(slugify(topic))));
    }
  };

  useEffect(() => {
    handleTopicChange(topicParams);
  }, [topicParams]);

  return (
    <PostListingContext.Provider
      value={{
        posts: filteredPosts,
        postListingSettings,
        onTopicChange: handleTopicChange,
        postsSource: posts,
      }}
    >
      {children}
    </PostListingContext.Provider>
  );
};

export const PostListingWrapper = ({
  children,
  posts,
  postListingSettings,
}: {
  children: React.ReactNode;
  posts: IPostListingPosts[];
  postListingSettings: any;
}) => {
  return (
    <PostListingProvider posts={posts} postListingSettings={postListingSettings}>
      <div className={styles.postListing}>{children}</div>
    </PostListingProvider>
  );
};

export const PrimaryFilter = () => {
  const params = useParams<{type: string; category: string}>();
  const {postListingSettings} = useContext(PostListingContext);
  const primaryNavigation = postListingSettings?.primaryNavigation || [];

  return (
    <div className={styles.postListingNavigationBar}>
      <nav aria-label="Post types" className={styles.primaryNav}>
        <ul className={cn(styles.navigation, styles.primaryNavList)}>
          {primaryNavigation.map((item: any, index: number) => {
            return (
              <li key={index}>
                <Link
                  aria-current={item.label.toUpperCase() === params.category.toUpperCase() && true}
                  className={cn('type-ui-2', styles.navigationLink)}
                  href={item.url}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export const SecondaryFilter = ({allTags}: {allTags: {[key: string]: string}}) => {
  const {postsSource} = useContext(PostListingContext);
  const searchParams = useSearchParams();
  const topicParams = searchParams.get('topic') || 'all';
  let tags = new Set();

  postsSource.forEach((post) => {
    post.metadata.tags.forEach((tag) => tags.add(tag.sys.id));
  });

  return (
    <nav aria-labelledby="secondaryNav-title" className={cn('stack', styles.secondaryNav)}>
      <h2 className="type-eyebrow-3" id="seondaryNav-title">
        Filter by Topic
      </h2>

      <ul
        role="list"
        className={cn(styles.navigation, styles.navigationVertical, styles.secondaryNavList)}
      >
        <li>
          <a
            aria-current={'ALL' === topicParams.toUpperCase() && true}
            className={cn('type-ui-2', styles.navigationLink)}
            href={`?topic=all`}
          >
            All
          </a>
        </li>

        {Array.from(tags).map((tag: any, index: number) => {
          return (
            <li key={index}>
              <Link
                aria-current={tag.toUpperCase() === topicParams.toUpperCase() && true}
                className={cn('type-ui-2', styles.navigationLink)}
                href={`?topic=${tag}`}
              >
                {allTags[tag]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const Hero = () => {
  const {postListingSettings} = useContext(PostListingContext);
  const params = useParams<{type: string; category: string}>();
  // a simple string capitalization
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const title =
    params.category === 'all' ? postListingSettings.hero.title : capitalize(params.category);
  const body = params.category === 'all' ? postListingSettings.hero.body : '';
  const eyebrow = params.category !== 'all' ? params.type.toUpperCase() : '';
  return <Headline eyebrow={eyebrow} title={title} body={body} />;
};

export const Posts = () => {
  const {posts} = useContext(PostListingContext);

  return (
    <ul className={styles.postsList}>
      {posts.map((post: IPost, index: number) => {
        const postLink = {
          slug: post.fields.slug,
          contentType: post.sys.contentType.sys.id,
          type: post.fields.type,
          category: slugify(post.fields.category!)
        }

        return (
          <li className={styles.postsListItem} key={index}>
              <Card
                body={post.fields.thumbnailText}
                title={post.fields.title}
                scope="posts"
                variant="horizontal"
                figure={formatImage(post.fields.thumbnailImage)}
                eyebrow={Date(post.fields.publishedOn, 'DDD')}
                cta={[{label: '', url: buildUrl(postLink)}]}
              />
          </li>
        );
      })}
    </ul>
  );
};
