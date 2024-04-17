import {metadata} from '@/lib/metadata';
import {IEntry, ISettings} from '@/types/contentful';
import {Metadata} from 'next';

export const generateRootMetadata = ({settings, entry}: {settings: ISettings, entry?: IEntry}) => {
  // Page's site title populated from CMS field. Defaults to the metadata title if empty.
  const siteTitle = settings.fields.title || metadata.seo_title || metadata.title;
  const entryMetadata = entry?.metadata;

  return {
    title: siteTitle,
  } as Metadata;
};
