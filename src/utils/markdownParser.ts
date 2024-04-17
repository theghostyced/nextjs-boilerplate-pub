import DOMPurify from 'dompurify';
import parser from 'html-react-parser';
import markdownIt from 'markdown-it';
import stripTags from './stripTags';

/**
 * Converts an HTML string to one or more React elements
 * @param {string} html
 * @return {HTMLElement}
 */
export const htmlToReactElement = (html: string) => parser(DOMPurify.sanitize(html));

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
};

/**
 * Converts a Markdown string to one or more React elements
 * @param {string} markdown
 * @param {boolean} [allowHtml=false] - whether to allow HTML in source content
 * @param {string} [strip=false] - whether to strip a tag from the output
 * @return {HTMLElement}
 */
export const markdownToReactElement = (markdown: string, allowHtml = true, strip = '') => {
  markdownItOptions.html = allowHtml;

  let html = markdownIt(markdownItOptions).renderInline(markdown);

  if (strip !== '') {
    if (Array.isArray(strip)) {
      strip.forEach((t) => {
        html = stripTags(html, t);
      });
    } else {
      html = stripTags(html, strip);
    }
  }
  return parser(html);
};
