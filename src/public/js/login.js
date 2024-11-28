const login_form = document.querySelector('#login_form');

login_form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const loginData = {};
  formData.forEach((value, key) => {
    loginData[key] = value;
  });
  axios
    .post(`http://localhost:8080/api/sessions/login`, loginData)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
});
