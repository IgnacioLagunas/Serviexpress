const productsContainer = document.querySelector('#products-container');
const prevPageBtn = document.querySelector('#prev-page-btn');
const nextPageBtn = document.querySelector('#next-page-btn');
const pageNumberSpan = document.querySelector('#page-number-span');
const signOutButton = document.querySelector('#sign-out-btn');

const getProducts = async (route) => {
  productsContainer.innerHTML = '';
  const response = await fetch(route);
  const {
    products: { docs: products, nextLink, prevLink, page },
  } = await response.json();
  console.log(products);
  products.forEach((product) => {
    productsContainer.innerHTML += createProductDiv(product);
  });
  addEventToCartBtns();
  addEventToDetailsBtns();
  addEventToPageBtn(prevPageBtn, prevLink);
  addEventToPageBtn(nextPageBtn, nextLink);
  addEventToSignOutButton();
  pageNumberSpan.innerHTML = page;
};

const createProductDiv = (product) => {
  return `<li class="product" >
            <img src="${product.image}" alt="">
            <h5 id="nombre">${product.title}</h5>
            <button class="addToCartBtn" data-id="${product._id}">Add to cart</button>
            <button class="viewDetailsButton" data-id="${product._id}">View details</button>
          </li>`;
};

const addEventToPageBtn = (button, link) => {
  if (!link) button.disabled = true;
  else {
    button.disabled = false;
    button.onclick = () => {
      getProducts(link);
    };
  }
};
const addEventToSignOutButton = () => {
  function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  signOutButton.onclick = () => {
    deleteCookie('token');
    window.location.href = '/login';
  };
};
const addEventToCartBtns = () => {
  const addToCartBtns = document.querySelectorAll('.addToCartBtn');
  addToCartBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      addToCart(target.getAttribute('data-id'));
    };
  });
};
const addEventToDetailsBtns = () => {
  const goToDetailsBtns = document.querySelectorAll('.viewDetailsButton');
  goToDetailsBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      const productId = target.getAttribute('data-id');
      window.location.href = `http://localhost:8080/product/${productId}`;
    };
  });
};

const addToCart = async (productId) => {
  const {
    data: {
      user: {
        cart: { _id: cartId },
      },
    },
  } = await axios.get(`http://localhost:8080/api/sessions/current`);
  await axios.put(
    `http://localhost:8080/api/carts/${cartId}/product/${productId}`
  );
};

const sendToProductView = (a) => {
  console.log(a);
};

getProducts('http://localhost:8080/api/products?limit=8');
