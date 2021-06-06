export function LoadUpdateForm() {
  const form = new FormData();

  form.append("crest", document.getElementById("getCrest").files[0]);
  form.append("player", document.getElementById("getPlayer").files[0]);
  form.append("goalkeeper", document.getElementById("getGoalKeeper").files[0]);
  form.append("sponsors", document.getElementById("getSponsors").files[0]);

  let tablica = [];
  let persons = document.querySelectorAll(".newPerson");
  persons.forEach((person) => {
    tablica.push({
      number: person.childNodes[0].value,
      name: person.childNodes[1].value,
      goalkeeper: person.childNodes[2].checked,
    });
  });

  form.append("persons", JSON.stringify(tablica));

  return form;
}
