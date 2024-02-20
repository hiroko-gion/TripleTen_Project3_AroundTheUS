import Card from "../../src/components/Card.js";
import FormValidator from "../../src/components/FormValidator.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

// ||--------------     FORMVALIDATOR CONFIG  ---------------------------------||
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// ||--------------     CARD TEMPLATE ELEMENT   ---------------------------------||
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// ||---------------    SELECT CARD LIST ELEMENT   ------------------------------||
const cardListEl = document.querySelector(".cards__list");

// ||---------------    PROFILE EDIT MODAL ELEMENTS   ---------------------------||
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-form"];
const profileEditButton = document.querySelector("#profile-edit-buttton");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);

// ||---------------    ADD NEW CARD MODAL ELEMENTS    --------------------------||
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardForm = document.forms["add-card-form"];
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardCloseButton = addCardModal.querySelector(".modal__close");
const addNewCardTitle = document.querySelector(".card__title");
const addNewCardImage = document.querySelector(".card__image");
const addNewCardTitleInput = addNewCardForm.querySelector(
  ".modal__input_type_title"
);
const addNewCardLink = addNewCardForm.querySelector(".modal__input_type_link");

// ||---------------    PREVIEW IMAGE MODAL ELEMENTS   -------------------------||
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".preview__card-image");
const previewTitle = previewImageModal.querySelector(".preview__image-title");
const previewCloseButton = previewImageModal.querySelector(".modal__close");

// ||---------------    CLOSE MODAL WITH ESCAPE KEY FUNCTION   -----------------||
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

// ||---------------    CLOSE MODALS PRESSING OUTSIDE OF MODAL FUNCTION   ------||
function closeModalOutside(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// ||---------------    OPEN AND CLOSE MODALS FUNCTION    ----------------------||
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOutside);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOutside);
}

// ||------------      RENDER CARD FUNCTION   ---------------------------------||
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// ||-------------     CREATE CARD FUNCTION    --------------------------------||
function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

// ||--------------    PREVIEW IMAGE MODAL FUNCTION    -----------------------||
function handleImageClick(cardData) {
  previewImage.src = cardData._link;
  previewImage.alt = cardData._name;
  previewTitle.textContent = cardData._name;
  openModal(previewImageModal);
}

// ||--------------    INITIAL CARDS EVENT LISTENER   ------------------------||
initialCards.forEach(renderCard);

// ||--------------     PROFILE EDIT MODAL FUNCTION   ------------------------||
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// ||---------------   ADD NEW CARD MODAL FUNCTION   -------------------------||
function handleAddNewCardSubmit(evt) {
  evt.preventDefault();
  const addCard = {
    name: addNewCardTitleInput.value,
    link: addNewCardLink.value,
  };
  renderCard(addCard);
  evt.target.reset();
  closeModal(addCardModal);
  formValidators["add-card-form"].toggleButtonState();
}

// ||---------------   PROFILE EDIT MODAL EVENT LISTENER   -------------------||
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
  formValidators["profile-form"].resetValidation();
});

// ||--------   ANY MODAL CLOSE BUTTON EVENT LISTENER (UNIVERSAL HANDLER) --------||
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// ||---------------   ADD NEW CARD MODAL EVENT LISTENER   -------------------||
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addNewCardForm.addEventListener("submit", handleAddNewCardSubmit);

// ||--------------     FORMVALIDATION  ---------------------------------||

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
