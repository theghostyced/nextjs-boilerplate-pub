import cn from 'classnames';
import { metadata } from 'lib/metadata';
import imgParams from './imgParams';

const imagesAPI = metadata.images.api;

type ImageFormats = 'avif' | 'webp' | 'gif' | 'jpg';

export interface IMediaProps {
    height: string | number;
    width: string | number;
    src: string;
    srcSet?: string;
    quality: string | number;
    title?: string;
    altText: string;
    format?: string;
}

interface IVideoProps {
    video: IMediaProps;
    poster: IMediaProps;
    posterSize: string | number | undefined;
    hide: string | undefined | null;
    className?: string;
    scope?: string;
    scopeStyles?: any;
}

interface IImageProps {
    image: IMediaProps | any;
    mobileImage?: IMediaProps | any;
    srcSet?: [1500];
    mobileSrcSet?: [1100];
    sizes?: string | number;
    mobileSizes?: string | number;
    formats?: ImageFormats[];
    mobileBreak?: any;
    loading?: string;
    hide?: string | undefined | null;
    className?: string;
    scope?: string;
    scopeStyles?: any;
}

interface IResponsiveImageProps extends IImageProps {
    video?: IMediaProps | undefined;
    mobileVideo?: IMediaProps | undefined;
}

export interface IResponsiveMediaProps extends IImageProps {
    video?: IMediaProps | undefined;
    mobileVideo?: IMediaProps | undefined;
}

/**
 * @param {Object} [video] - the background video (shows instead of the image)
 *     @param {string} video.src
 *     @param {string} video.title - video alt text
 *     @param {string} video.format - the video file format
 * @param {Object} [poster] - the background image
 *     @param {string} poster.src
 *     @param {number} [poster.quality=60] - a number between 0 and 100 that is the compression quality for resizing. 100 is best quality but largest, 0 is worst quality but smallest
 * @param {number} [posterSize=750] - widths for the desktop srcSet
 * @param {('small'|'large')} [hide] - should this be hidden on small or large screens? If so, which?
 * @param {string} [className] - class(es) for the video element
 * @param {string} [scope] - an optional parent module to namespace block elements for better styling hooks
 * @param {Object} [scopeStyles] - an optional mapping class names to component style class names
 * @return {HTMLElement}
 */
function vid({
    video,
    poster,
    posterSize = 750,
    hide,
    className,
    scope,
    scopeStyles = {},
}: IVideoProps) {
    const videoClassNames = cn(className, {
        [`u-img-hide-${hide}`]: hide,
        [scopeStyles[`${scope}__pic`]]: scope && scopeStyles[`${scope}__pic`],
    });

    const conditionalAttrs: any = {};

    if (poster && poster.src) {
        const posterParams = imgParams(
            {
                w: posterSize,
                q: (poster.quality) ? poster.quality : 60,
                fm: 'jpg',
            },
            imagesAPI,
        );

        conditionalAttrs.poster = `${poster.src}?${posterParams}`;
    }

    return (
        <video className={videoClassNames}
            src={video.src}
            title={video.title}
            loading="lazy"
            muted autoPlay playsInline loop
            {...conditionalAttrs}
        > </video>
    );
}


/**
 * @param {Object} [image] - the background image
 *     @param {string} image.src
 *     @param {string} [image.altText]
 *     @param {number} [image.quality=60] - a number between 0 and 100 that is the compression quality for resizing. 100 is best quality but largest, 0 is worst quality but smallest
 *     @param {number} [image.width] - the natural width of the image
 *     @param {number} [image.height] - the natural height of the image
 * @param {Object} [mobileImage] - the mobile background image
 *     @param {string} mobileImage.src
 *     @param {string} [mobileImage.altText]
 *     @param {number} [mobileImage.quality=60] - a number between 0 and 100 that is the compression quality for resizing. 100 is best quality but largest, 0 is worst quality but smallest
 *     @param {number} [mobileImage.width] - the natural width of the image
 *     @param {number} [mobileImage.height] - the natural height of the image
 * @param {number[]} [srcSet=[1500]] - widths for the desktop srcSet - largest to smallest
 * @param {number[]} [mobileSrcSet=[1100]] - widths for the mobile srcSet - largest to smallest
 * @param {string} [sizes] - desktop sizes attribute
 * @param {string} [mobileSizes] - mobile sizes attribute
 * @param {string[]} [formats=['avif','webp']] - an array of the image formats. If a single format is supplied, it will be used for the <img>, otherwise 'jpg' will be used
 * @param {number} [mobileBreak=600] - px value where the mobile to desktop switch happens. IF this is changed, the helper styles in `scss/_2_layout/_hide.scss` also need to be adjusted
 * @param {('lazy'|'eager')} [loading=lazy] - how the images should be loaded
 * @param {('small'|'large')} [hide] - should this be hidden on small or large screens? If so, which?
 * @param {string} [className] - class(es) for the picture element
 * @param {string} [scope] - an optional parent module to namespace block elements for better styling hooks
 * @param {Object} [scopeStyles] - an optional mapping class names to component style class names
 * @return {HTMLElement}
 */
