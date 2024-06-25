// @todo: Переменные
const modalOpenClass = 'popup_is-opened';
const closeKey = 'Escape';

// @todo: Функция открытия модального окна
function openModal(element) {
  element.classList.add(modalOpenClass);
  document.addEventListener('keydown', closeModalWithKey);
}

// @todo: Функция закрытия модального окна 
function closeModal(element) {
  element.classList.remove(modalOpenClass);
  document.removeEventListener('keydown', closeModalWithKey);
}

// @todo: Функция закрытия модального окна (кнопка 'Крестик', клик по оверлею)
function closeModalOptional(modal) {
  modal.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close') || 
      evt.target.classList.contains('popup'))
      closeModal(modal);
  });
}

// @todo: Функция закрытия модального окна нажатием на Esc
function closeModalWithKey(evt) {
  if (evt.key === closeKey) {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}

export {
  openModal,
  closeModal,
  closeModalOptional,
}
