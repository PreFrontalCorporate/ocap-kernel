import path from 'path';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@sqlite.org/sqlite-wasm'],
    include: [
      '@vitest/coverage-istanbul',
      'vitest-fetch-mock',
      'better-sqlite3',
    ],
  },

  plugins: [
    // Resolve imports using the "paths" property of the relevant tsconfig.json,
    // if possible.
    tsconfigPathsPlugin({
      skip: (dir) => dir === 'package-template',
    }),
  ],

  test: {
    environment: 'node',
    pool: 'threads',
    silent: true,
    testTimeout: 2000,
    restoreMocks: true,
    reporters: [
      [
        'default',
        {
          summary: false,
        },
      ],
    ],
    setupFiles: [
      path.join(__dirname, './packages/test-utils/src/env/fetch-mock.ts'),
    ],
    alias: [
      {
        find: '@metamask/kernel-shims/endoify',
        replacement: path.join(
          __dirname,
          './packages/kernel-shims/src/endoify.js',
        ),
        customResolver: (id) => ({ external: true, id }),
      },
    ],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['**/src/**/*.{ts,tsx}'],
      exclude: [
        '**/coverage/**',
        '**/dist/**',
        '**/test/**',
        '**/node_modules/**',
        '**/*.{test,spec}.{ts,tsx,js,jsx}',
        path.join(
          __dirname,
          './packages/create-package/src/package-template/**',
        ),
        path.join(__dirname, './packages/brow-2-brow/**'),
      ],
      thresholds: {
        autoUpdate: true,
        'packages/cli/**': {
          statements: 70,
          functions: 66.66,
          branches: 88.57,
          lines: 70,
        },
        'packages/create-package/**': {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100,
        },
        'packages/extension/**': {
          statements: 85.05,
          functions: 85.58,
          branches: 79.85,
          lines: 85.04,
        },
        'packages/kernel-errors/**': {
          statements: 98.63,
          functions: 95.23,
          branches: 92,
          lines: 98.63,
        },
        'packages/kernel-rpc-methods/**': {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100,
        },
        'packages/kernel-shims/**': {
          statements: 0,
          functions: 0,
          branches: 0,
          lines: 0,
        },
        'packages/kernel-store/**': {
          statements: 92.44,
          functions: 91.17,
          branches: 84.78,
          lines: 92.39,
        },
        'packages/kernel-utils/**': {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100,
        },
        'packages/logger/**': {
          statements: 98.55,
          functions: 95.83,
          branches: 97.29,
          lines: 100,
        },
        'packages/nodejs/**': {
          statements: 72.22,
          functions: 76.92,
          branches: 69.23,
          lines: 73.58,
        },
        'packages/ocap-kernel/**': {
          statements: 91.57,
          functions: 94.94,
          branches: 81.89,
          lines: 91.55,
        },
        'packages/streams/**': {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100,
        },
      },
    },
  },
});
