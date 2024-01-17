// What we need to do here
// 1. look for all inputs inside of forms
// 2. loop through all the inputs to see if all are valid
// 3. if input is not valid,
//    a. get validation message
//    b. add error class to the input (this make it red)
//    c. display error message
//    d. disable button
// 4. if all inputs are valid,
//    a. enable button
//    b. reset error message

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`); //
  inputEl.classList.add(inputErrorClass); //b. add error class to the input (this make it red)
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`); //
  inputEl.classList.remove(inputErrorClass); //b. add error class to the input (this make it red)
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options; //this is same as "const inputSelector = options.inputSelector;"
  const inputElements = [...formEl.querySelectorAll(inputSelector)]; //1. look for all inputs inside of forms
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
    });
  });
}

//  ||----------------------------------- ENABLE VALIDATION ----------------------------------------------||
// 1ST STEP
// * This code logs "NodeList" on cosole, it's not an array, we want to this to be array

//function enableValidation(options) {
//const formEls = document.querySelectorAll(".modal__form");
//console.log(formEls);
//}

// 2ND STEP
// * This code can create an array using "Array.from" method, it's stored in different data structure than NodeList.
// * The data structure in an array gives more options to manupulate.

//function enableValidation(options) {
//const formEls = Array.from(document.querySelectorAll(".modal__form"));
//console.log(formEls);
//}

// 3RD STEP (Proper way)
// * Using [] and spread operater "..." can work same as "Array.from" method. It's more modern way to do.
// * For preventDefault(), we have this in "index.js" but it's a bit cleaner here
//   because we're assuring every time use this for each one of these forms, we are going to validate that we don't let it refresh the page.

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
