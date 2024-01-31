export default class Card {
  // ||---CARD CONSTRUCTOR---||
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // ||---SET UP EVENT LISTERNERS---||
  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButtton();
    });
  }

  _handleLikeButtton() {
    this._likeButton.classList.toggle("card__like-button-active");
  }

  _handleDeleteButtton() {
    this._element.remove();
    this._element = null;
  }

  // ||----GET TEMPLATE----||
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // ||---GENERATE CARD---- ||
  generateCard() {
    this._element = this._getTemplate();
    this._cardImageEl = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
