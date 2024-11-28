import mongoose, { Schema } from 'mongoose';

const cartsSchema = new Schema({
  products: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      _id: false,
    },
  ],
});
export default mongoose.model('Carts', cartsSchema);
