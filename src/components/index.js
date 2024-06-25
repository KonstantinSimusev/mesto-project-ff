import '../pages/index.css';
import { createCard, toggleLike, deleteCard } from './card.js';
import { initialCards } from './cards.js';
import {
  openModal,
  closeModal,
  closeModalOptional,
} from './modal.js';

// @todo: DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const editModal = document.querySelector('.popup_type_edit');
const cardAddModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const editForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const cardForm = document.querySelector('.form_type_new-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

const placesList = document.querySelector('.places__list');

const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

const modals = document.querySelectorAll('.popup');

// @todo: Вывести карточки на экран
initialCards.forEach(card => {
  const newCard = createCard(card, toggleLike, openFullImage, deleteCard);
  placesList.append(newCard);
});

// @todo: Открыть модальное окно карточки
function openFullImage(cardInfo) {
  modalImage.src = cardInfo.link;
  modalImage.alt = 'На фото ' + cardInfo.name;
  modalCaption.textContent = cardInfo.name;
  openModal(imageModal);
}

// @todo: Открыть модальное окно
editButton.addEventListener('click', () => {
  insertTextInEditForm();
  openModal(editModal);
});

cardAddButton.addEventListener('click', () => {
  openModal(cardAddModal);
});

// @todo: Закрыть модальное окно (опционально)
modals.forEach(modal => {
  closeModalOptional(modal);
});

// @todo: Функция обработки формы для редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  insertTextInProfile();
  closeModal(editModal);
}

// @todo: Функция обработки формы для создания новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const card = {};
  card.name = cardNameInput.value;
  card.link = urlInput.value;

  const createdCard = createCard(card, toggleLike, openFullImage, deleteCard);
  placesList.prepend(createdCard);

  closeModal(cardAddModal);
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

// @todo: Обработать форму
editForm.addEventListener('submit', handleEditFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
