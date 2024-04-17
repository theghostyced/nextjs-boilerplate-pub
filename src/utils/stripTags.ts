const stripTags = (html: string, tag?: string) => {
    let tagRegEx;
    let newHtml;

    if (tag) {
        tagRegEx = new RegExp(`(<(/?)(${tag})([^>]*)>)`, 'gi');
        newHtml = html.replace(tagRegEx, '');
    } else {
        tagRegEx = new RegExp('(<([^s>])([^>]*)>)', 'gi');
        newHtml = html.replace(tagRegEx, '');
    }

    return newHtml;
};

export default stripTags;
