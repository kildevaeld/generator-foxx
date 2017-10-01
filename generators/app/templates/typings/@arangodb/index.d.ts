

declare module '@arangodb' {

  export interface User {
    username: string;
    passwd?: string;
    active?: boolean;
    extra?: any;
  }

  export interface CollectionProperties {

  }

  export interface CollectionFigures {

  }

  export interface IndexOptions {
    type: 'hash' | 'skiplist' | 'fulltext' | 'geo1' | 'geo2';
    sparse?: boolean;
    unique?: boolean;
    deduplicate?: boolean;
    fields?: string[];
  }

  export interface Collection {
    drop(): void;
    truncate(): void;
    properties(): CollectionProperties;
    figures(): CollectionFigures;
    load(): void;
    revision(): number;
    path(): string;
    checksum(): void;
    unload(): void;
    rename(name: string): void;

    count(): number;
    any(): any;
    document(doc: IDocument | string | DocumentQuery): any;
    save(a: any): any;
    save(from: string, to: string, a: any): void;
    create(a: any): any;
    all(): this;
    toArray(): any[];

    firstExample(path: string | any, ...rest: string[]): any;

    ensureIndex(options: IndexOptions): void;
  }

  export interface CollectionCreateOptions {
    waitForSync?: boolean;
    journalSize?: number;

  }

  export interface IDocument {
    _id: string;
    _key: string;
    [key: string]: any;
  }

  type DocumentQuery = { _id: string }

  interface Iterator<T, U> {
    (value: T, index: number, cursor: Cursor): U;
  }

  export interface Cursor {
    toArray(): any[];
    hasNext(): boolean;
    next(): IDocument;
    count(): number;
    each<T, U>(fn: Iterator<T, U>): U;
    every<T>(fn: Iterator<T, boolean>): boolean;
    some<T>(fn: Iterator<T, boolean>): boolean;
    map<T, U>(fn: Iterator<T, U>): U;
    reduce<T, U>(init: U, fn: Iterator<T, U>): U;

  }

  export interface TransactionOptions {
    collections: {
      write?: string | string[],
      read?: string | string[]
    };
    action: string | Function;
    waitForSync?: boolean;
    lockTimeout?: number;
    params?: any;
  }

  export class DB {
    _name(): string;
    _id(): number;
    _path(): string;
    _isSystem(): boolean;
    _useDatabase(name: string): void;
    _createDatabase(name: string, options?: any, users?: User[]): void;
    _dropDatabase(name: string): void;
    _engineStats(): any;
    // Collection
    _collections(): Collection[]
    _drop(name: string | number | Collection): void;
    _truncate(name: string | number | Collection): void
    _collection(name: string): Collection | null;
    _create(name: string, options?: CollectionCreateOptions, type?: 'document' | 'edge'): Collection;
    _createDocumentCollection(name: string): Collection;
    _createEdgeCollection(name: string): Collection;
    // Document
    _document(doc: DocumentQuery | string): any;
    _exists(doc: DocumentQuery | string): boolean;
    _query(a: any): Cursor;

    _executeTransaction(options: TransactionOptions): any;
  }



  export interface Error {
    code: number;
  }

  export interface Errors {
    ERROR_NO_ERROR: Error;
    ERROR_FAILED: Error;
    ERROR_SYS_ERROR: Error;
    ERROR_OUT_OF_MEMORY: Error;
    ERROR_INTERNAL: Error;
    ERROR_ILLEGAL_NUMBER: Error;
    ERROR_NUMERIC_OVERFLOW: Error;
    ERROR_ILLEGAL_OPTION: Error;
    ERROR_DEAD_PID: Error;

    // Http Errors
    ERROR_HTTP_BAD_PARAMETER: Error;
    ERROR_HTTP_UNAUTHORIZED: Error;
    ERROR_HTTP_FORBIDDEN: Error;
    ERROR_HTTP_NOT_FOUND: Error;
    ERROR_HTTP_METHOD_NOT_ALLOWED: Error;
    ERROR_HTTP_NOT_ACCEPTABLE: Error;
    ERROR_HTTP_PRECONDITION_FAILED: Error;
    ERROR_HTTP_SERVER_ERROR: Error;
    ERROR_HTTP_SERVICE_UNAVAILABLE: Error;

    // General ArangoDB storage errors
    ERROR_ARANGO_CONFLICT: Error;
    ERROR_ARANGO_DATADIR_INVALID: Error;
    ERROR_ARANGO_DOCUMENT_NOT_FOUND: Error;
    ERROR_ARANGO_COLLECTION_NOT_FOUND: Error;
    ERROR_ARANGO_COLLECTION_PARAMETER_MISSING: Error;
    ERROR_ARANGO_DOCUMENT_HANDLE_BAD: Error;
    ERROR_ARANGO_MAXIMAL_SIZE_TOO_SMALL: Error;
    ERROR_ARANGO_DUPLICATE_NAME: Error;
    ERROR_ARANGO_ILLEGAL_NAME: Error;
    ERROR_ARANGO_NO_INDEX: Error;
    ERROR_ARANGO_UNIQUE_CONSTRAINT_VIOLATED: Error;
  }

  export const db: DB;
  export const aql: any;
  export const errors: Errors;
  export const time: () => number;

}


declare module '@arangodb/crypto' {
  export function createNonce(): string;
  export function checkAndMarkNonce(nonce: string): string;

  export function rand(): number;
  export function genRandomAlphaNumbers(length: number): string;
  export function genRandomNumbers(length: number): string;
  export function genRandomSalt(length: number): string;

  export function jwtEncode(key: string | null, message: string, algorithm: string): string;
  export function jwtDecode(key: string | null, token: string, noVerify: boolean): string | null;
  export function jwtCanonicalAlgorithmName(name: string): string;

  export function md5(msg: string): string;
  export function sha1(msg: string): string;
  export function sha224(msg: string): string;
  export function sha256(msg: string): string;
  export function sha384(msg: string): string;
  export function sha512(msg: string): string;

  export function constantEquals(a: string, b: string): boolean;
  export function pbkdf2(salt: string, passwd: string, iterations: number, keyLength: number): string;
  export function hmac(key: string, message: string, algorithm: string): string

}
