// commenting this cause for now type Asset is not assignable to type IHeroFields (IImage)
// import { Asset } from 'contentful';
import { IMediaProps } from '@/utils/responsiveImg';

export const formatImage = (entry: any) => {
    if (!entry?.fields?.image && !entry?.fields?.file) return entry;

    const img = entry.fields.image?.fields || entry.fields;

    return {
        src: `https:${img.file.url}`,
        height: img.file?.details?.image?.height,
        width: img.file?.details?.image?.width,
        altText: img.description || img.title || '',
        title: img.title || '',
        format: img.file?.contentType.split('/').pop(),
        quality: '60'
    } as IMediaProps;

};

export const formatVideo = (entry: any) => {
    if (!entry?.fields?.image && !entry?.fields?.file) return entry;

    const vid = entry.fields;

    return {
        src: `https:${vid.fields.file.url}`,
        height: vid.fields.file.details.image?.height,
        width: vid.fields.file.details.image?.width,
        altText: vid.fields.description || vid.fields.title,
        quality: '60',
        title: vid.fields.title,
    };
  
};