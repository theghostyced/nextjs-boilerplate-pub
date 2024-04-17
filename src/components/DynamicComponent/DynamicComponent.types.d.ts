import {SemanticLevelType} from '@/components/elements/Heading/Heading';
import {IImage, IPost} from '@/types/contentful';
import {IMediaProps} from 'utilities/responsiveImg';

type CTAItem = {
  text: string | undefined;
  url: string | undefined;
};

export type CTA = CTAItem[];

// Omits the generate cta field sent back by contentful and makes use of
// our custom cta structure.
export type IComponentProps<T> = Partial<
  Omit<T, 'background' | 'media' | 'cta' | 'image' | 'video' | 'mobileImage' | 'mobileVideo'>
> & {
  background?: IMediaProps;
  media?: IMediaProps;
  cta?: CTA;
  image?: IMediaProps | undefined;
  mobileImage?: IMediaProps | undefined;
  video?: IMediaProps | undefined;
  mobileVideo?: IMediaProps | undefined;
  semanticLevel: SemanticLevelType;
  preload?: boolean;
};

// Omit for easier mocking of CTA and Images
export type IDynamicComponent<T extends {}> = T<Omit<'background' | 'cta' | 'image'>> & {
  id: string;
  index: number;
  preload: boolean;
  posts: IPost[];
  semanticLevel: SemanticLevelType;
};
