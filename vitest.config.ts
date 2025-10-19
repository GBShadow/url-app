import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  test: {
    globals: true,
    root: './src',
    exclude: [...configDefaults.exclude],
    deps: {
      optimizer: {
        ssr: {
          exclude: [],
        },
      },
    },
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
