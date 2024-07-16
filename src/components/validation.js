// @todo: Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

// @todo: Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

// @todo: Функция очистки ошибок валидации
const clearValidation = (formElement, validationConfig) => {
  const inputElements = formElement.querySelectorAll(validationConfig.inputSelector);
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  inputElements.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationConfig);
    toggleButtonStatte(inputElement, buttonElement, validationConfig);
  })
}

// @todo: Функция валидации
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  else
    inputElement.setCustomValidity('');

  if (!inputElement.validity.valid)
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  else
    clearValidation(formElement, validationConfig);
}

// @todo: Функция проверки поля на ошибку
const hasInvalidInput = (inputElement) => {
  return !inputElement.validity.valid;
}

// @todo: Функция включения и отключения кнопки
const toggleButtonStatte = (inputElement, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputElement)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// @todo: Функция слушателя событий полей
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
    });
  });
}

// @todo: Функция активации валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  })
}

export {
  enableValidation,
  clearValidation
}
