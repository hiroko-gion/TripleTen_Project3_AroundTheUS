export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userCurrentInfo = {};
    userCurrentInfo.name = this._nameElement.textContent;
    userCurrentInfo.description = this._descriptionElement.textContent;
    return userCurrentInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.title;
    this._descriptionElement.textContent = data.description;
  }
}
