export class Container {
  constructor(container) {
    this.container = container;
    this.top = container.offsetTop;
    this.bottom = container.offsetTop + container.clientHeight;
    this.left = container.offsetLeft;
    this.right = container.offsetLeft + container.clientWidth;
    this.playerList = [];
  }

  AddToContainer(player) {
    this.playerList.push(player);
  }

  RemoveFromContainer(player) {
    if (this.playerList.length > 0) {
      let index = this.playerList.indexOf(player);
      this.playerList.splice(index, 1);
    }
  }
}
