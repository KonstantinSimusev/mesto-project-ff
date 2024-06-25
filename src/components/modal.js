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

// @todo: Функция закрытия модального окна кнопкой 'Крестик'
function closeModalWithCrossButton(modal) {
  modal.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close'))
      closeModal(modal);
  });
}

// @todo: Функция закрытия модального окна кликом на оверлей
function closeModalWithOverlayClick(modal) {
  modal.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget)
      closeModal(modal);
  });
}

// @todo: Функция закрытия модального окна нажатием на Esc
function closeModalWithKey(evt) {
  if (evt.key === closeKey)
    closeModal(modal);
}

export {
  openModal,
  closeModal,
  closeModalWithOverlayClick,
  closeModalWithCrossButton,
  closeModalWithKey,
}
