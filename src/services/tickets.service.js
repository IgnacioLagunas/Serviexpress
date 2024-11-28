import TicketDao from '../data-access/daos/ticket.dao.js';

class TicketsService {
  constructor(ticketDao) {
    this.ticketDao = ticketDao;
  }

  createOne = async (productList, user) => {
    const totalPrice = this.getCartPrice(productList);
    const purchaser = user.email;
    return await this.ticketDao.createOne({
      amount: totalPrice,
      purchaser,
    });
  };

  getCartPrice = (productList) => {
    let totalPrice = 0;
    productList.forEach(({ product: { price }, quantity }) => {
      totalPrice += price * quantity;
    });
    return totalPrice;
  };
}

export default new TicketsService(TicketDao);
