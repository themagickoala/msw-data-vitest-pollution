import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    /* eslint-disable sort-keys */
    alias: {
      '@/msw': path.resolve(__dirname, 'msw/'),
      '@/sb-helpers': path.resolve(__dirname, '.storybook/helpers'),
      '@/sb-images': path.resolve(__dirname, '.storybook/images'),
      '@/test-mocks': path.resolve(__dirname, 'test/mocks'),
      '@/test-utils': path.resolve(__dirname, 'test/utils'),
      '@': path.resolve(__dirname, 'src'),
    },
    /* eslint-enable sort-keys */
  },
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: process.env.CI ? ['text-summary', 'cobertura'] : ['text-summary', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    outputFile: {
      junit: './test-report.xml',
    },
    reporters: process.env.CI ? ['default', 'junit'] : ['dot', 'html'],
    setupFiles: ['./vitest.setup.js'],
    silent: false,
    testTimeout: 10000,
  },
});
