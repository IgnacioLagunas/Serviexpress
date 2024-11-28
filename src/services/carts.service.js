import CartsDao from '../data-access/daos/carts.dao.js';
import { CartPurchaseResponse } from '../data-access/dtos/cartDTOs.js';
import { CartNotFoundError, CartIsEmptyError } from '../errors/cart.errors.js';
import { EntitiyNotFoundError } from '../errors/errors.js';
import { logger } from '../utils/logger.utils.js';
import ProductsService from './products.service.js';
import TicketsService from './tickets.service.js';
import mongoose from 'mongoose';

class CartsService {
  constructor(cartsDao) {
    this.cartsDao = cartsDao;
  }
  async findAll() {
    return await this.cartsDao.getAll();
  }

  async createOne() {
    const newCart = { products: [] };
    return await this.cartsDao.createOne(newCart);
  }

  async findOne(id) {
    const cart = await this.cartsDao.findOneById(id);
    if (!cart) throw new CartNotFoundError();
    return cart;
  }

  async addOrRemoveFromCart(cartId, productId, qtty = 1) {
    const cart = await this.findOne(cartId);
    if (!cart) throw new EntitiyNotFoundError('Cart');
    logger.http('Cart found: ', cart);
    const productIdMongo = new mongoose.Types.ObjectId(productId);
    const prodIndex = cart.products.findIndex((p) =>
      p.product._id.equals(productIdMongo)
    );
    if (prodIndex === -1) cart.products.push({ product: productId });
    else {
      cart.products[prodIndex].quantity += +qtty;
      if (cart.products[prodIndex].quantity == 0)
        cart.products.splice(prodIndex, 1);
    }
    return this.cartsDao.saveCart(cart);
    // return await this.cartsDao.updateOne(cartId, cart);
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await this.findOne(cartId);
    const productIdMongo = new mongoose.Types.ObjectId(productId);
    const prodIndex = cart.products.findIndex((p) =>
      p.product._id.equals(productIdMongo)
    );
    logger.http('product deleted  ', cart.products[prodIndex].product.title);
    if (prodIndex != -1) cart.products.splice(prodIndex, 1);
    return await this.cartsDao.saveCart(cart);
  }

  async clearCart(cartId) {
    const cart = await this.findOne(cartId);
    cart.products = [];
    return this.cartsDao.saveCart(cart);
  }

  async purchaseCart(cart_Id, user) {
    const current_cart = await this.findOne(cart_Id);
    if (current_cart.products.length == 0) {
      throw new CartIsEmptyError();
    }
    const productsInStock = [];
    const productsOutOfStock = [];
    current_cart.products.forEach(async (cartProduct) => {
      const { product, quantity: qtty } = cartProduct;
      if (product.stock >= qtty) {
        productsInStock.push(cartProduct);
      } else {
        productsOutOfStock.push({ title: product.title, _id: product._id });
      }
    });
    if (productsInStock.length == 0) {
      return new CartPurchaseResponse(
        [],
        null,
        productsOutOfStock,
        'Products out of stock'
      );
    }
    logger.debug(productsInStock);
    const ticket = await TicketsService.createOne(productsInStock, user);
    await this.clearAfterPurchase(cart_Id, productsInStock);
    return new CartPurchaseResponse(
      productsInStock,
      ticket,
      productsOutOfStock
    );
  }

  async clearAfterPurchase(cart_Id, products) {
    for (const { product, quantity: qtty } of products) {
      await ProductsService.updateOne(product._id, {
        stock: product.stock - qtty,
      });
      await this.deleteProductFromCart(cart_Id, product._id);
    }
  }
}

export default CartsService = new CartsService(CartsDao);
