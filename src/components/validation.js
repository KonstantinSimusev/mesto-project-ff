// @todo: Функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

// @todo: Функция очистки ошибок валидации
function clearValidation(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

// @todo: Функция валидации
function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  else
    inputElement.setCustomValidity('');

  if (!inputElement.validity.valid)
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  else
    clearValidation(formElement, inputElement, validationConfig);
}

// @todo: Функция проверки поля на ошибку
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

// @todo: Функция включения и отключения кнопки
function toggleButtonStatte(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

// @todo: Функция слушателя событий полей
function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonStatte(inputList, buttonElement, validationConfig);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonStatte(inputList, buttonElement, validationConfig);
    });
  });
}

// @todo: Функция активации валидации
function enableValidation(validationConfig) {
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
  clearValidation,
}
