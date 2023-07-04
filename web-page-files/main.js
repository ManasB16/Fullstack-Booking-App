const form = document.querySelector("#my-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
let userid = 1;

form.addEventListener("submit", onsubmit);

function onsubmit(e) {
  e.preventDefault();

  let obj = {
    name: name.value,
    email: email.value,
    phone: phone.value,
  };

  axios
    .post("http://localhost:4000/user/add-user", obj)
    .then((res) => {
      showNewUserOnScreen(res.data.newUser);
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4000/user/get-users")
    .then((res) => {
      for (var i = 0; i < res.data.allUsers.length; i++) {
        showNewUserOnScreen(res.data.allUsers[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showNewUserOnScreen(user) {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  if (localStorage.getItem(user.email) !== null) {
    removeUserFromScreen(user.email);
  }

  const parentNode = document.getElementById("users");
  const childElement = `<li id=${user.id}> ${user.name} - ${user.email}
                        <button onclick=deleteUser('${user.id}')> Delete </button>
                        <button onclick="editUserDetails('${user.id}','${user.name}','${user.email}','${user.phone}')"> Edit </button>
                        </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childElement;
}

function editUserDetails(userID, name, emailID, phone) {
  userid = userID;
  document.getElementById("name").value = name;
  document.getElementById("email").value = emailID;
  document.getElementById("phone").value = phone;

  axios
    .delete(`http://localhost:4000/user/delete-user/${userID}`)
    .then((res) => {
      removeUserFromScreen(userID);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteUser(userID) {
  axios
    .delete(`http://localhost:4000/user/delete-user/${userID}`)
    .then((res) => {
      removeUserFromScreen(userID);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeUserFromScreen(userID) {
  const parentNode = document.getElementById("users");
  const childnodetobeDeleted = document.getElementById(userID);
  if (childnodetobeDeleted) {
    parentNode.removeChild(childnodetobeDeleted);
  }
}
