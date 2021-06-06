import { Message } from "./message";

export async function RegisterFetch(email, user, password, passwordConfirmed) {
  const HOST = `http://userlogin.webmorezo.eu/api/Account/register`;
  const message = new Message();
  let sendData = JSON.stringify({
    Email: email,
    UserName: user,
    Password: password,
    ConfirmPassword: passwordConfirmed,
  });

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: sendData,
  };
  try {
    const fetchResponse = await fetch(HOST, settings);

    if (fetchResponse.status == 200) {
      message.Show("Sprawdź swoją pocztę i kliknij link.");
      return true;
    } else {
      const data = await fetchResponse.json();
      for (const error in data.errors) {
        message.Show(`${data.errors[error]}`);
      }
      if (data.ErrorMessage != undefined) message.Show(data.ErrorMessage);
      return false;
    }
  } catch (e) {
    message.Show(e);
    return false;
  }
}
