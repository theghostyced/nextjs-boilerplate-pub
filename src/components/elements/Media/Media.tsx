import ReactDOM from 'react-dom';

import cn from 'classnames';

import {IResponsiveMediaProps, responsiveImg} from '@/utils/responsiveImg';

interface IProps {
  media: IResponsiveMediaProps | any;
  ratio?: string;
  srcSet?: number[];
  srcSetMobile?: number[];
  sizes?: string;
  loading?: string;
  scopeStyles?: {};
  preload?: boolean;
}

const Media = ({
  media,
  ratio,
  srcSet = [2000, 1500, 1100],
  srcSetMobile = [2000, 1500, 1100, 750],
  sizes = '100vw',
  loading = 'lazy',
  scopeStyles,
  preload = false,
}: IProps) => {
  const getExt = (filename: string) => {
    var ext = filename.split('.').pop();
    if (ext == filename) return '';
    return ext;
  };

  const modifiers = ratio ? `frame--${ratio}` : '';
  const extension = getExt(media.src);

  if (preload) {
    ReactDOM.preload(media.src, {as: extension == ('mp4' || 'webm') ? 'video' : 'image'});
  }

  let attributes: any;
  if (extension == ('mp4' || 'webm')) {
    attributes = {video: media};
  } else {
    attributes = {image: media};
  }

  return (
    <div className={cn('frame', scopeStyles, modifiers)}>
      {responsiveImg({
        ...attributes,
        srcSet,
        srcSetMobile,
        sizes,
        loading,
      })}
    </div>
  );
};

export default Media;
