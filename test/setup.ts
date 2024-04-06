import { BroadcastChannel } from 'node:worker_threads';

Object.defineProperty(global, 'BroadcastChannel', {
  value: BroadcastChannel,
});

jest.setTimeout(60000);
