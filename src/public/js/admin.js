let currentUser = null;
const userContainer = document.getElementById('user-container');

document
  .getElementById('userForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    const email = document.getElementById('email').value;
    getUser(email);
  });

const getUser = async (email) => {
  try {
    const {
      data: { user },
    } = await axios.get(`http://localhost:8080/api/users/${email}`);
    currentUser = user;
    console.log('user', user);
    console.log('currentUser', currentUser);
    renderUser(user);
  } catch (error) {
    console.log(error);
    userContainer.innerHTML = `<h3>User not found :(</h3>`;
  }
};

const renderUser = (user) => {
  userContainer.innerHTML = `
      <h2>User information:</h2>
      <ul>
        <li><h5>ID: ${user.id}</h5></li>
        <li><h5>Name: ${user.name}</h5></li>
        <li><h5>Email: ${user.email}</h5></li>
        <li><h5>Role: ${user.role}</h5></li>
      </ul>
      <label for="roles"><h4> Select new role:</h4></label>
      <select id="selectRoles">
        <option value="user">User</option>
        <option value="premium">Premium</option>
        <option value="admin">Admin</option>
      </select>     
      <button id="changeRole"" >Change Role </button>
      <h5 color="red" id="roleChangeMessage"></h5>
      <br>
      <br>
      <h4> Delete User:</h4>
      <button class="deleteUser" data-id="${user.id}">  Delete  </button>;
      <h5 color="red" id="deleteUserMessage"></h5>`;
  addButtonActions();
};

const addButtonActions = () => {
  addChangeRoleActions();
  addDeleteUserActions();
};

const addChangeRoleActions = async () => {
  const selectRole = document.getElementById('selectRoles');
  const changeRoleButton = document.getElementById('changeRole');
  changeRoleButton.addEventListener('click', (event) => {
    event.preventDefault();
    changeUsersRole(selectRole.value);
  });
};

const changeUsersRole = async (role) => {
  const roleChangeMessage = document.getElementById('roleChangeMessage');
  try {
    const response = await axios.put(
      `http://localhost:8080/api/users/${role}/${currentUser.id}`
    );
    console.log('response', response);
    roleChangeMessage.innerHTML =
      'Role changed successfully to' + ' ' + role + '!';
    getUser(currentUser.email);
  } catch (error) {
    console.log(error);
    roleChangeMessage.innerHTML =
      error.response.data.message + '!' || 'An error occurred';
  }
};

const addDeleteUserActions = async () => {
  const deleteUserButton = document.querySelector('.deleteUser');
  deleteUserButton.addEventListener('click', (event) => {
    event.preventDefault();
    deleteUser();
  });
};

const deleteUser = async () => {
  const deleteUserMessage = document.getElementById('deleteUserMessage');
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/users/${currentUser.id}`
    );
    console.log('response', response);
    deleteUserMessage.innerHTML = 'User deleted successfully!';
  } catch (error) {
    console.log(error);
    deleteUserMessage.innerHTML =
      error.response.data.message + '!' || 'An error occurred';
  }
};
