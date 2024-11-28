import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    default: shortid.generate,
  },
  purchase_dateTime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
  },
});
export default mongoose.model('Tickets', ticketSchema);
