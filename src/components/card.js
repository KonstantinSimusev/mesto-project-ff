import { openModal, closeModal } from "./modal.js";
import {
  cardTemplate,
  modalImage,
  modalCaption,
  imageModalCloseButton,
  // closeKey,
  // imageModal,
} from "./index.js";

// @todo: Функция создания карточки
function createCard(cardInfo, modal, deleteCard) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = cardInfo.link;
  cardImage.alt = 'На фото ' + cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  openModal(cardImage, modal);
  closeModal(imageModalCloseButton, modal);

  cardImage.addEventListener('click', () => {

    modalImage.src = cardInfo.link;
    modalImage.alt = 'На фото ' + cardInfo.name;
    modalCaption.textContent = cardInfo.name;

    // document.addEventListener('keydown', closeImageModalWithKey);
  });

  // imageModalCloseButton.addEventListener('click', () => {
  //   removeClass(modal);
  //   document.removeEventListener('keydown', closeImageModalWithKey);
  // });

  deleteButton.addEventListener('click', () => {
    deleteCard(card);
  });

  return card;
}

// function closeImageModalWithKey(evt) {
//   if (evt.key.toLowerCase() === closeKey) {
//     removeClass(imageModal);
//   }
// }

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
}

export { createCard, deleteCard }