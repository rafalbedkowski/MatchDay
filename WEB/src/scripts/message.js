export class Message {
  constructor() {
    this.container = document.querySelector(".container");
  }

  Show(message, time = 4000) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message");
    messageBox.innerHTML = `<p>${message}</p>`;
    this.container.appendChild(messageBox);
    setTimeout(() => {
      this.container.removeChild(messageBox);
    }, time);
  }
}
