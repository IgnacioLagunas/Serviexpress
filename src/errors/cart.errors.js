export class CartNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Cart not found';
    this.name = 'CartNotFoundError';
    this.code = 404;
  }
}

export class CartIsEmptyError extends Error {
  constructor() {
    super();
    this.message =
      'You need to have at least one product in your cart to perform this action';
    this.name = 'CartIsEmptyError';
    this.code = 400;
  }
}
