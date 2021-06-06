import { RegisterFetch } from "./fetchRegister";

export async function RegisterShow() {
  const registerContainer = document.querySelector(".registerContainer");
  const registerContainerButton = document.querySelector(
    ".registerContainerButton"
  );
  const cancelContainerButton = document.querySelector(
    ".cancelContainerButton"
  );
  const modal = document.querySelector(".modal");
  const email = document.getElementById("email");
  const user = document.getElementById("userName");
  const password = document.getElementById("registerPassword");
  const passwordConfirmed = document.getElementById(
    "registerConfirmedPassword"
  );

  email.value = "";
  user.value = "";
  password.value = "";
  passwordConfirmed.value = "";

  registerContainer.classList.remove("noRegister");

  registerContainerButton.addEventListener("click", (e) => {
    e.preventDefault();
    RegisterFetch(email, user, password, passwordConfirmed);
    registerContainer.classList.add("noRegister");
    modal.classList.remove("blur");
  });

  cancelContainerButton.addEventListener("click", (e) => {
    e.preventDefault();
    registerContainer.classList.add("noRegister");
    modal.classList.remove("blur");
  });
}
