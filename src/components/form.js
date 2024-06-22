import { createCard, addLike, deleteCard } from './card.js'
import { removeClass } from './modal.js';
import {
  profileTitle,
  profileDescription,
  nameInput,
  descriptionInput,
  editModal,
  cardAddModal,
  cardForm,
  cardNameInput,
  urlInput,
  imageModal,
  placesList,
} from './index.js';

// @todo: Функция обработки формы для редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  insertTextInProfile();
  removeClass(editModal);
}

// @todo: Функция обработки формы для создания новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const card = {};
  card.name = cardNameInput.value;
  card.link = urlInput.value;

  const createdCard = createCard(card, imageModal, deleteCard, addLike);
  placesList.prepend(createdCard);

  removeClass(cardAddModal);
  cardForm.reset();
}

// @todo: Функция вставки информации в форму для редактирования профиля
function insertTextInEditForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// @todo: Функция вставки информации в профиль контента
function insertTextInProfile() {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

export {
  handleEditFormSubmit,
  handleCardFormSubmit,
  insertTextInEditForm,
}