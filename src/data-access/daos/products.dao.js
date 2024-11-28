import productModel from '../models/product.model.js';
import BasicMongoDAO from './basic.dao.js';

class ProductsMongo extends BasicMongoDAO {
  constructor() {
    super(productModel);
  }
  async getAllwithParams(params, query = {}) {
    return await productModel.paginate(query, params);
  }
}

export default ProductsMongo = new ProductsMongo();
