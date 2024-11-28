import CartsService from '../services/carts.service.js';

class CartsController {
  constructor(CartsService) {
    this.cartsService = CartsService;
  }
  getCart = async (req, res) => {
    const { cartId } = req.params;
    try {
      const cart = await this.cartsService.findOne(cartId);
      return res.status(200).json({
        message: 'Cart found',
        cart,
      });
    } catch (error) {
      return res.status(error.code || 500).json({ message: error.message });
    }
  };

  createCart = async (req, res) => {
    try {
      const result = await this.cartsService.createOne();
      res.status(200).json({
        message: 'Cart created',
        cart: result,
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  updateCart = async (req, res) => {
    const { cartId, productId } = req.params;
    const { qtty = 1 } = req.query;
    try {
      await this.cartsService.addOrRemoveFromCart(cartId, productId, qtty);
      res.status(200).json({
        message: 'Product added to cart',
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  deleteCart = async (req, res) => {
    const { cartId } = req.params;
    try {
      const result = await this.cartsService.clearCart(cartId);
      res.status(200).json({
        message: 'Cart cleared.',
        cart: result,
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  deleteProductFromCart = async (req, res) => {
    const { cartId, productId } = req.params;
    try {
      await this.cartsService.deleteProductFromCart(cartId, productId);
      res.status(200).json({
        message: 'Product deleted from cart',
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  purchaseCart = async (req, res) => {
    try {
      const {
        params: { cid },
        user,
      } = req;
      const response = await this.cartsService.purchaseCart(cid, user);
      res.status(200).json({
        message: 'Purchase successfull',
        response,
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };
}

export default new CartsController(CartsService);
