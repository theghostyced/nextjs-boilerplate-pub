// @ts-nocheck
import { ILink } from '~/@types/contentful.d';

import buildUrl from './buildUrl';

// Takes an array or object of the Link Content model
// returns an array
const formatCta = (cta: Array<ILink> | ILink) => {
    if (!cta) return;

    const ctaArray = [];

    // if cta is an array
    if (Array.isArray(cta)) {
        cta.forEach((item) => {
            ctaArray.push({ label: item.fields.text, url: buildUrl(item) });
        });
    } else if (cta?.fields?.text) {
        const formattedUrl = buildUrl(cta);
        if (formattedUrl) {
            ctaArray.push({ label: cta.fields.text, url: formattedUrl });
        } else {
            // Printed in `yarn debug:errors` if content is missing data
            console.error(`This CTA content is missing a URL ${cta}`);
        }
    }

    return ctaArray as Array[ILink];
};

export default formatCta;