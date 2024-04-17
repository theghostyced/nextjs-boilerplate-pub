import React from 'react';

import styles from './Post.module.scss';
import {
  Hero,
  PostListingWrapper,
  Posts,
  PrimaryFilter,
  SecondaryFilter,
} from './components/PostListing';
import {getFilterTagNames} from './utils';
import cn from 'classnames';

import {IPostListingPosts, getTags} from '@/lib/api';

const PostListing = async ({
  posts,
  postListingSettings,
}: {
  posts: IPostListingPosts[];
  postListingSettings: any;
}) => {
  const allTags = await getFilterTagNames();
  return (
    <PostListingWrapper posts={posts} postListingSettings={postListingSettings}>
      <Hero />

      <section className="section">
        <div className={cn('container grid', styles.postListingContent)}>
          <PrimaryFilter />
          <SecondaryFilter allTags={allTags} />
          <Posts />
        </div>
      </section>
    </PostListingWrapper>
  );
};

export default PostListing;
