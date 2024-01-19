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
  inputEl.classList.remove(inputErrorClass);
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

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

//disableButton
function disableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

//enableButton
function enableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, { inactiveButtonClass });
    return;
  }
  enableButton(submitButton, { inactiveButtonClass });
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options; //this is same as "const inputSelector = options.inputSelector;"
  const inputElements = [...formEl.querySelectorAll(inputSelector)]; //1. look for all inputs inside of forms
  const submitButton = formEl.querySelector(submitButtonSelector);
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

//  ||----------------------------------- ENABLE VALIDATION ----------------------------------------------||

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
