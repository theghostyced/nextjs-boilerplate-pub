import {IHeadlineFields} from '@/types/contentful';

/**
 * flatHeadline remap Headline module data to use as en embedded module
 * @type {object}
 */
export const flatHeadlineProps = (entry: any) => {
	if (!entry?.fields?.title) return entry;

	return {
        eyebrow: entry?.fields?.eyebrow,
        title: entry?.fields?.title,
        subhead: entry?.fields?.subhead,
        body: entry?.fields?.body,
        cta: entry?.fields?.cta,
        alignment: entry?.fields?.alignment | 'left',
        isEmbedded: true
    } as IHeadlineFields;
}