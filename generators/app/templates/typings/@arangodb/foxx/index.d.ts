
declare module '@arangodb/foxx/router' {

  import { SchemaMap, Schema } from 'joi';

  module FoxxRouter {

    interface Context {
      use(router: Router, tag?: string): void;
      use(path: string, router: Router, tag?: string): void;
      fileName(name: string): string
      readonly mount: string;
      readonly basePath: string;
    }

    interface Model {
      fromClient?: (o: any) => any;
      forClient?: (o: any) => any;
      schema: Schema | SchemaMap;
    }

    type ISchema = Model | Schema | SchemaMap

    interface Endpoint {
      header(name: string, schema?: ISchema, description?: string): this;
      pathParam(name: string, schema?: ISchema, description?: string): this;
      queryParam(name: string, schema?: ISchema, description?: string): this;
      body(model?: ISchema, mimes?: string[], description?: string): this;
      response(model: ISchema | ISchema[], description?: string): this;
      response(status?: number | string, model?: ISchema | ISchema[], mimes?: string[], description?: string): this;
      error(status?: number | string, description?: string): this;
      summary(text: string): this;
      description(): string;
      description(text: string): this;
    }

    interface CookieOptions {
      ttl?: number;
      algorithm?: 'sha25' | 'sh512' | 'md5';
      secret?: string;
      path?: string;
      domain?: string;
      secure?: boolean;
      httpOnly?: boolean;
    }

    interface SendFileOptions {
      lastModified?: boolean;
    }


    interface ThrowOptions {
      cause: Error;
      extra: any;
    }

    interface Request {
      arangoUser: string | null;
      arangoVersion: number;
      baseUrl: string;
      body: any;
      context: Context;
      database: string;
      headers: any;
      hostname: string;
      method: string;
      originalUrl: string;
      path: string;
      pathParams: any;
      port: number;
      protocol: string;
      queryParams: any;
      rawBody: Buffer;
      remoteAddress: string;
      remoteAddresses: string[];
      remotePort: number;
      suffix: string;
      trustProxy: boolean;
      url: string;
      xhr: boolean;
      makeAbsolute(path: string, query?: string | { [key: string]: any }): string;
      reverse(name: string, options?: any): string;
      [key: string]: any;
    }

    interface Response {
      send(data: any, type?: string): this;
      sendFile(path: string, options?: SendFileOptions): this;
      sendStatus(status: number): this;
      attachment(fileName?: string): this;
      cookie(name: string, value: string, options?: CookieOptions): this;
      download(path: string, fileName?: string): this;
      getHeader(name: string): string | undefined;
      removeHeader(name: string): this;
      setHeader(name: string, value: string): this;
      set(name: string, value: string): this;
      set(headers: { [key: string]: string }): this;
      status(status: string | number): this;
      throw(status: number | string, reason?: string, options?: ThrowOptions): this;
      type(type?: string): string;
      vary(h: string[]): this;
      vary(...h: string[]): this;
      write(data: string | Buffer): this;
      json(i: any): this;
      redirect(url: string): this;
      redirect(status: number, url: string): this;

      body?: Buffer | string;
      readonly context: Context;
      headers: { [key: string]: string };
      statusCode: number;
    }

    interface RequestHandler {
      (req: Request, res: Response): void;
    }

    interface MiddlewareFunc {
      (req: Request, res: Response, next: Function): void;
    }

    interface MiddlewareObject {
      register(endpoint: Endpoint): MiddlewareFunc;
    }

    type Middleware = MiddlewareFunc | MiddlewareObject

    interface Router {
      tag(tag: string): void;
      get(path: string, m: Middleware, fn: RequestHandler, name?: string): Endpoint;
      get(path: string, fn: RequestHandler, name?: string): Endpoint;

      get(m: Middleware, fn: RequestHandler, name?: string): Endpoint;
      get(m: Middleware, m2: Middleware, fn: RequestHandler, name?: string): Endpoint;
      get(fn: RequestHandler, name?: string): Endpoint;

      post(path: string, fn: RequestHandler, name?: string): Endpoint;
      post(fn: RequestHandler, name?: string): Endpoint;
      put(path: string, fn: RequestHandler, name?: string): Endpoint;
      put(fn: RequestHandler, name?: string): Endpoint;
      delete(path: string, fn: RequestHandler, name?: string): Endpoint;
      delete(fn: RequestHandler, name?: string): Endpoint;
      all(path: string, fn: RequestHandler, name?: string): Endpoint;
      all(fn: RequestHandler, name?: string): Endpoint;
      patch(path: string, fn: RequestHandler, name?: string): Endpoint;
      patch(fn: RequestHandler, name?: string): Endpoint;

      use(path: string, fn: RequestHandler | Router, name?: string): Endpoint;
      use(fn: Middleware | Router, name?: string): Endpoint;

    }

  }

  function FoxxRouter(): FoxxRouter.Router;

  export = FoxxRouter;

}



declare module '@arangodb/foxx/auth' {

  type HashMethod = 'sha256' | 'sha512' | 'sha224' | 'sha384' | 'sha1' | 'md5';

  interface AuthData {
    method: HashMethod;
    salt: string;
    hash: string;
  }

  interface Authenticator {
    create(password: string): AuthData;
    verify(hash: AuthData, password: string): boolean;
  }


  interface CreateAuthOptions {
    method?: HashMethod;
    saltLength?: number;
  }

  function createAuth(options?: CreateAuthOptions): Authenticator;


  export = createAuth;

}

declare module '@arangodb/foxx/graphql' {

  import { Router } from '@arangodb/foxx/router';
  import { GraphQLSchema } from 'graphql-sync';


  module GraphQLRouter {

    interface GraphQLRouterOptions {
      schema: GraphQLSchema;
      context?: any;
      rootValue?: any;
      pretty?: boolean;
      formatError?: Function;
      validationRules?: Array<any>;
      graphiql?: boolean;
      graphql?: any;
    }

  }

  function GraphQLRouter(options: GraphQLRouter.GraphQLRouterOptions | GraphQLSchema): Router;

  export = GraphQLRouter;

}
