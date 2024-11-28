import ProductsService from '../services/products.service.js';

class ProductsController {
  getAllProducts = async (req, res) => {
    let { limit, page, sort, query } = req.query;
    if (!['asc', 'desc'].includes(sort)) sort = null;
    try {
      const products = await ProductsService.getAllwithParams({
        limit,
        page,
        sort,
        query,
      });
      res.status(200).json({
        message: 'Products: ',
        products: {
          ...products,
          nextLink: products.hasNextPage
            ? `http://localhost:8080/api/products?limit=${limit}&sort=${sort}&page=${products.nextPage}`
            : null,
          prevLink: products.hasPrevPage
            ? `http://localhost:8080/api/products?limit=${limit}&sort=${sort}&page=${products.prevPage}`
            : null,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductsService.findOne(id);
      res.status(200).json({ message: 'Product found', product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createNewProduct = async (req, res) => {
    try {
      const owner = req.user.role === 'premium' ? req.user.email : 'admin';
      const createdProduct = await ProductsService.createOne({
        ...req.body,
        owner,
      });
      res.status(200).json({ message: 'Product created', createdProduct });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;
      const updatedProduct = await ProductsService.updateOne(id, update);
      res.status(200).json({ message: 'Product updated', updatedProduct });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const {
        params: { id },
        user,
      } = req;
      const productDeleted = await ProductsService.deleteOne(id, user);
      res.status(200).json({ message: 'Product deleted', productDeleted });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new ProductsController();
