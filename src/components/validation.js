// @todo: Функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}

// @todo: Функция очистки ошибок валидации
function clearValidation(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

// @todo: Функция валидации
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid)
    showInputError(formElement, inputElement, inputElement.validationMessage);
  else
    clearValidation(formElement, inputElement);
}

// @todo: Функция слушателя событий полей
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
    })
  });
}

// @todo: Функция активации валидации
function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  })
}

export {
  enableValidation,
  clearValidation,
}
