import type { Unsafe } from 'mdast-util-to-markdown';
import { defaultHandlers } from 'mdast-util-to-markdown';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import rehypeRemoveComments from 'rehype-remove-comments';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import stringWidth from 'string-width';
import { unified } from 'unified';
import {
  katexToMarkdownPlugin,
  preToMarkdownPlugin,
  tableToMarkdownPlugin,
} from '@/esm-only/html2md/plugin';
import { convertURLToAbsoluteURL } from './convertURLToAbsoluteURL';

const { text, link, code, image } = defaultHandlers;

/**
 * @description By default, mdast-util-to-markdown will escape some characters in some
 * conditions.
 * @description See `unsafe.js` for all rules:
 * https://github.com/syntax-tree/mdast-util-to-markdown/blob/main/lib/unsafe.js#L24
 * @description In our case, we don't want to apply some of them.
 */
function unsafeFilter(rule: Unsafe): boolean {
  // We don't want to escape '[' as it's wildly used in checkbox and backlink.
  return rule.character !== '[';
}

export async function html2md(html: string): Promise<string> {
  const file = await unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(tableToMarkdownPlugin)
    .use(katexToMarkdownPlugin)
    .use(preToMarkdownPlugin)
    .use(rehypeRemoveComments)
    .use(rehypeRemark, {
      unchecked: '[ ] ',
      checked: '[x] ',
    })
    .use(remarkGfm, {
      stringLength: stringWidth,
    })
    .use(remarkStringify, {
      bullet: '+',
      bulletOrdered: '.',
      listItemIndent: 'one',
      resourceLink: true,
      fences: true,
      emphasis: '_',
      rule: '-',
      tightDefinitions: true,
      bulletOther: '-',
      bulletOrderedOther: ')',
      handlers: {
        text: (node, parent, context, safeOptions) => {
          return text(
            node,
            parent,
            { ...context, unsafe: context.unsafe.filter(unsafeFilter) },
            safeOptions,
          );
        },
        link: (node, parent, context, safeOptions) => {
          return link(
            {
              ...node,
              url: convertURLToAbsoluteURL(node.url),
            },
            parent,
            context,
            safeOptions,
          );
        },
        code: (node, parent, context, safeOptions) => {
          // Remove last line break
          const value = node.value.trimEnd();
          return code(
            {
              ...node,
              value,
            },
            parent,
            context,
            safeOptions,
          );
        },
        image: (node, parent, context, safeOptions) => {
          return image(
            {
              ...node,
              url: convertURLToAbsoluteURL(node.url),
            },
            parent,
            context,
            safeOptions,
          );
        },
      },
    })
    .process(html);

  return file.toString().trim();
}
