import 'dotenv/config';
import os from 'os';
import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => {
  const cpus = os.cpus().length;
  const osThreads = process.env.CI ? cpus / 4 : undefined; // Locally, default behavior is used
  return {
    define: {
      'process.env': process.env,
    },
    test: {
      ...(process.env.CI && {
        pool: 'threads',
        poolOptions: {
          threads: {
            minThreads: osThreads,
            maxThreads: osThreads,
          },
        },
      }),
      deps: {
        external: [],
      },
      include: ['**/*.e2e-spec.ts'],
      globals: true,
      root: './src',
      setupFiles: ['./test/setup-e2e.ts'],
      hookTimeout: 200000,
      sequence: {
        shuffle: false, // Não embaralhar a ordem
      },
    },

    plugins: [
      tsConfigPaths(),
      swc.vite({
        module: { type: 'es6' },
      }),
    ],
  };
});
