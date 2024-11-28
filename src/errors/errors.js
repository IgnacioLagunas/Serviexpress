export class EntitiyNotFoundError extends Error {
  constructor(entity) {
    super();
    this.message = `${entity} not found`;
    this.name = 'EntityNotFoundError';
    this.code = 404;
  }
}

export class MissingDataError extends Error {
  constructor(data = []) {
    super();
    this.message = `Missing data: ${data}`;
    this.name = 'MissingDataError';
    this.code = 400;
  }
}

export class RequestBodyRequiredError extends Error {
  constructor() {
    super();
    this.message = `The request body is required`;
    this.name = 'RequestBodyRequiredError';
    this.code = 400;
  }
}
