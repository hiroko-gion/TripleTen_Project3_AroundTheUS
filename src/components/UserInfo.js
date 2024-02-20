export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameElement.textContent;
    userInfo.description = this._descriptionElement.textContent;
    return userInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.title;
    this._descriptionElement.textContent = data.description;
  }
}
