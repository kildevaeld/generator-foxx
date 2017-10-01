// <reference path="../typings/index.d.ts" />
import * as a from '@arangodb';
import * as t from '@arangodb/foxx/router';

import { createRouter } from './route'

module.context.use('/', createRouter());
