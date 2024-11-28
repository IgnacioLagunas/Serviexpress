import swaggerJSDoc from 'swagger-jsdoc';
import { __dirname } from '../utils/utils.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API Documentation',
      version: '1.0.0',
      description: 'Ecommerce API Documentation',
    },
  },
  apis: [`${__dirname}/docs/*.yaml`],
};

export const swaggerSetup = swaggerJSDoc(swaggerOptions);