function pic({
    image = {},
    mobileImage = {},
    srcSet = [1500],
    mobileSrcSet = [1100],
    sizes,
    mobileSizes,
    formats = ['avif', 'webp'],
    mobileBreak = 600,
    loading,
    hide,
    className,
    scope,
    scopeStyles = {},
}: IImageProps) {
    const pictureClassName = cn(className, {
        [`u-img-hide-${hide}`]: hide,
        [scopeStyles[`${scope}__pic`]]: scope && scopeStyles[`${scope}__pic`],
    });

    const imageType = image.format || mobileImage.format || 'jpg';

    const imageParams = imgParams(
        {
            w: image.src ? srcSet[srcSet.length - 1] : mobileSrcSet[mobileSrcSet.length - 1],
            q: image.quality ? image.quality : 60,
            fm: imageType,
        },
        imagesAPI,
    );
    const imageSrc = `${image.src || mobileImage.src}?${imageParams}`;

    const conditionalAttrs: any = {};

    if (image.src && image.height && image.width) {
        conditionalAttrs.height = image.height;
        conditionalAttrs.width = image.width;
    } else if (mobileImage.src && mobileImage.height && mobileImage.width) {
        conditionalAttrs.height = mobileImage.height;
        conditionalAttrs.width = mobileImage.width;
    }

    return (
        <picture className={pictureClassName} >
            {hide === 'small' ?
                <source
                    srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    media={`(max-width: ${parseInt(mobileBreak)}px)`
                    }
                /> :

                (mobileImage.src && (hide === 'large' || image.src || mobileSrcSet.length > 1 || formats.length > 1) ?
                    (() => {
                        formats = mobileImage.format == 'gif' ? ['gif'] : formats;
                        return formats.map((format, index) => {
                            const formatSrcSet = mobileSrcSet.map((source) => {
                                const sourceImageParams = imgParams(
                                    {
                                        w: source,
                                        q: (mobileImage.quality) ? mobileImage.quality : 60,
                                        fm: format,
                                    },
                                    imagesAPI,
                                );

                                return `${mobileImage.src}?${sourceImageParams} ${source}w`;
                            })
                                .join(', ');

                            const conditionalAttrs = {
                                height: mobileImage.width && mobileImage.height ? mobileImage.height : undefined,
                                media: hide === 'large' || image.src ? `(max-width:${parseInt(mobileBreak)}px)` : undefined,
                                sizes: mobileSizes ? mobileSizes : undefined,
                                width: mobileImage.width && mobileImage.height ? mobileImage.width : undefined,
                            };

                            return (
                                // @ts-ignore
                                <source
                                    key={index}
                                    srcSet={formatSrcSet}
                                    type={`image/${format}`
                                    }
                                    {...conditionalAttrs}
                                />
                            );
                        });
                    })() :

                    null
                )
            }

            {
                hide === 'large' ?
                    <source
                        srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        media={`(max-width: ${parseInt(mobileBreak) + 1}px)`
                        }
                    /> :

                    (image && image.src && (hide === 'small' || mobileImage.src || srcSet.length > 1 || formats.length > 1)) ?
                        (() => {
                            formats = image.format == 'gif' ? ['gif'] : formats;
                            return formats.map((format, index) => {
                                const formatSrcSet = srcSet.map((source) => {
                                    const sourceImageParams = imgParams(
                                        {
                                            w: source,
                                            q: (image.quality) ? image.quality : 60,
                                            fm: format,
                                        },
                                        imagesAPI,
                                    );

                                    return `${image.src}?${sourceImageParams} ${source}w`;
                                })
                                    .join(', ');

                                const conditionalAttrs = {
                                    height: image.width && image.height ? image.height : undefined,
                                    media: hide === 'small' || mobileImage.src ? `(min-width:${parseInt(mobileBreak) + 1}px)` : undefined,
                                    sizes: sizes ? sizes : undefined,
                                    width: image.width && image.height ? image.width : undefined,
                                };

                                return (
                                    // @ts-ignore
                                    <source
                                        key={index}
                                        srcSet={formatSrcSet}
                                        type={`image/${format}`
                                        }
                                        {...conditionalAttrs}
                                    />
                                );
                            });
                        })() : null
            }

                <img
                    alt={image.altText || mobileImage.altText}
                    decoding="async"
                    loading={loading}
                    src={imageSrc}
                    {...conditionalAttrs}
                />
            </ picture>
            );
}


