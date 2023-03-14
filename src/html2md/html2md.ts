import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';
import remarkGfm from 'remark-gfm';
import stringWidth from 'string-width';
import rehypeRemoveComments from 'rehype-remove-comments';
import type { Unsafe } from 'mdast-util-to-markdown';
import { defaultHandlers } from 'mdast-util-to-markdown';

const { text } = defaultHandlers;

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
      },
    })
    .process(html);

  return file.toString().trim();
}
