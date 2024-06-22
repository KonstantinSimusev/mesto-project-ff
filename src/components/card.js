import { openModal, closeModal } from "./modal.js";
import {
  modalImage,
  modalCaption,
  imageModalCloseButton,
} from "./index.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(cardInfo, modal, deleteCard, addLike) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');

  cardImage.src = cardInfo.link;
  cardImage.alt = 'На фото ' + cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  openModal(cardImage, modal);
  closeModal(imageModalCloseButton, modal);
  addLike(cardLikeButton);

  cardImage.addEventListener('click', () => {
    modalImage.src = cardInfo.link;
    modalImage.alt = 'На фото ' + cardInfo.name;
    modalCaption.textContent = cardInfo.name;
  });

  deleteButton.addEventListener('click', () => {
    deleteCard(card);
  });

  return card;
}

// @todo: Функция добавления лайка
function addLike(button) {
  button.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
  });
}

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
}

// @todo: Функция вывода карточек на экран
function showCards(cards, modal, list) {
  cards.forEach(card => {
    const createdCard = createCard(card, modal, deleteCard, addLike);
    list.append(createdCard);
  });
}

export {
  createCard,
  addLike,
  deleteCard,
  showCards,
}