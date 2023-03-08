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
].join('|');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  moduleNameMapper,
  transform: {
    '^.+\\.(ts|tsx|js)$': '@swc/jest',
  },
  transformIgnorePatterns: [`node_modules/.pnpm/(?!${esModules})`],
  testTimeout: 10000,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    resources: 'usable',
  },
  forceExit: true,
};
