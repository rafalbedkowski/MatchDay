import { Message } from "./message";

export async function ConfigFileFetch(userId) {
  const HOST = "/matchDay/getconfig/";
  const message = new Message();
  const settings = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(`${HOST}${userId ?? ""}`, settings);
    if (fetchResponse.status == 200) {
      const data = await fetchResponse.json();
      message.Show("Dane pobrane.");
      return data;
    } else {
      message.Show("Błąd pliku konfiguracyjnego.");
      return false;
    }
  } catch (e) {
    message.Show(e);
    return false;
  }
}
