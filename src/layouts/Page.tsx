import React from 'react';
import {IPost} from '@/types/contentful';
import DynamicComponent from '@/components/DynamicComponent/DynamicComponent';
import {
  IAccordion,
  ICareersList,
  IComparisonTable,
  ICtaBanner,
  IDivider,
  IFeature,
  IFeatureStack,
  IHeadline,
  IHero,
  IInPageNav,
  IList,
  ILogoCloud,
  IMulticard,
  IPage,
  IPanorama,
  IPostList,
  IQuote,
  ISection,
  ISectionNav,
  ISettings,
  IText,
  IVideo,
} from '@/types/contentful';

import Layout from './Layout';

type ISectionList =
  | ISection
  | IAccordion
  | ICareersList
  | IComparisonTable
  | IFeature
  | IHero
  | IInPageNav
  | IList
  | ILogoCloud
  | IMulticard
  | IPanorama
  | IPostList
  | IQuote
  | ISectionNav
  | IText
  | IHeadline
  | ICtaBanner
  | IFeatureStack
  | IDivider
  | IVideo;

type IProps = {
  sections: ISectionList[] | undefined;
  posts: IPost[] | undefined;
};

const Sections = (props: IProps) => {
  return props.sections?.map((section: ISectionList, index: number) => {
    const semanticLevel = index === 0 ? 'h1' : 'h2';
    const preload = index <= 3;

    return (
      <DynamicComponent
        key={`module-${index}`}
        entry={section}
        index={index}
        semanticLevel={semanticLevel}
        preload={preload}
        posts={props.posts}
      />
    );
  });
};

const Page = ({page, settings, posts}: {page: IPage; settings: ISettings, posts: IPost[]}) => {
  const sections = page.fields.sections;
  const bodyClass = page?.fields?.theme ? `theme-${page?.fields?.theme}` : 'theme-light';

  return (
    <Layout settings={settings} bodyClass={bodyClass}>
      <Sections sections={sections} posts={posts} />
    </Layout>
  );
};

export default Page;
