import "../pages/index.css";

//import all classes
import Card from "../../src/components/Card.js";
import FormValidator from "../../src/components/FormValidator.js";
import Section from "../../src/components/Section.js";
import PopupWithForm from "../../src/components/PopupWithForm.js";
import PopupWithImage from "../../src/components/PopupWithImage.js";
import UserInfo from "../../src/components/UserInfo.js";

import {
  initialCards,
  config,
  profileEditButton,
  profileAddButton,
  profileInputList,
  formList,
  formValidators,
} from "../../src/utils/constants";

//Create instances of the classes
//New user info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

//Form validator
formList.forEach((form) => {
  const validator = new FormValidator(form, config);
  const formName = form.getAttribute("name");
  validator.enableValidation();
  formValidators[formName] = validator;
});

//Render card function
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

//Preview image
function handleImageClick(name, link) {
  previewPopup.open({ name, link });
}

const previewPopup = new PopupWithImage("#preview-image-modal");

//New section
const cardsContainer = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

// Call render function
cardsContainer.renderItems();

// Create profile edit modal
const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit,
  config
);

//PopupWithFormImage
const profileAddModal = new PopupWithForm(
  "#add-card-modal",
  handleAddImageFormSubmit,
  config
);

//Function profile edit submit
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
  profileEditModal.close();
}

//Add image submit
function handleAddImageFormSubmit(values) {
  const newCard = renderCard(values);
  cardsContainer.addItem(newCard);
  formValidators.addCardForm.resetForm();
  formValidators.addCardForm.disableSubmit();
  profileAddModal.close();
}

//Add click event listner to profile edit button
profileEditButton.addEventListener("click", () => {
  const userCurrentInfo = userInfo.getUserInfo();
  profileInputList[0].value = userCurrentInfo.name;
  profileInputList[1].value = userCurrentInfo.description;
  profileEditModal.open();
});

// ADD A CLICK EVENT LISTENER TO THE PROFILE ADD BUTTON
profileAddButton.addEventListener("click", () => {
  profileAddModal.open();
});

// ADD A CLICK EVENT LISTENER TO THE EDIT PROFILE MODAL
profileEditModal.setEventListeners();

// ADD A CLICK EVENT LISTENER TO THE ADD IMAGE MODAL
profileAddModal.setEventListeners();

// ADD EVENT LISTENERS TO TEHE PREVIEW IMAGE MODAL
previewPopup.setEventListeners();
