import { generateMockedProducts } from '../utils/faker.utils.js';

class MocksController {
  getMockedProducts = async (req, res) => {
    try {
      const products = generateMockedProducts();
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default new MocksController();
