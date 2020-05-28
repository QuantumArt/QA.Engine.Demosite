/* eslint-disable dot-notation,@typescript-eslint/no-unused-vars,no-unused-vars */
import isNode from 'detect-node';

// noinspection ES6UnusedImports
import { config } from 'dotenv';

export const runtimeConfig = {
  apiBaseUrl: isNode ? process.env.API_BASE_URL : window['env'].API_BASE_URL,
};
