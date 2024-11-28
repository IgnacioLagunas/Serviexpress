import { faker } from '@faker-js/faker';

export const generateMockedProducts = (number = 100) => {
  const products = [];
  for (let i = 0; i < number; i++) {
    products.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      image: faker.image.url(),
      stock: +faker.string.numeric(2),
    });
  }
  return products;
};
