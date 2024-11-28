export class AuthHeaderMissingError extends Error {
  constructor() {
    super();
    this.message = 'Auth headers missing';
    this.name = 'AuthHeaderMissingError';
    this.code = 401;
  }
}
