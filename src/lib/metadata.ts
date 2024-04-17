import {Metadata} from 'next';

import {IPage, IPageSimple, IPost, ISettings} from '@/types/contentful';

/**
 * Metadata used for SEO and social sharing purposes. This data can (and should)
 * be available for editing in the CMS, and both locations should be updated.
 */
const metadata = {
  title: 'Next kit',
  legal_name: 'Nextjs, Inc.',
  url: {
    production: `https://${process.env.PROD_DOMAIN}`,
    staging: `https://${process.env.STAGING_DOMAIN}`,
    qa: `https://${process.env.QA_DOMAIN}`,
    development: 'http://localhost:3000',
  },
  description: '',
  image: '',
  image_alt_text: '',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  social: {
    facebook: '',
    twitter: '',
  },
  analytics: {
    google_tag_manager_id: '',
    google_analytics_id: '',
    facebook_app_id: '',
  },
  images: {
    api: 'contentful',
    quality: '60',
  },
  date_format: 'MMMM d, yyyy',
  icons: {
    icon: [{url: '/favicon.ico'}, {url: '/favicon.svg'}],
  },
  apple: '/apple-touch-icon.png',
  manifest: '/mainfest.webmanifest',
};

const buildMetadata = async (opts: {
  pageData?: IPage | IPost | IPageSimple;
  siteSettings: ISettings;
  pageTitle?: string;
}) => {
  const {siteSettings: settings, pageData, pageTitle} = opts;
  const defaultMetadata = {
    icons: metadata.icons,
    mainfest: metadata.manifest,
    apple: metadata.apple,
  };
  let generatedMetadata = {...defaultMetadata} as Metadata;

  const siteTitle =
    settings?.fields.metadata?.fields.seoTitle ||
    settings?.fields?.title ||
    metadata.seo_title ||
    metadata.title;

  generatedMetadata = {
    ...defaultMetadata,
    title: siteTitle,
  };

  if (pageData) {
    generatedMetadata = {
      ...generatedMetadata,
      title: `${pageData.fields.metadata?.fields.seoTitle || pageData.fields.title || siteTitle} | ${siteTitle}`,
      description: pageData.fields.metadata?.fields.seoDescription,
      keywords: pageData.fields.metadata?.fields.seoKeywords,
      openGraph: {
        title: pageData.fields.metadata?.fields.seoTitle,
        description: pageData.fields.metadata?.fields.seoDescription,
        images: [
          {
            url: pageData.fields.metadata?.fields.socialImage?.fields.file.url!,
            alt: pageData.fields.metadata?.fields.socialImage?.fields.title,
          },
        ],
      },
    };
  }

  if (pageTitle) {
    generatedMetadata = {
      ...generatedMetadata,
      title: `${pageTitle} | ${siteTitle}`,
    };
  }

  return generatedMetadata;
};

export {metadata, buildMetadata};
