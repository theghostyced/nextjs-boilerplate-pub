import {notFound} from 'next/navigation';

import Layout from '@/layouts/Layout';
import PostListing from '@/layouts/posts/PostListing';
import {
  getPostListingPostsByType,
  getPostListingSettings,
  getPosts,
  getSiteSettings,
} from '@/lib/api';
import {buildMetadata} from '@/lib/metadata';
import {IPost, IPostFields} from '@/types/contentful';

export const generateStaticParams = async () => {
  const posts = await getPosts();

  const slugs = posts!.map((post: IPost) => {
    return {
      type: post.fields.type,
      category: post.fields.category || 'all',
    };
  });

  return slugs;
};

type Props = {
  params: {type: IPostFields['type']; category: IPostFields['category'] | string};
};

export default async function DynamicPost({params}: Props) {
  const postListingSettings = await getPostListingSettings(params.type);
  const postsByType = await getPostListingPostsByType(params.type);
  if (!postsByType) return notFound();

  const settings = await getSiteSettings();
  if (!settings) return;

  const categoryPosts = params.category ? postsByType[params.category] : postsByType['all'];
  return (
    <>
      <Layout settings={settings} bodyClass="">
        <PostListing posts={categoryPosts} postListingSettings={postListingSettings} />
      </Layout>
    </>
  );
}

export async function generateMetadata({params}: Props) {
  const settings = await getSiteSettings();

  return await buildMetadata({
    siteSettings: settings!,
    pageTitle: `${params.type?.charAt(0).toUpperCase()}${params.type?.slice(1)}`,
  });
}
