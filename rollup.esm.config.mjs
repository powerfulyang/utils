import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' assert {type: 'json'};

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
      tsconfig: 'tsconfig.build.json',
    }),
  ],
  external: [...pkgDeps],
};

export default config;
