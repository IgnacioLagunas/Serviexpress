const productsContainer = document.getElementById('cart-products-container');
const comprarButton = document.getElementById('comprar-button');
const messageContainer = document.getElementById('message-container');

const getCart = async () => {
  productsContainer.innerHTML = '';
  const {
    data: {
      user: {
        cart: { _id: cartId },
      },
    },
  } = await axios.get(`http://localhost:8080/api/sessions/current`);
  if (cartId) {
    const {
      data: {
        cart: { products },
      },
    } = await axios.get(`http://localhost:8080/api/carts/${cartId}`);
    let totalPrice = 0;
    if (products.length == 0) {
      productsContainer.innerHTML = '<h2>Your cart is empty 😶 </h2>';
      comprarButton.disabled = true;
    } else {
      products.forEach(({ product, quantity }) => {
        productsContainer.innerHTML += createProductDiv(product, quantity);
        totalPrice += Math.trunc(product.price * quantity);
      });
      productsContainer.innerHTML += `<h3>Total Price: $${totalPrice}</h3>`;
      comprarButton.disabled = false;
    }
    addEventToBtns();
  }
};

const createProductDiv = (product, quantity) => {
  return `<li class="product">
              <img src="${product.image}" alt="">
              <h5 id="nombre">${product.title}</h5>
              <p>Total price: $${Math.trunc(product.price * quantity)}</p>
              <p>Quantity: ${quantity}</p>
              <button class="minusOneToCart" data-id="${product._id}">-</button>
              <button class="plusOneToCart" data-id="${product._id}">+</button>
              <button class="removeFromCart" data-id="${
                product._id
              }">Delete</button>
            </li>`;
};

const addEventToBtns = () => {
  const addToCartBtns = document.querySelectorAll('.plusOneToCart');
  const removeOneFromCartBtns = document.querySelectorAll('.minusOneToCart');
  const removeFromCartBtn = document.querySelectorAll('.removeFromCart');
  addToCartBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      addOrRemoveFromCart(target.getAttribute('data-id'), 1);
    };
  });
  removeOneFromCartBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      addOrRemoveFromCart(target.getAttribute('data-id'), -1);
    };
  });
  removeFromCartBtn.forEach((btn) => {
    btn.onclick = ({ target }) => {
      deleteWholeProductFromCart(target.getAttribute('data-id'));
    };
  });
  comprarButton.onclick = () => {
    purchaseCart();
  };
};

const addOrRemoveFromCart = async (productId, qtty = 1) => {
  const {
    data: {
      user: {
        cart: { _id: cartId },
      },
    },
  } = await axios.get(`http://localhost:8080/api/sessions/current`);
  await axios.put(
    `http://localhost:8080/api/carts/${cartId}/product/${productId}?qtty=${qtty}`
  );
  getCart();
};

const deleteWholeProductFromCart = async (productId) => {
  const {
    data: {
      user: {
        cart: { _id: cartId },
      },
    },
  } = await axios.get(`http://localhost:8080/api/sessions/current`);
  await axios.delete(
    `http://localhost:8080/api/carts/${cartId}/product/${productId}`
  );
  getCart();
};

const purchaseCart = async () => {
  const {
    data: {
      user: {
        cart: { _id: cartId },
      },
    },
  } = await axios.get(`http://localhost:8080/api/sessions/current`);
  try {
    const {
      data: { response },
    } = await axios.post(`http://localhost:8080/api/carts/${cartId}/purchase`);
    console.log(response);
    if (response.ticket != null) {
      messageContainer.innerHTML = `<h3>Gracias por tu compra!</h3>`;
      renderTicket(response);
    } else {
      messageContainer.innerHTML = `<h3>Los productos elegidos no se encuentran en stock</h3>`;
    }
  } catch (error) {
    messageContainer.innerHTML = `<h3>Ha ocurrido un error con su compra</h3>`;
  }
  getCart();
};

const renderTicket = (response) => {
  const ticketContainer = document.getElementById('ticket-container');
  const { ticket, products_detail } = response;
  ticketContainer.innerHTML = `
  <br>
    <h3>Ticket number: ${ticket.code}</h3>
    <h3>Products:</h3>
    <ul>
    ${products_detail
      .map(
        ({ product, quantity }) =>
          `<li><h5> ${quantity}  x  ${product.title} - $${product.price}</h5></li>`
      )
      .join('')}
    </ul>
    <h3>Total: $${ticket.amount}</h3>`;
};

getCart();