/**
* @param {Object} [image] - the background image
*     @param {string} image.src
*     @param {string} [image.altText]
*     @param {number} [image.quality=60] - a number between 0 and 100 that is the compression quality for resizing. 100 is best quality but largest, 0 is worst quality but smallest
*     @param {number} [image.width] - the natural width of the image
*     @param {number} [image.height] - the natural height of the image
*     @param {string} [image.format] - the file format of the image
* @param {Object} [mobileImage] - the mobile background image
*     @param {string} mobileImage.src
*     @param {string} [mobileImage.altText]
*     @param {number} [mobileImage.quality=60] - a number between 0 and 100 that is the compression quality for resizing. 100 is best quality but largest, 0 is worst quality but smallest
*     @param {number} [mobileImage.width] - the natural width of the image
*     @param {number} [mobileImage.height] - the natural height of the image
*     @param {string} [mobileImage.format] - the file format of the image
* @param {Object} [video] - the background video (shows instead of the image)
*     @param {string} video.src
*     @param {string} video.title - video alt text
*     @param {string} video.format - the video file format
* @param {Object} [mobileVideo] - the mobile background video (shows instead of the mobileImage)
*     @param {string} mobileVideo.src
*     @param {string} mobileVideo.title - video alt text
*     @param {string} mobileVideo.format - the video file format
* @param {number[]} [srcSet] - widths for the desktop srcSet - largest to smallest
* @param {number[]} [mobileSrcSet] - widths for the mobile srcSet - largest to smallest
* @param {string} [sizes] - desktop sizes attribute
* @param {string} [mobileSizes] - mobile sizes attribute
* @param {string[]} [formats=['avif','webp']] - an array of the image formats. If a single format is supplied, it will be used for the <img>, otherwise 'jpg' will be used
    * @param {number} [mobileBreak=600] - px value where the mobile to desktop switch happens. IF this is changed, the helper styles in `scss/_2_layout/_hide.scss` also need to be adjusted
    * @param {('lazy' | 'eager')} [loading=lazy] - how the images should be loaded
    * @param {string} [className] - base class(es) for the responsive img elements
    * @param {string} [scope] - an optional parent module to namespace block elements for better styling hooks
    * @param {Object} [scopeStyles] - an optional mapping class names to component style class names
    * @return {HTMLElement}
    */
    function responsiveImg({
        image = {},
        mobileImage = {},
        video,
        mobileVideo,
        srcSet,
        mobileSrcSet,
        mobileBreak = 600,
        sizes,
        mobileSizes,
        formats = ['avif', 'webp'],
        loading = 'lazy',
        className,
        scope,
        scopeStyles = {},
}: IResponsiveImageProps) {
if ((image && image.src) || (mobileImage && mobileImage.src) || (video && video.src) || (mobileVideo && mobileVideo.src)) {
return (
                <>
                    {mobileVideo && mobileVideo.src &&
                        vid({
                            video: mobileVideo,
                            poster: mobileImage,
                            posterSize: mobileSrcSet ? mobileSrcSet[mobileSrcSet.length - 1] : 750,
                            hide: (video && video.src) ? 'large' : image.src,
                            className: className,
                            scope: scope || className,
                            scopeStyles: scopeStyles,
                        })
                    }

                    {
                        video && video.src &&
                        vid({
                            video: video,
                            poster: image,
                            posterSize: srcSet ? srcSet[srcSet.length - 1] : 1100,
                            hide: (mobileVideo && mobileVideo.src) ? 'small' : mobileImage.src,
                            className: className,
                            scope: scope || className,
                            scopeStyles: scopeStyles,
                        })
                    }

                    {
                        ((image.src && !(video && video.src)) || (mobileImage.src && !(mobileVideo && mobileVideo.src))) &&
                        pic({
                            image: image,
                            mobileImage: mobileImage,
                            srcSet: srcSet || image.srcSet,
                            mobileSrcSet: mobileSrcSet || mobileImage.srcSet,
                            sizes: sizes || image.sizes,
                            mobileSizes: mobileSizes || mobileImage.sizes,
                            formats: formats,
                            loading: loading,
                            hide: null,
                            className: className,
                            scope: scope || className,
                            scopeStyles: scopeStyles,
                            mobileBreak: mobileBreak,
                        })
                    }
                </>
                );
}
}

export {pic, responsiveImg, vid};