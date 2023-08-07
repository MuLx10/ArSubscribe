import Arweave from 'arweave';

const debug = false;
const init = debug? {
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: false,
} : {};

export const arweave = Arweave.init(init);