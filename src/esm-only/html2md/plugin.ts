import type { Node } from 'hast-util-raw/lib';
import type { Preset } from 'unified';
import { visit } from 'unist-util-visit';

export const preToMarkdownPlugin = (() => {
  return (tree: Node) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre') {
        const filtered = [];
        if (node.children.length === 1 && node.children[0].type === 'text') {
          filtered.push(node.children[0]);
        } else {
          // Remove all children except code. deep search
          const helper = node.children;

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
        }
        Reflect.set(node, 'children', filtered);
      }
    });
    return tree;
  };
}) as Preset;

export const katexToMarkdownPlugin = (() => {
  return (tree: Node) => {
    visit(tree, 'element', (node) => {
      // @ts-ignore
      if (node.tagName === 'span' && node.properties?.className?.includes('katex')) {
        const helper = node.children;
        const filtered = [];
        while (helper.length !== 0) {
          const current = helper.pop();
          if (current?.type === 'element') {
            if (current.tagName === 'annotation') {
              current.children = current.children.map((child) => {
                if (child.type === 'text') {
                  return {
                    type: 'text',
                    value: `$ ${child.value} $`,
                  };
                }
                return child;
              });
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
