export class Token {
  constructor(tokenName) {
    this.token = this.GetToken(tokenName);
    this.payloadToken = this.ParseToken(this.token);
  }

  GetToken(tokenName) {
    this.token = localStorage.getItem(tokenName);
    return localStorage.getItem(tokenName);
  }

  ParseToken(token) {
    if (token != null) return JSON.parse(atob(token.split(".")[1]));
  }

  SetToken(tokenName, token) {
    localStorage.setItem(tokenName, token);
    this.token = token;
    this.payloadToken = this.ParseToken(this.token);
  }

  RemoveToken(token) {
    localStorage.removeItem(token);
    this.token = null;
    this.payloadToken = null;
  }
}
