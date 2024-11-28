import cartModel from '../models/cart.model.js';
import BasicMongoDAO from './basic.dao.js';

class CartsMongo extends BasicMongoDAO {
  constructor() {
    super(cartModel);
  }

  async findOneById(id) {
    return await cartModel.findById(id).populate('products.product');
  }
  async saveCart(cart) {
    return cart.save();
  }
  // async deleteProduct(id) {
  //   const result = await cartModel.deleteOne({ _id: id });
  //   return result;
  // }
}

export default CartsMongo = new CartsMongo();
