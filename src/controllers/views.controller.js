import { MissingDataError } from '../errors/errors.js';
import ServiciosService from '../services/servicios.service.js';

class ViewsController {
  renderViewHome = (req, res) => {
    console.log('llega en renderViewHome', req.user);
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

  renderViewServicio = async (req, res) => {
    const { servicioId } = req.params;
    console.log(servicioId);
    const servicio = await ServiciosService.findOne(servicioId);
    res.render('servicio', servicio);
  };

  renderViewCart = (req, res) => {
    res.render('cart');
  };
  // renderViewPurchase = (req, res) => {
  //   const { body } = req;

  //   res.render('purchase_detail', body);
  // };

  renderViewLogin = (req, res) => {
    console.log('llega en renderViewLogin', req.user);
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
  renderViewReservas = (req, res) => {
    res.render('reservas', req.user);
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
