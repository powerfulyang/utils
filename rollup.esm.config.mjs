import typescript from '@rollup/plugin-typescript';

import { readFileSync } from 'node:fs';

const str = readFileSync('./package.json', 'utf-8');
const pkg = JSON.parse(str);

const pkgDeps = Array.from(Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }));

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/esm-only/index.ts',
  output: [
    {
      sourcemap: true,
      entryFileNames: '[name].mjs',
      format: 'es',
      exports: 'named',
      preserveModules: true,
      dir: 'esm',
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.esm.json',
    }),
  ],
  external: [...pkgDeps],
};

export default config;
