export class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  mouseSet = (e) => {
    this.x = e.clientX;
    this.y = e.clientY;
  };
}
