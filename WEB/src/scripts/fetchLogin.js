import { Message } from "./message";

export async function LoginFetch(user, password) {
  const HOST = "http://userlogin.webmorezo.eu/api/Account/login";
  const message = new Message();
  let sendData = JSON.stringify({
    userNameOrEmail: user,
    password: password,
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
    const token = await fetchResponse.json();
    if (fetchResponse.status == 200) {
      return token;
    } else {
      for (const error in token.errors) {
        message.Show(`${token.errors[error]}`);
      }
      if (token.ErrorMessage != undefined) message.Show(token.ErrorMessage);
      return false;
    }
  } catch (e) {
    message.Show(e);
    return false;
  }
}
