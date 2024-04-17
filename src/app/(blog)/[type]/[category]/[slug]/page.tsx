import {notFound} from 'next/navigation';

import Layout from '@/layouts/Layout';
import Post from '@/layouts/posts/Post';
import {getPostEntryBySlug, getPosts, getSiteSettings} from '@/lib/api';
import {buildMetadata} from '@/lib/metadata';
import {IPost} from '@/types/contentful';

export const generateStaticParams = async () => {
  const posts = await getPosts();

  const slugs = posts!.map((post: IPost) => {
    return {
      type: post.fields.type,
      category: post.fields.category,
      slug: post.fields.slug,
    };
  });

  return slugs;
};

export default async function DynamicPost({params}: {params: {slug: string}}) {
  const post = await getPostEntryBySlug(params.slug);
  if (!post) return notFound();

  const settings = await getSiteSettings();
  if (!settings) return;

  return (
    <Layout settings={settings} bodyClass="">
      <Post post={post} />
    </Layout>
  );
}

type Props = {
  params: {slug: string};
};

export async function generateMetadata({params}: Props) {
  const settings = await getSiteSettings();
  const pageData = await getPostEntryBySlug(params.slug);
  return await buildMetadata({siteSettings: settings!, pageData: pageData!});
}
