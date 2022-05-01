import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const pkgDeps = Array.from(Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }));

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: [
    {
      entryFileNames: `[name].cjs`,
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
    },
    {
      sourcemap: true,
      entryFileNames: '[name].mjs',
      format: 'esm',
      exports: 'named',
      preserveModules: true,
      dir: 'dist/esm',
    },
  ],
  plugins: [typescript()],
  external: [...pkgDeps],
};

export default config;
