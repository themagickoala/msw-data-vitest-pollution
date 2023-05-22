import 'vitest-dom/extend-expect';
import { server } from './msw/mocks/server.js';
import { seed } from './msw/data';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { getCurrentTest } from '@vitest/runner';
import { dbCreator } from './msw/data/database';
import { drop } from '@mswjs/data';

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
  const db = dbCreator();
  const test = getCurrentTest();
  if (test) {
    test.context.db = db;
    drop(db);
    seed(db);
  }
  vi.clearAllMocks();
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
})

afterAll(() => {
  server.close();
});