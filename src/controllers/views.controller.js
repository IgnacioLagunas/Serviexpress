import { MissingDataError } from '../errors/errors.js';
import ProductsService from '../services/products.service.js';

class ViewsController {
  renderViewHome = (req, res) => {
    res.render('home', req.user);
  };

  renderViewProfile = (req, res) => {
    let { user } = req;
    user = {
      ...user.toObject(),
      isAdmin: user.role === 'admin',
    };
    res.render('profile', user);
  };

  renderViewAdmin = (req, res) => {
    res.render('admin', req.user);
  };

  renderViewProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await ProductsService.findOne(productId);
    res.render('product', product);
  };

  renderViewCart = (req, res) => {
    res.render('cart');
  };
  // renderViewPurchase = (req, res) => {
  //   const { body } = req;

  //   res.render('purchase_detail', body);
  // };

  renderViewLogin = (req, res) => {
    if (req.user) return res.redirect('/home');
    // const message = req.session.messages
    //   ? req.session.messages[req.session.messages.length - 1]
    //   : '';
    // res.render('login', {
    //   // message,
    // });
    res.render('login');
  };

  renderViewSignup = (req, res) => {
    if (req.user) return res.redirect('/home');
    res.render('signup');
  };

  renderViewForgotPassword = (req, res) => {
    res.render('forgot-password');
  };

  renderViewChangePassword = (req, res) => {
    try {
      if (!req.user) return res.redirect('/login');
      const { id, token } = req.params;
      if (!id || !token) throw new MissingDataError();
      res.render('change-password', { email: req.user.email, id, token });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };
}

export default new ViewsController();
