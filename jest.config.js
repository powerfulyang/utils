const { pathsToModuleNameMapper } = require('@powerfulyang/lint');
const tsconfig = require('./tsconfig.json');

const moduleNameMapper = pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
  prefix: '<rootDir>/',
});

const esModules = [
  'unified',
  'rehype.+',
  'remark.+',
  'bail',
  'is-plain-obj',
  'trough',
  'vfile',
  'hast.+',
  'mdast.+',
  'unist.+',
  'property-information',
  'space-separated-tokens',
  'comma-separated-tokens',
  'web-namespaces',
  'trim.+',
  'zwitch',
  'longest-streak',
  'micromark.+',
  'decode-named-character-reference',
  'ccount',
  'escape-string-regexp',
  'markdown.+',
  'string-width',
  'strip.+',
  'ansi.+',
].join('|');

/**
 * @type {import('jest').Config}
 */
module.exports = {
  moduleNameMapper,
  transform: {
    '^.+\\.(ts|tsx|js)$': '@swc/jest',
  },
  transformIgnorePatterns: [`node_modules/.pnpm/(?!${esModules})`],
  testEnvironment: 'jsdom',
  setupFiles: ['./.jest/jest.setup.ts'],
  maxWorkers: '50%',
  reporters: process.env.CI && [
    [
      'github-actions',
      {
        silent: false,
      },
    ],
    'summary',
  ],
};
