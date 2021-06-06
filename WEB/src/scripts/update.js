export async function UpdateShow(configFile) {
  const getCrest = document.getElementById("getCrest");
  const getPlayer = document.getElementById("getPlayer");
  const getGoalKeeper = document.getElementById("getGoalKeeper");
  const getSponsors = document.getElementById("getSponsors");
  const crestBtn = document.querySelector(".crestBtn");
  const playerBtn = document.querySelector(".playerBtn");
  const goalKeeperBtn = document.querySelector(".goalKeeperBtn");
  const sponsorsBtn = document.querySelector(".sponsorsBtn");
  const newPersonContainer = document.querySelector(".newPersonContainer");
  const newPersonBtn = document.querySelector(".newPersonBtn");
  const newStaffCancelBtn = document.querySelector(".newStaffCancelBtn");

  const clearConfig = () => {
    newPersonContainer.innerHTML = "";
  };

  clearConfig();
  loadConfig();

  document.querySelector(".newStaff").classList.remove("noNew");

  newStaffCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".newStaff").classList.add("noNew");
  });

  newPersonBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newPersonrElement = document.createElement("div");
    newPersonrElement.classList.add("newPerson");
    let inputNumber = document.createElement("input");
    inputNumber.type = "text";
    inputNumber.classList.add("playerNumber");
    inputNumber.maxLength = 2;
    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.classList.add("playerName");
    let inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.classList.add("checkGK");
    newPersonrElement.appendChild(inputNumber);
    newPersonrElement.appendChild(inputName);
    newPersonrElement.appendChild(inputCheckbox);
    newPersonContainer.appendChild(newPersonrElement);
  });

  crestBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("getCrest").click();
  });

  playerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("getPlayer").click();
  });

  goalKeeperBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("getGoalKeeper").click();
  });

  sponsorsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("getSponsors").click();
  });

  getCrest.addEventListener("change", (e) => {
    let previewCrest = document.getElementById("previewCrest");
    previewCrest.src = URL.createObjectURL(e.target.files[0]);
    previewCrest.onload = function () {
      URL.revokeObjectURL(previewCrest.src);
    };
  });

  getPlayer.addEventListener("change", (e) => {
    let previewPlayer = document.getElementById("previewPlayer");
    previewPlayer.src = URL.createObjectURL(e.target.files[0]);
    previewPlayer.onload = function () {
      URL.revokeObjectURL(previewPlayer.src);
    };
  });

  getGoalKeeper.addEventListener("change", (e) => {
    let previewGoalKeeper = document.getElementById("previewGoalKeeper");
    previewGoalKeeper.src = URL.createObjectURL(e.target.files[0]);
    previewGoalKeeper.onload = function () {
      URL.revokeObjectURL(previewGoalKeeper.src);
    };
  });

  getSponsors.addEventListener("change", (e) => {
    let previewSponsors = document.getElementById("previewSponsors");
    previewSponsors.src = URL.createObjectURL(e.target.files[0]);
    previewSponsors.onload = function () {
      URL.revokeObjectURL(previewSponsors.src);
    };
  });

  function loadConfig() {
    let previewCrest = document.getElementById("previewCrest");
    previewCrest.src = configFile.Herb ?? "media/herb.png";
    let previewPlayer = document.getElementById("previewPlayer");
    previewPlayer.src = configFile.Tshirt ?? "media/TShirt.png";
    let previewGoalKeeper = document.getElementById("previewGoalKeeper");
    previewGoalKeeper.src = configFile.GoalKeeper ?? "media/gk.png";
    let previewSponsors = document.getElementById("previewSponsors");
    previewSponsors.src = configFile.Sponsors ?? "media/sponsors.png";
    configFile.Persons.forEach((person) => {
      let newPersonElement = document.createElement("div");
      newPersonElement.classList.add("newPerson");
      let inputNumber = document.createElement("input");
      inputNumber.type = "text";
      inputNumber.value = person.Number;
      inputNumber.classList.add("playerNumber");
      inputNumber.maxLength = 2;
      let inputName = document.createElement("input");
      inputName.type = "text";
      inputName.value = person.Name;
      inputName.classList.add("playerName");
      let inputCheckbox = document.createElement("input");
      inputCheckbox.type = "checkbox";
      inputCheckbox.checked = person.Goalkeeper;
      inputCheckbox.classList.add("checkGK");
      newPersonElement.appendChild(inputNumber);
      newPersonElement.appendChild(inputName);
      newPersonElement.appendChild(inputCheckbox);
      newPersonContainer.appendChild(newPersonElement);
    });
  }
}
