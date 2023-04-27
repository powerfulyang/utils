import type { Node } from 'hast-util-raw/lib';
import type { Preset } from 'unified';
import { visit } from 'unist-util-visit';

export const htmlToMarkdownPlugin = (() => {
  return (tree: Node) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        // Remove all children except code. deep search
        const helper = node.children;
        const filtered = [];
        while (helper.length !== 0) {
          const current = helper.pop();
          if (current?.type === 'element') {
            if (current.tagName === 'code') {
              filtered.push(current);
            } else {
              helper.push(...current.children);
            }
          }
        }
        Reflect.set(node, 'children', filtered);
      }
    });
    return tree;
  };
}) as Preset;
