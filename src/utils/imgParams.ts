/* eslint-disable import/no-anonymous-default-export */
/**
 * @param {Object} obj
 * @param {string} [provider='imgix']
 * @return {string}
 */
export default (obj: any, provider: string = 'contentful') => {
    if (typeof obj !== 'object') return obj;

    if (provider == 'contentful') {
        Object.entries(obj).forEach(([key, value]) => {
            if (key === 'fit' && value === 'crop') {
                obj[key] = 'fill';
            } else if (key === 'fm' && (value === 'pjpg' || value === 'jpg')) {
                obj[key] = 'jpg&fl=progressive';
            }
        });
    }

    let string = '';
    Object.entries(obj).forEach(([key, value], index) => {
        string += `${index > 0 ? '&' : ''}${key}=${value}`;
    });
    return string;
};