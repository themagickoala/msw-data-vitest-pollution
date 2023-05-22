import { TestingLibraryMatchers } from 'vitest-dom/matchers';

declare module "vitest" {
  interface Assertion<T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {
  }
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, unknown> {
  }
}
