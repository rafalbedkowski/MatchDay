import { LoginFetch } from "./fetchLogin";
import { Token } from "./token";
import { RegisterShow } from "./register";

export async function LoginShow() {
  const loginButton = document.querySelector(".loginButton");
  const cancelButton = document.querySelector(".cancelButton");
  const registerButton = document.querySelector(".registerButton");
  const loginContainer = document.querySelector(".loginContainer");
  const user = document.getElementById("loginName");
  const password = document.getElementById("password");
  const modal = document.querySelector(".modal");
  const loginBtn = document.querySelector(".loginBtn");
  const editBtn = document.querySelector(".editBtn");
  const logoutBtn = document.querySelector(".logoutBtn");
  const token = new Token();

  loginContainer.classList.remove("noLogin");
  user.value = "";
  password.value = "";

  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let data = await LoginFetch(user.value, password.value);
    if (data != false) {
      token.SetToken("token", data);
      loginContainer.classList.add("noLogin");
      modal.classList.remove("blur");
      loginBtn.classList.add("noDisplay");
      editBtn.classList.remove("noDisplay");
      logoutBtn.classList.remove("noDisplay");
      window.location.reload(true);
    }
  });

  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.classList.add("noLogin");
    modal.classList.remove("blur");
  });

  registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.classList.add("noLogin");
    RegisterShow();
  });
  return false;
}
