export class UserNotLoggedInError extends Error {
  constructor() {
    super();
    this.message = 'You have to be logged in to perform this action';
    this.name = 'UserNotLoggedInError';
    this.code = 401;
  }
}

export class UserNotAuthorizedError extends Error {
  constructor() {
    super();
    this.message = 'You are not authorized to perform this action';
    this.name = 'UserNotAuthorizedError';
    this.code = 401;
  }
}

export class SamePasswordAsBeforeError extends Error {
  constructor() {
    super();
    this.message = 'You cannot use the same password as before';
    this.name = 'SamePasswordAsBeforeError';
    this.code = 401;
  }
}
export class MissingRequiredDocumentsError extends Error {
  constructor(missingDocuments) {
    super();
    this.message = `Required documents missing: ${missingDocuments}`;
    this.name = 'MissingRequiredDocumentsError';
    this.code = 401;
  }
}
export class CannotChangeAdminRoleError extends Error {
  constructor() {
    super();
    this.message = 'Cannot change the role of an admin';
    this.name = 'CannotChangeAdminRoleError';
    this.code = 401;
  }
}
export class CannotTurnUserIntoAdminError extends Error {
  constructor() {
    super();
    this.message = 'Cannot turn a user into an admin using this method';
    this.name = 'CannotTurnUserIntoAdminError';
    this.code = 401;
  }
}
export class UserAlreadyThisRoleError extends Error {
  constructor(role) {
    super();
    this.message = `User already has this role: ${role}`;
    this.name = 'UserAlreadyThisRoleError';
    this.code = 401;
  }
}
export class UserAlreadyExistsError extends Error {
  constructor(email) {
    super();
    this.message = `Email ${email} already registered`;
    this.name = 'UserAlreadyExistsError';
    this.code = 401;
  }
}
