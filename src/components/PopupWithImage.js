import Popup from "../../src/components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".preview__card-image"
    );
    this._previewImageTitle = this._popupElement.querySelector(
      ".preview__image-title"
    );
  }
  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewImageTitle.textContent = name;
    super.open();
  }

  setEventListener() {
    super.setEventListener();
  }
}
