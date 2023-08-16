import type { Root } from 'hast-util-raw/lib';
import type { Preset } from 'unified';
import { visit } from 'unist-util-visit';

export const preToMarkdownPlugin = (() => {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      const _node = node;
      if (_node.tagName === 'pre') {
        const filtered = [];
        if (_node.children.length === 1 && _node.children[0].type === 'text') {
          filtered.push(_node.children[0]);
        } else {
          // Remove all children except code. deep search
          const helper = _node.children;

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
        _node.children = filtered;
      }
    });
    return tree;
  };
}) as Preset;

export const katexToMarkdownPlugin = (() => {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      const _node = node;
      if (_node.tagName === 'span' && (_node.properties?.className as string)?.includes('katex')) {
        const helper = _node.children;
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
        _node.children = filtered;
      }
    });
    return tree;
  };
}) as Preset;
