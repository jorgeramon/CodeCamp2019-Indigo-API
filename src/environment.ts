import { readSync } from 'node-yaml';

export const environment = readSync(`${ __dirname }/../environments/${ process.env.NODE_ENV || 'development' }.yml`);
