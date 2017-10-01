import * as cr from '@arangodb/foxx/router';
import { Request, Response } from '@arangodb/foxx/router';

export function createRouter() {
  const router = cr();

  router.get(handler);

  return router;
}

function handler(req: Request, res: Response) {
  res.write("Hello, World");
}
