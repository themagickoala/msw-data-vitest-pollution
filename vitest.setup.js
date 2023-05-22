import 'vitest-dom/extend-expect';
import { server } from './msw/mocks/server.js';
import { resetDb, seed } from './msw/data';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
  resetDb();
  seed();
  vi.clearAllMocks();
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
})

afterAll(() => {
  server.close();
});