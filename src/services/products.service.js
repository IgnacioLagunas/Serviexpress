import ProductsDao from '../data-access/daos/products.dao.js';
import { EntitiyNotFoundError, MissingDataError } from '../errors/errors.js';
import { UserNotAuthorizedError } from '../errors/user.errors.js';
import { logger } from '../utils/logger.utils.js';
import { sendProductDeletionEmail } from '../utils/mailer.utils.js';

class ProductsService {
  constructor(ProductsDao) {
    this.productsDao = ProductsDao;
  }

  async getAll() {
    return await this.productsDao.getAll();
  }

  async getAllwithParams(params) {
    const { limit = 10, sort = null, page = 1, query = {} } = params;
    const result = await this.productsDao.getAllwithParams(
      {
        limit,
        page,
        sort: sort ? { price: sort } : null,
      },
      typeof query === 'string' ? JSON.parse(query) : query
    );
    return result;
  }

  async createOne(obj) {
    const result = await this.productsDao.createOne(obj);
    return result;
  }

  async updateOne(id, newObj) {
    const product = await this.findOne(id);
    if (!product) throw new EntitiyNotFoundError('Product');
    const newProduct = { ...product._doc, ...newObj };
    logger.http('Product updated: ', { newProduct });
    return await this.productsDao.updateOne({ _id: id }, newProduct);
  }

  async deleteOne(id, user) {
    const product = await this.findOne(id);

    if (user.role === 'admin') {
      await this.productsDao.deleteOne({ _id: id });
      return product;
    }
    if (user.role === 'premium' && user.email === product.owner) {
      await this.productsDao.deleteOne({ _id: id });
      sendProductDeletionEmail(user, product);
      return product;
    }
    throw new UserNotAuthorizedError();
  }

  async findOne(id) {
    if (!id) throw new EntitiyNotFoundError('Id');
    const result = await this.productsDao.findOneById(id);
    return result;
  }
}

export default ProductsService = new ProductsService(ProductsDao);
