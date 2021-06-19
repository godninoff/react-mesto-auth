export class UserInfo {
  constructor({userName, userJob, avatar}) {
    this._userName = userName;
    this._userJob = userJob;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
   if(data.name) {this._userName.textContent = data.name};
   if(data.about) {this._userJob.textContent = data.about};
   if(data.avatar) {this._avatar.src = data.avatar};
  }
}