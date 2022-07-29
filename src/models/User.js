export class User {
  userGuid;
  email;
  username;
  iat;
  exp;

  get userGuid() {
    return this.userGuid;
  }

  constructor(user) {
    if (user) {
      this.userGuid = user.UserGuid;
      this.email = user.email;
      this.username = user.Username;
      this.iat = user.iat;
      this.exp = user.exp;
    } else {
      this.userGuid = "";
      this.email = "";
      this.username = "";
      this.lastName = "";
      this.iat = 0;
      this.exp = 0;
    }
  }
}
