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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Wrappers
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addNewCardForm = addCardModal.querySelector(".modal__form");

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-buttton");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addNewCardCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardTitle = document.querySelector(".card__title");
const addNewCardImage = document.querySelector(".card__image");
const previewImage = previewImageModal.querySelector(".preview__card-image");
const previewTitle = previewImageModal.querySelector(".preview__image-title");
const previewCloseButton = previewImageModal.querySelector(".modal__close");

// Form data
const addNewCardTitleInput = addNewCardForm.querySelector(
  ".modal__input_type_title"
);
const addNewCardLink = addNewCardForm.querySelector(".modal__input_type_link");
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);

//Functions
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-active");
  });

  const deleteButton = cardElement.querySelector(".crad__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewTitle.textContent = cardData.name;
    openModal(previewImageModal);
  });

  previewCloseButton.addEventListener("click", () => {
    closePopup(previewImageModal);
  });

  return cardElement;
}

//Event Handlers
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddNewCardSubmit(evt) {
  evt.preventDefault();
  const name = addNewCardTitleInput.value;
  const link = addNewCardLink.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
}

//Event Listeners (Profile edit button)
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardForm.addEventListener("submit", handleAddNewCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//Event Listeners (add new card button)
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addNewCardCloseButton.addEventListener("click", () => closePopup(addCardModal));
