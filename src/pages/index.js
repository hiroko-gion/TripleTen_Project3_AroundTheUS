import "../pages/index.css";

//import all classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  config,
  profileEditButton,
  profileAddButton,
  profileInputList,
  formList,
  formValidators,
} from "../utils/constants";

//Create instances of the classes
//New user info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

//Form validator
formList.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  const formName = formElement.getAttribute("name");
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
previewPopup.setEventListeners();

//New section
const cardsContainer = new Section(
  {
    items: initialCards,
    renderer: function (cardData) {
      const cardElement = renderCard(cardData);
      cardsContainer.addItem(cardElement);
    },
  },
  ".cards__list"
);

// Call render function
cardsContainer.renderItems();

// Create profile edit modal
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit,
  config
);
profileEditPopup.setEventListeners();

//PopupWithFormImage
const profileAddPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddImageFormSubmit,
  config
);
profileAddPopup.setEventListeners();

//Function profile edit submit
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
  profileEditPopup.close();
}

//Function add image submit
function handleAddImageFormSubmit(values) {
  const newCard = {
    name: values.title,
    link: values.url,
  };
  cardsContainer.addItem(newCard);
  profileAddPopup.close();
  profileAddPopup.reset();
}

//Add click event listner to profile edit button
profileEditButton.addEventListener("click", () => {
  const userCurrentInfo = userInfo.getUserInfo();
  profileInputList[0].value = userCurrentInfo.name;
  profileInputList[1].value = userCurrentInfo.description;
  profileEditPopup.open();
});

// ADD A CLICK EVENT LISTENER TO THE PROFILE ADD BUTTON
profileAddButton.addEventListener("click", () => {
  profileAddPopup.open();
});

/*// ADD A CLICK EVENT LISTENER TO THE EDIT PROFILE MODAL
profileEditModal.setEventListeners();

// ADD A CLICK EVENT LISTENER TO THE ADD IMAGE MODAL
profileAddModal.setEventListeners();

// ADD EVENT LISTENERS TO TEHE PREVIEW IMAGE MODAL
previewPopup.setEventListeners();
*/
