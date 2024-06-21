import { modals } from './index.js'

// @todo: Переменные
const modalOpenClass = 'popup_is-opened';
const closeKey = 'escape';

// @todo: Функция открытия модального окна
function openModal(button, modal) {
  button.addEventListener('click', () => {
    addClass(modal);
    document.addEventListener('keydown', closeModalWithKey);
    modal.addEventListener('click', closeModalWithClick)
  });
};

// @todo: Функция закрытия модального окна 
function closeModal(button, modal) {
  button.addEventListener('click', () => {
    removeClass(modal);
    document.removeEventListener('keydown', closeModalWithKey);
    modal.removeEventListener('click', closeModalWithClick)
  });
};

// @todo: Функция закрытия модального окна нажатием на Esc
function closeModalWithKey(evt) {
  modals.forEach(modal => {
    if (evt.key.toLowerCase() === closeKey)
      removeClass(modal);
  });   
}

// @todo: Функция закрытия модального окна кликом на оверлей
function closeModalWithClick(evt) {
  modals.forEach(modal => {
    if (evt.target === modal)
      removeClass(modal);
  });   
}

// @todo: Функция добавления класса
function addClass(element) {
  element.classList.add(modalOpenClass);
}

// @todo: Функция удаления класса
function removeClass(element) {
  element.classList.remove(modalOpenClass);
}

export { openModal, closeModal }