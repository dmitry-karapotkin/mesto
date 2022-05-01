export default class UserInfo {
  constructor (nameSelector, jobSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  getUserInfo(popupProfile) {
    popupProfile._firstInput.value = this._profileName.textContent;
    popupProfile._secondInput.value = this._profileJob.textContent;
  }

  setUserInfo({ firstInput, secondInput }) {
    this._profileName.textContent = firstInput;
    this._profileJob.textContent = secondInput;
  }

}
