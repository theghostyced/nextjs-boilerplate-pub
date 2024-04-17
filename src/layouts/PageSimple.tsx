import React from 'react';

import Layout from './Layout';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

import Heading from '@/components/elements/Heading/Heading';
import {IPageSimple, ISettings} from '@/types/contentful';
import {richTextParse} from '@/utils/richTextParser';

const PageSimple = ({page, settings}: {page: IPageSimple; settings: ISettings}) => {
  const {title, text} = page.fields;

  return (
    <Layout settings={settings}>
      <div className="container">
        <Heading level="h1" className="type-headline-2">
          {title}
        </Heading>
        <div className="text stack">{documentToReactComponents(text!, richTextParse)}</div>
      </div>
    </Layout>
  );
};

export default PageSimple;
