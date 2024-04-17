import DynamicComponent from '../components/DynamicComponent/DynamicComponent';
import {Check, Uncheck} from '../components/elements/Icons/Icons';
import buildUrl from './buildUrl';
import {formatImage} from './formatMedia';
import lazyLoadComponent from './lazyLoadComponent';
import {pic} from './responsiveImg';
import {Options} from '@contentful/rich-text-react-renderer';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import {metadata} from 'lib/metadata';
import {system} from 'lib/system';
import Link from 'next/link';

import {Button} from '@/components/elements/Button/Button';
import Media from '@/components/elements/Media/Media';

export const richTextParse: Options = {
  renderNode: {
    [BLOCKS.TABLE]: (node, children) => {
      return (
        <div className="text__table" role="region" tabIndex={0}>
          <table>
            <tbody>{children}</tbody>
          </table>
        </div>
      );
    },
    [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => <th className="type-eyebrow-3">{children}</th>,
    [BLOCKS.TABLE_CELL]: (node, children) => <td className="type-body-3">{children}</td>,
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (children && children[0] != '') {
        const mark =
          children[0] == '%' ? <Check /> : children[0] == '-' ? <Uncheck /> : children[0];
        return <p>{mark}</p>;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      // render images as figures with their
      // description as a caption
      if (!node.data.target.fields) return;

      const image = {
        src: `https://${node.data.target.fields.file.url}`,
        height: node.data.target.fields.file.details.image.height,
        width: node.data.target.fields.file.details.image.width,
        altText: node.data.target.fields.description,
      };

      return (
        <figure>
          {pic({image})}

          {node.data.target.fields.description && (
            <figcaption className="type-caption article-body__caption">
              {node.data.target.fields.description}
            </figcaption>
          )}
        </figure>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      if (!node.data.target.fields) return;
      // embed with caption
      if (node.data.target.sys.contentType.sys.id === 'embed') {
        const embed = node.data.target;
        const embedOrUrl = embed.fields.embedOrUrl;
        const caption = embed.fields.caption;

        // Note that parseEmbed expects an array so we make
        // an array with just this item and the parsers do
        // the rest
        return (
          <>
            <figure>
              {/* { parseEmbed([embedOrUrl]) } */}

              {caption && (
                <figcaption className="type-caption article-body__caption">{caption}</figcaption>
              )}
            </figure>
          </>
        );
      }

      // blockquote with source
      // and this is just new
      if (node.data.target.sys.contentType.sys.id === 'quote') {
        const quote = node.data.target;
        let citation = `<strong>${quote.fields.citation}</strong>`;

        if (quote.fields.citationDescriptor) {
          citation += `, ${quote.fields.citationDescriptor}`;
        }

        return (
          <figure>
            {quote.fields.text && (
              <blockquote>
                {citation && (
                  <figcaption
                    className="quote__caption"
                    dangerouslySetInnerHTML={{__html: citation}}
                  />
                )}
              </blockquote>
            )}
          </figure>
        );
      }
      if (node.data.target.sys.contentType.sys.id === 'link') {
        return <Button label={node.data.target.fields.text} url={buildUrl(node.data.target)} />;
      }

      if (node.data.target.sys.contentType.sys.id === 'image') {
        const media = formatImage(node.data.target.fields.image);
        const ratio = node.data.target.fields.ratio ? node.data.target.fields.ratio : '1-1';
        return <Media media={media} ratio={ratio} />;
      }

      const capitalize = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      };

      // Need to capitalize component name to import it
      let componentName = capitalize(node.data.target.sys.contentType.sys.id);
      const WrappedComponent = lazyLoadComponent(componentName);

      return (
        <WrappedComponent
          id={node.data.target.sys.id}
          entry={node.data.target}
          richText={true}
          {...node.data.target.fields}
        />
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => {
      return (
        <Link href={buildUrl(node)} passHref scroll={false}>
          {children}
        </Link>
      );
    },
    [INLINES.HYPERLINK]: ({data}: any, children: any) => {
      // Return link if it's coded at the current environment url or as relative to the base,
      // otherwise, do <a> that opens in new window
      return (
        <>
          {data.uri.startsWith(metadata.url[system.environment]) || data.uri.startsWith('/') ? (
            <Link href={data.uri} passHref scroll={false}>
              {children}
            </Link>
          ) : (
            <a href={data.uri} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          )}
        </>
      );
    },
    // [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
    //   return <>{ReactHtmlParser(node.content[0].value)}</>;
    // }
  },
};
