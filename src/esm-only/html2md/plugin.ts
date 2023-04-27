import type { Preset } from 'unified';
import { visit } from 'unist-util-visit';
import type { Node } from 'hast-util-raw/lib';

export const htmlToMarkdownPlugin = (() => {
  return (tree: Node) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        // Remove all children except code.
        const filterCode = node.children.filter((child) => {
          return child.type === 'element' && child.tagName === 'code';
        });
        Reflect.set(node, 'children', filterCode);
      }
    });
    return tree;
  };
}) as Preset;
