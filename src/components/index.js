import '../pages/index.css';
import { createCard, deleteCard } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const editButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const editModal = document.querySelector('.popup_type_edit');
const cardAddModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const modal = document.querySelector('.popup');

const editModalCloseButton = document.querySelector('.popap__edit-button_close');
const cardAddModalCloseButton = document.querySelector('.popap__add-button_close');
const imageModalCloseButton = document.querySelector('.popap__image-button_close');

const editForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const placesList = document.querySelector('.places__list');

const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

// @todo: Переменные
const modals = [editModal, cardAddModal, imageModal];

// @todo: Вывести карточки на экран
initialCards.forEach((card) => {
  const createdCard = createCard(card, imageModal, deleteCard);
  placesList.append(createdCard);
});

// @todo: Открыть модальное окно
openModal(editButton, editModal);
openModal(cardAddButton, cardAddModal);

// @todo: Закрыть модальное окно
closeModal(editModalCloseButton, editModal);
closeModal(cardAddModalCloseButton, cardAddModal);

// function insertTextInEditForm() {
//   nameInput.value = profileTitle.textContent;
//   descriptionInput.value = profileDescription.textContent;
// }

// function insertTextInProfile() {
//   profileTitle.textContent = nameInput.value;
//   profileDescription.textContent = descriptionInput.value;
// }

// function closePopapWithKey(evt) {
//   if (evt.key.toLowerCase() === closeKey) 
//     closeEditPopap();
// }

// function closePopapWithClick(evt) {
//   if (evt.target === modal) {
//     closeEditPopap();
//   }
// }

// function openEditPopap() {
//   editPopap.classList.add(modalOpenClass);
//   insertTextInEditForm();
//   document.addEventListener('keydown', closePopapWithKey);
//   popap.addEventListener('click', closePopapWithClick);
// }

// function openNewCardPopap() {
//   cardAddPopap.classList.add(modalOpenClass);
// }

// function closeEditPopap() {
//   editPopap.classList.remove(modalOpenClass);
//   document.removeEventListener('keydown', closePopapWithKey);
// }

// function handleEditFormSubmit(evt) {
//   evt.preventDefault();
//   insertTextInProfile();
//   closeEditPopap();
// }


// editButton.addEventListener('click', openModal);
// cardAddButton.addEventListener('click', openModal);
// editModalCloseButton.addEventListener('click', closeModal);
// cardAddModalCloseButton.addEventListener('click', closeModal);

// editForm.addEventListener('submit', handleEditFormSubmit);

export {
  cardTemplate,
  // editButton,
  // cardAddButton,
  // editModal,
  // cardAddModal,
  // imageModal,
  modals,
  modalImage,
  modalCaption,
  // editModalCloseButton,
  // cardAddModalCloseButton,
  imageModalCloseButton,
  // closeKey,
  // modal,
}
