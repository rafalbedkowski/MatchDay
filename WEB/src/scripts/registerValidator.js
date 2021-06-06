const userName = document.getElementById("userName");
const email = document.getElementById("email");
const registerPassword = document.getElementById("registerPassword");
const registerConfirmedPassword = document.getElementById(
  "registerConfirmedPassword"
);

userName.addEventListener("blur", () => {
  validateUserName();
});

email.addEventListener("blur", () => {
  validateEmail();
});

registerPassword.addEventListener("blur", () => {
  validatePassword();
});

registerConfirmedPassword.addEventListener("blur", () => {
  validateConfirm();
});

let validateUserName = () => {
  if (userName.value.length < 3)
    registerError.innerHTML = "Username minimum 3 znaki.";
  else registerError.innerHTML = "";
};

let validateEmail = () => {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!pattern.test(email.value))
    registerError.innerHTML = "Nieprawidłowy email.";
  else registerError.innerHTML = "";
};

let validatePassword = () => {
  let test1 = /[A-Z]+/;
  let test2 = /[a-z]+/;
  let test3 = /[0-9]+/;
  let test4 = /[\!\?\*\.]+/;

  if (registerPassword.value.length < 8)
    registerError.innerHTML = "Hasło minimum 8 znaków.";
  else if (registerPassword.value.length > 16)
    registerError.innerHTML = "Hasło maksymalnie 16 znaków.";
  else if (!test1.test(registerPassword.value))
    registerError.innerHTML =
      "Hasło musi zawierać conajmnie jeden wielki znak.";
  else if (!test2.test(registerPassword.value))
    registerError.innerHTML =
      "Hasło musi zawierać conajmnie jeden wielki znak.";
  else if (!test3.test(registerPassword.value))
    registerError.innerHTML = "Hasło musi zawierać conajmnie jedną cyfrę.";
  else if (!test4.test(registerPassword.value))
    registerError.innerHTML =
      "Hasło musi zawierać conajmnie jeden znak specjalny (!? *.).";
  else registerError.innerHTML = "";
};

let validateConfirm = () => {
  if (registerPassword.value !== registerConfirmedPassword.value)
    registerError.innerHTML = "Hasłą muszą być takie same.";
  else registerError.innerHTML = "";
};
