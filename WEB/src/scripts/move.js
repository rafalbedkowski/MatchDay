import "../sass/style.scss";
import { Container } from "./container";
import { Mouse } from "./mouse";
import { Token } from "./token";
import { Message } from "./message";
import { LoadUpdateForm } from "./updateForm";
import { Update } from "./fetchUpdate";
import { LoginShow } from "./login";
import { UpdateShow } from "./update";
import { ConfigFileFetch } from "./fetchConfigFile";

window.onload = function () {
  let offset = [0, 0];
  let playersList;
  let isDown = false;
  let activePlayer;
  let timer;
  let touchduration = 2000;
  let configFile;
  let tshirt;
  let goalKeeper;
  let crest;
  let sponsors;
  let payloadToken;
  let teamName;

  const headContainer = new Container(document.querySelector(".container"));
  const playersContainer = new Container(document.querySelector(".players"));
  const reserveContainer = new Container(document.querySelector(".reserve"));
  const staffMatchContainer = new Container(
    document.querySelector(".staffMatch")
  );
  const pitchContainer = new Container(document.querySelector(".pitch"));

  const getBtn = document.querySelector(".getPictureBtn");
  const loginBtn = document.querySelector(".loginBtn");
  const editBtn = document.querySelector(".editBtn");
  const logoutBtn = document.querySelector(".logoutBtn");
  const updateTeam = document.querySelector(".newStaffSaveBtn");

  getBtn.addEventListener("click", GetPicture);
  loginBtn.addEventListener("click", LoginShow);
  editBtn.addEventListener("click", () => UpdateShow(configFile));
  logoutBtn.addEventListener("click", Logout);

  const token = new Token("token");
  const message = new Message(headContainer);
  const mouse = new Mouse();

  payloadToken = token.payloadToken ?? null;

  if (payloadToken != null) {
    loginBtn.classList.add("noDisplay");
    editBtn.classList.remove("noDisplay");
    logoutBtn.classList.remove("noDisplay");
  }

  GetConfigFile();

  updateTeam.addEventListener("click", (e) => {
    // e.preventDefault();
    let form = LoadUpdateForm();
    let status = Update(form, payloadToken.nameid);
    if (status) GetConfigFile();
    document.querySelector(".newStaff").classList.add("noNew");
  });

  window.addEventListener("resize", () => {
    let oldPlayerPosition =
      pitchContainer.container.querySelectorAll(".playerIn");

    oldPlayerPosition.forEach((player) => {
      player.style.top = `${
        player.offsetTop / (tmpPitch.bottom / pitchContainerPosition.bottom)
      }px`;
      player.style.left = `${
        player.offsetLeft / (tmpPitch.right / pitchContainerPosition.right)
      }px`;
    });
  });

  function AddPlayersEvent() {
    playersList = document.querySelectorAll(".playerOut");
    playersList.forEach((player) => {
      player.addEventListener(
        "mousedown",
        (e) => {
          e.preventDefault();
          MouseDown(e, player);
        },
        true
      );
    });

    playersList.forEach((player) => {
      player.addEventListener(
        "touchstart",
        (e) => MouseDown(e.targetTouches[0], player),
        true
      );
    });

    headContainer.container.addEventListener("mouseup", MouseUp, true);
    headContainer.container.addEventListener("touchend", MouseUp, true);
    headContainer.container.addEventListener(
      "mousemove",
      (e) => MouseMove(e),
      true
    );
    headContainer.container.addEventListener(
      "touchmove",
      (e) => MouseMove(e.targetTouches[0]),
      true
    );
  }

  function LimitPlayer() {
    if (mouse.x - activePlayer.clientWidth / 2 <= headContainer.left) {
      activePlayer.style.left = 0;
    }

    if (mouse.y - activePlayer.clientHeight / 2 <= headContainer.top) {
      activePlayer.style.top = 0;
    }

    if (mouse.y + activePlayer.clientHeight / 2 >= headContainer.bottom) {
      activePlayer.style.top = `${
        headContainer.bottom - activePlayer.clientHeight - 60
      }px`;
    }

    if (mouse.x + activePlayer.clientWidth / 2 >= headContainer.right) {
      activePlayer.style.left = `${
        headContainer.right -
        activePlayer.parentElement.offsetLeft -
        activePlayer.clientWidth
      }px`;
    }
  }

  function AddToContainer() {
    if (
      (mouse.x > pitchContainer.left) &
      (mouse.x < pitchContainer.right) &
      (mouse.y > pitchContainer.top) &
      (mouse.y < pitchContainer.bottom)
    ) {
      activePlayer.classList.remove(...activePlayer.classList);
      activePlayer.classList.add("playerIn");
      pitchContainer.container.appendChild(activePlayer);
      activePlayer.style.width = "";
      activePlayer.style.left = `${mouse.x - activePlayer.clientWidth / 2}px`;
      activePlayer.style.top = `${mouse.y - activePlayer.clientHeight}px`;
    }

    if (
      (mouse.x > playersContainer.left) &
      (mouse.x < playersContainer.right) &
      (mouse.y > playersContainer.top) &
      (mouse.y < playersContainer.bottom)
    ) {
      activePlayer.classList.remove(...activePlayer.classList);
      activePlayer.classList.add("playerOut");
      playersContainer.container.appendChild(activePlayer);

      if (pitchContainer.top == playersContainer.top)
        activePlayer.style.width = `${
          playersContainer.right - playersContainer.left - 15
        }px`;
      else
        activePlayer.style.width = `${
          (playersContainer.right - playersContainer.left - 15) / 2
        }px`;

      activePlayer.style.top = `${
        mouse.y - playersContainer.top - activePlayer.clientHeight / 2
      }px`;
      activePlayer.style.left = `${
        mouse.x - playersContainer.left - activePlayer.clientWidth / 2
      }px`;
    }

    if (
      (mouse.x > reserveContainer.left) &
      (mouse.x < reserveContainer.right) &
      (mouse.y > reserveContainer.top) &
      (mouse.y < reserveContainer.bottom)
    ) {
      activePlayer.classList.remove(...activePlayer.classList);
      activePlayer.classList.add("reservePlayer");
      reserveContainer.container.appendChild(activePlayer);
      activePlayer.style.width = `${
        reserveContainer.right - reserveContainer.left - 15
      }px`;
      activePlayer.style.top = `${
        mouse.y - reserveContainer.top - activePlayer.clientHeight * 2
      }px`;
      activePlayer.style.left = `${
        mouse.x - reserveContainer.left - activePlayer.clientWidth / 2
      }px`;
    }

    if (
      (mouse.x > staffMatchContainer.left) &
      (mouse.x < staffMatchContainer.right) &
      (mouse.y > staffMatchContainer.top) &
      (mouse.y < staffMatchContainer.bottom)
    ) {
      activePlayer.classList.remove(...activePlayer.classList);
      activePlayer.classList.add("staffMatchTeam");
      staffMatchContainer.container.appendChild(activePlayer);
      activePlayer.style.width = `${
        staffMatchContainer.right - staffMatchContainer.left - 15
      }px`;
      activePlayer.style.top = `${
        mouse.y - staffMatchContainer.top - activePlayer.clientHeight * 2
      }px`;
      activePlayer.style.left = `${
        mouse.x - staffMatchContainer.left - activePlayer.clientWidth / 2
      }px`;
    }
  }

  function GetActivePlayer(e, player) {
    activePlayer = player;
    activePlayer.style.position = "absolute";
    activePlayer.style.left = `${e.clientX + offset[0]}px`;
    activePlayer.style.top = `${e.clientY + offset[1]}px`;
    activePlayer.style.zIndex = 100;
  }

  function SetActivePlayer() {
    activePlayer.style.position = "relative";
    activePlayer.style.left = 0;
    activePlayer.style.top = 0;
    activePlayer.style.width = "95%";
    if (
      activePlayer.parentElement.classList.contains("players") &
      (pitchContainer.top != playersContainer.top)
    )
      activePlayer.style.width = "48%";
  }

  function MouseDown(e, player) {
    if (e.which == 3) {
      player.addEventListener("contextmenu", (e) => e.preventDefault());
      SetCapitan(player);
    } else {
      if (!timer) {
        timer = setTimeout((player) => {
          LongTouch(player);
        }, touchduration);
      }
      mouse.mouseSet(e);
      isDown = true;
      offset = [player.offsetLeft - e.clientX, player.offsetTop - e.clientY];
      GetActivePlayer(e, player);
    }
  }

  function MouseUp() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (pitchContainer.container.querySelectorAll(".playerIn").length > 11)
      message.Show("Uwaga ! Gramy po 11 zawodników.");
    else {
      isDown = false;
      if (activePlayer != null) {
        if (!activePlayer.parentElement.classList.contains("pitch")) {
          SetActivePlayer();
        }
      }
    }
  }

  function MouseMove(e) {
    if (isDown) {
      mouse.mouseSet(e);
      activePlayer.style.left = `${mouse.x + offset[0]}px`;
      activePlayer.style.top = `${mouse.y + offset[1]}px`;
      AddToContainer();
      LimitPlayer();
    }
  }

  function SetCapitan(player) {
    let players = document.querySelectorAll("." + player.classList[0]);
    players.forEach((p) => {
      if (p.querySelector(".capitan") != null)
        p.querySelector(".capitan").classList.remove("capitan");
      player.querySelector(".name").classList.add("capitan");
    });
  }

  function LongTouch() {
    timer = null;
    SetCapitan(activePlayer);
  }

  async function GetConfigFile() {
    if (payloadToken == undefined) {
      message.Show("DEMO ! Musisz się zalogować.");
    }
    document.querySelector(".crest").innerHTML = "";
    document.querySelector(".sponsors").innerHTML = "";
    let file = await ConfigFileFetch(
      payloadToken != null ? payloadToken.nameid : ""
    );
    configFile = JSON.parse(file);
    teamName = configFile.TeamName ?? "Demo Team";
    tshirt = configFile.Tshirt ?? "media/tshirt.png";
    goalKeeper = configFile.GoalKeeper ?? "media/gk.png";
    crest = configFile.Herb ?? "media/herb.png";
    sponsors = configFile.Sponsors ?? "media/sponsors.png";
    LoadData();
    LoadPlayers();
    AddPlayersEvent();
  }

  function LoadData() {
    teamName = configFile.TeamName ?? "Demo Team";
    tshirt = configFile.Tshirt ?? "media/Tshirt.png";
    goalKeeper = configFile.GoalKeeper ?? "media/gk.png";
    crest = configFile.Herb ?? "media/herb.png";
    sponsors = configFile.Sponsors ?? "media/sponsors.png";

    if (crest != null) {
      let crestElement = document.createElement("img");
      crestElement.src = configFile.Herb ?? "media/herb.png";
      crestElement.alt = "Herb klubowy";
      let crestParent = document.querySelector(".crest");
      crestParent.appendChild(crestElement);
    }

    if (sponsors != null) {
      let sponsorsElement = document.createElement("img");
      sponsorsElement.src = configFile.Sponsors ?? "media/sponsors.png";
      sponsorsElement.alt = "Logo sponsorów";
      let sponsorsParent = document.querySelector(".sponsors");
      sponsorsParent.appendChild(sponsorsElement);
    }
  }

  function LoadPlayers() {
    playersContainer.container.innerHTML = "";
    configFile.Persons.forEach((p) => {
      let div = document.createElement("div");
      div.classList.add("playerOut");
      div.innerHTML = `<img src=${
        p.Goalkeeper ? goalKeeper : tshirt
      } alt="T-Shirt"/><span class="number">${
        p.Number ?? " "
      }</span><span class="name">${p.Name}</span>`;
      playersContainer.container.appendChild(div);
      playersContainer.AddToContainer(p);
    });
  }

  function preview_image(event) {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("output_image");
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function GetPicture() {
    html2canvas(pitchContainer.container).then(function (canvas) {
      let link = document.createElement("a");
      document.body.appendChild(link);
      link.download =
        new Date().toLocaleString().replace(", ", "_").replaceAll(":", ".") +
        ".png";
      link.href = canvas.toDataURL("image/png");
      link.target = "_blank";
      link.click();
    });
  }

  function Logout() {
    token.RemoveToken("token");
    loginBtn.classList.remove("noDisplay");
    editBtn.classList.add("noDisplay");
    logoutBtn.classList.add("noDisplay");
    window.location.reload(true);
  }
};
