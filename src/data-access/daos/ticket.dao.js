import ticketModel from '../models/ticket.model.js';
import BasicMongoDAO from './basic.dao.js';

class TicketsMongo extends BasicMongoDAO {
  constructor() {
    super(ticketModel);
  }
}

export default TicketsMongo = new TicketsMongo();
