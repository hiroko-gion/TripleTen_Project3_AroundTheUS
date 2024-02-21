import Popup from "../../src/components/Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelectoor });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values);
    });
    super.setEventListeners();
  }
}

//index.js

const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
newCardPopup.open();

newCardPopup.close();
