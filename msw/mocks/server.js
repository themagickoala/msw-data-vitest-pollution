import { handlers } from '../handlers';
import { isNodeProcess } from 'is-node-process';
import { setupServer } from 'msw/node';
import { setupWorker } from 'msw';

export const server = isNodeProcess() ? setupServer(...handlers) : setupWorker();
