import '../pages/index.css';
import { createCard, deleteCard } from './card/card.js';
import { initialCards } from './cards/cards.js';

// Переменные
const popapOpenClass = 'popup_is-opened';
const closeKey = 'escape';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popap = document.querySelector('.popup');

const editButton = document.querySelector('.profile__edit-button');
const editPopap = document.querySelector('.popup_type_edit');
const editCloseButton = document.querySelector('.edit-button_close');

const editForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopap = document.querySelector('.popup_type_new-card');
const cardAddCloseButton = document.querySelector('.add-button_close');

const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на экран
initialCards.forEach((card) => {
  const createdCard = createCard(card, deleteCard);
  placesList.append(createdCard);
});




function insertTextInEditForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function insertTextInProfile() {
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

function closePopapWithKey(evt) {
  if (evt.key.toLowerCase() === closeKey) 
    closeEditPopap();
}

function closePopapWithClick(evt) {
  if (evt.target === popap) {
    closeEditPopap();
  }
}

function openEditPopap() {
  editPopap.classList.add(popapOpenClass);
  insertTextInEditForm();
  document.addEventListener('keydown', closePopapWithKey);
  popap.addEventListener('click', closePopapWithClick);
}

function openNewCardPopap() {
  cardAddPopap.classList.add(popapOpenClass);
}

function closeEditPopap() {
  editPopap.classList.remove(popapOpenClass);
  document.removeEventListener('keydown', closePopapWithKey);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  insertTextInProfile();
  closeEditPopap();
}



editButton.addEventListener('click', openEditPopap)
editCloseButton.addEventListener('click', closeEditPopap);
editForm.addEventListener('submit', handleEditFormSubmit);

cardAddButton.addEventListener('click', openNewCardPopap);



export {
  cardTemplate
}
