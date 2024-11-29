const reservasContainer = document.querySelector('.tabla-reservas');

const getReservas = async (route) => {
  reservasContainer.innerHTML = '';
  const userResp = await fetch('http://localhost:8080/api/sessions/current');
  const { user } = await userResp.json();
  console.log('current user', user);
  route = user.rol == 'Administrador' ? route : `${route}/usuario/${user.id}`;
  const response = await fetch(route);
  const { reservas } = await response.json();
  console.log(reservas);
  const isAdmin = user.rol == 'Administrador';
  reservas.forEach((reserva) => {
    reservasContainer.innerHTML += createTableRow(reserva, isAdmin);
  });
  if (isAdmin) {
    addEventToDeleteBtns();
  }

  // addEventToSignOutButton();
};

const createTableRow = (reserva, isAdmin) => {
  const { servicio, usuario } = reserva;
  console.log(servicio, usuario);
  return ` <tr>
                <th scope="row">${servicio.descripcion}</th>
                <td>${reserva.fecha_hora}</td>
                <td>${usuario.email}</td>
                <td>${reserva.estado}</td>
                ${
                  isAdmin
                    ? `<td><button class="delete-btn" data-id="${reserva.id}">Eliminar</button></td>`
                    : ''
                }
            </tr>`;
};

// const addEventToSignOutButton = () => {
//   function deleteCookie(cookieName) {
//     document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//   }
//   signOutButton.onclick = () => {
//     deleteCookie('token');
//     window.location.href = '/login';
//   };
// };

const addEventToDeleteBtns = () => {
  const deleteButons = document.querySelectorAll('.delete-btn');
  deleteButons.forEach((btn) => {
    btn.onclick = ({ target }) => {
      const reservaId = target.getAttribute('data-id');
      console.log(reservaId);
      deleteReserva(reservaId);
    };
  });
};

const deleteReserva = async (reservaId) => {
  try {
    await fetch(`http://localhost:8080/api/reservas/${reservaId}`, {
      method: 'DELETE',
    });
    getReservas('http://localhost:8080/api/reservas');
    alert('Reserva eliminada con exito!');
  } catch (error) {
    console.log(error);
  }
};

getReservas('http://localhost:8080/api/reservas');
