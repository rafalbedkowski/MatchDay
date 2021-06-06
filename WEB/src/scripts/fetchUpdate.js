import { Message } from "./message";

export async function Update(form, id) {
  const HOST = "/matchDay/update/";
  const message = new Message();
  const settings = {
    method: "POST",
    body: form,
  };
  try {
    const fetchResponse = await fetch(`${HOST}${id}`, settings);

    if (fetchResponse.status == 200) {
      message.Show(`Dane zaktualizowane.`);
      return true;
    } else {
      if (data.ErrorMessage != undefined) message.Show(data.ErrorMessage);
      message.Show(`Dane nie zostały zaktualizowane.`);
      return false;
    }
  } catch (e) {
    message.Show(e);
    return false;
  }
}
