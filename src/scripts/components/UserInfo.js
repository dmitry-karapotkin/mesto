export default class UserInfo {
  constructor ({nameSelector, jobSelector, avatarSelector}) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      "profile-name": this._profileName.textContent,
      "profile-title": this._profileJob.textContent
    };
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  getAvatar() {
    return {
      "avatar-url": this._avatar.src
    };
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

}
