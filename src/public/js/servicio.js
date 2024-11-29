const resevarBtn = document.querySelector('.reservarBtn');

resevarBtn.onclick = ({ target }) => {
  reservar(target.getAttribute('data-id'));
};

const reservar = async (servicio_id) => {
  try {
    const userResp = await fetch('http://localhost:8080/api/sessions/current');
    const { user } = await userResp.json();
    console.log(servicio_id, user);
    await axios.post(
      `http://localhost:8080/api/reservas/${user.id}/${servicio_id}`,
      {
        fecha_hora: null,
      }
    );
    alert('Reserva realizada con exito!');
  } catch (error) {
    alert(error.response.data.message);
  }
};
