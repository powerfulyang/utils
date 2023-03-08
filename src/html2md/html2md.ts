import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';
import remarkGfm from 'remark-gfm';
import type { IMarkdownConfig } from '@/interface/markdown';
import {
  MarkdownBullet,
  MarkdownBulletOrdered,
  MarkdownEmphasis,
  MarkdownFence,
  MarkdownListItemIndent,
  MarkdownStrong,
  MarkdownThematicBreak,
} from '@/interface/markdown';
import { iife } from '@/utils';

export async function html2md(
  html: string,
  config: IMarkdownConfig = {
    emphasis: MarkdownEmphasis._,
    strong: MarkdownStrong['*'],
    bulletUnordered: MarkdownBullet['+'],
    bulletOrdered: MarkdownBulletOrdered['.'],
    listItemIndent: MarkdownListItemIndent.Space,
    thematicBreak: MarkdownThematicBreak['-'],
    fence: MarkdownFence['`'],
  },
): Promise<string> {
  const file = await unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify, {
      closeAtx: false,
      fences: true,
      incrementListMarker: true,
      ruleSpaces: true,
      tightDefinitions: true,
      bullet: (() => {
        switch (config.bulletUnordered) {
          case MarkdownBullet['*']:
            return '*';
          case MarkdownBullet['+']:
            return '+';
          case MarkdownBullet['-']:
            return '-';
          default:
            return null;
        }
      })(),
      bulletOrdered: (() => {
        switch (config.bulletOrdered) {
          case MarkdownBulletOrdered[')']:
            return ')';
          case MarkdownBulletOrdered['.']:
            return '.';
          default:
            return null;
        }
      })(),
      emphasis: (() => {
        switch (config.emphasis) {
          case MarkdownEmphasis['*']:
            return '*';
          case MarkdownEmphasis._:
            return '_';
          default:
            return null;
        }
      })(),
      fence: (() => {
        switch (config.fence) {
          case MarkdownFence['`']:
            return '`';
          case MarkdownFence['~']:
            return '~';
          default:
            return null;
        }
      })(),
      listItemIndent: iife(() => {
        switch (config.listItemIndent) {
          case MarkdownListItemIndent.Space:
            return 'one';
          case MarkdownListItemIndent.Tab:
            return 'tab';
          default:
            return null;
        }
      }),
      rule: iife(() => {
        switch (config.thematicBreak) {
          case MarkdownThematicBreak['*']:
            return '*';
          case MarkdownThematicBreak['-']:
            return '-';
          case MarkdownThematicBreak._:
            return '_';
          default:
            return null;
        }
      }),
      strong: iife(() => {
        switch (config.strong) {
          case MarkdownStrong['*']:
            return '*';
          case MarkdownStrong._:
            return '_';
          default:
            return null;
        }
      }),
    })
    .process(html);

  return file.toString().trim();
}
