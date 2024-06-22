import '../pages/index.css';
import { showCards } from './card.js';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import {
  handleEditFormSubmit,
  handleCardFormSubmit,
  insertTextInEditForm,
} from './form.js';

// @todo: DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const editModal = document.querySelector('.popup_type_edit');
const cardAddModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const editModalCloseButton = document.querySelector('.popap__edit-button_close');
const cardAddModalCloseButton = document.querySelector('.popap__add-button_close');
const imageModalCloseButton = document.querySelector('.popap__image-button_close');

const editForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const cardForm = document.querySelector('.form_type_new-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

const placesList = document.querySelector('.places__list');

const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

// @todo: Переменные
const modals = [editModal, cardAddModal, imageModal];

// @todo: Вывести карточки на экран
showCards(initialCards, imageModal, placesList);

// @todo: Открыть модальное окно
openModal(editButton, editModal);
openModal(cardAddButton, cardAddModal);

// @todo: Закрыть модальное окно
closeModal(editModalCloseButton, editModal);
closeModal(cardAddModalCloseButton, cardAddModal);

// @todo: Вставить имя и информации о себе в форму для редактирования
editButton.addEventListener('click', insertTextInEditForm);

// @todo: Обработать форму
editForm.addEventListener('submit', handleEditFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);


export {
  profileTitle,
  profileDescription,
  nameInput,
  descriptionInput,
  modals,
  editModal,
  cardAddModal,
  modalImage,
  modalCaption,
  imageModal,
  imageModalCloseButton,
  cardForm,
  cardNameInput,
  urlInput,
  placesList,
}
