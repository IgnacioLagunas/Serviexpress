const serviciosContainer = document.querySelector('#products-container');
const signOutButton = document.querySelector('#sign-out-btn');

const getProducts = async (route) => {
  serviciosContainer.innerHTML = '';
  const response = await fetch(route);
  const { servicios } = await response.json();
  console.log(servicios);
  servicios.forEach((servicio) => {
    serviciosContainer.innerHTML += createProductDiv(servicio);
  });

  addEventToDetailsBtns();
  addEventToSignOutButton();
};

const createProductDiv = (servicio) => {
  console.log(servicio.id);
  return `<li class="product" >
            <img src="${servicio.img}" alt="">
            <h5 id="nombre">${servicio.descripcion}</h5>
            <button class="viewDetailsButton" data-id="${servicio.id}">Reserva</button>
          </li>`;
};

const addEventToSignOutButton = () => {
  console.log('click');
  function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  signOutButton.onclick = () => {
    deleteCookie('token');
    window.location.href = '/login';
  };
};

const addEventToDetailsBtns = () => {
  const goToDetailsBtns = document.querySelectorAll('.viewDetailsButton');
  goToDetailsBtns.forEach((btn) => {
    btn.onclick = ({ target }) => {
      const servicioId = target.getAttribute('data-id');
      console.log(servicioId);
      window.location.href = `http://localhost:8080/servicio/${servicioId}`;
    };
  });
};

getProducts('http://localhost:8080/api/servicios');
