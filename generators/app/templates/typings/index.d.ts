/// <reference path="../node_modules/@types/node/index.d.ts" />

import { Context } from '@arangodb/foxx/router';

declare global {
  interface NodeModule {
    context: Context;
    isProduction: boolean;
  }
}

