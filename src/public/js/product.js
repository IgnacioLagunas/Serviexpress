const addToCartBtn = document.querySelector('.addToCartBtn');
addToCartBtn.onclick = ({ target }) => {
  addToCart(target.getAttribute('data-id'));
};

const addToCart = async (productId) => {
  const {
    data: {
      user: {
        cart: { _id: cartId },
      },
    },
  } = await axios.get(`http://localhost:8080/api/sessions/current`);
  console.log(cartId);
  await axios.put(
    `http://localhost:8080/api/carts/${cartId}/product/${productId}`
  );
};
