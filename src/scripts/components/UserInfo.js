export default class UserInfo {
  constructor ({nameSelector, jobSelector}) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
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

}
