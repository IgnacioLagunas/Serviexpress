export class CartPurchaseResponse {
  constructor(products, ticket, productsOutOfStock, message) {
    this.products_detail = products;
    this.ticket = ticket;
    this.products_out_of_stock = productsOutOfStock;
    this.message = message ? message : 'Purchase successfull';
  }
}
