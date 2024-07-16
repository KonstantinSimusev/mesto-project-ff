// @todo: Класс, который открывает модальное окно
const modalOpenClass = 'popup_is-opened';

// @todo: Функция открытия модального окна
const openModal = (modal) => {
  modal.classList.add(modalOpenClass);
  document.addEventListener('keydown', closeModalWithKey);
}

// @todo: Функция закрытия модального окна 
const closeModal = (modal) => {
  modal.classList.remove(modalOpenClass);
  document.removeEventListener('keydown', closeModalWithKey);
}

// @todo: Функция закрытия модального окна нажатием на Esc
const closeModalWithKey = (evt) => {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}

// @todo: Функция установки слушателя закрытия модального окна
const addCloseModalOptionalListener = (modal) => {
  modal.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close') || 
      evt.target.classList.contains('popup'))
      closeModal(modal);
  });
}

export {
  openModal,
  closeModal,
  addCloseModalOptionalListener
}
