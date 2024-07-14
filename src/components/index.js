import '../pages/index.css';
import {
  getInitialCards,
  getUserInfo,
  patchAvatarInfo,
  patchUserInfo,
  postNewCard,
  putCardLike,
  deleteCardLike,
  deleteCard,
} from './api.js';
import { enableValidation, clearValidation } from './validation.js';
import { createCard } from './card.js';
import { openModal, closeModal, closeModalOptional } from './modal.js';

// @todo: DOM узлы
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const avatarForm = document.querySelector('.form_type_avatar');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar');
const avatarFormInputs = avatarForm.querySelectorAll('.popup__input');

const editButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const avatarEditModal = document.querySelector('.popup_type_avatar');
const editModal = document.querySelector('.popup_type_edit');
const cardAddModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const editForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const editFormInputs = editForm.querySelectorAll('.popup__input');

const cardForm = document.querySelector('.form_type_new-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const cardFormInputs = cardForm.querySelectorAll('.popup__input');

const placesList = document.querySelector('.places__list');

const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

const modals = document.querySelectorAll('.popup');
const saveButtons = document.querySelectorAll('.popup__button');

// @todo: Переменные
let userInfo = {};
let cardsInfo = [];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

// @todo: Функции

// @todo: Функция загрузки рендеринга
function renderLoading(isLoading) {
  if (isLoading) {
    setButtons(saveButtons, 'Сохранение...')
  } else {
    setButtons(saveButtons, 'Сохранить')
  }
};

// @todo: Функция установки кнопки загрузки
function setButtons(buttons, value) {
  buttons.forEach(button => {
    button.textContent = value;
  })
}

// @todo: Функция открытия модального окна карточки
function openFullImage(cardInfo) {
  modalImage.src = cardInfo.link;
  modalImage.alt = 'На фото ' + cardInfo.name;
  modalCaption.textContent = cardInfo.name;

  openModal(imageModal);
}

// @todo: Функция очистки полей формы
function clearInputs(form, inputs) {
  inputs.forEach(input => {
    clearValidation(form, input, validationConfig);
  })
}

// @todo: Функция обработки формы для редактирования аватарки
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  
  patchAvatarInfo(avatarUrlInput.value)
    .then(user => {
      profileImage.src = user.avatar;
      profileImage.alt = 'На фото ' + user.about;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false);
    })

  closeModal(avatarEditModal);
}

// @todo: Функция обработки формы для редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  patchUserInfo(nameInput.value, descriptionInput.value)
    .then(user => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false);
    })

  closeModal(editModal);
}

// @todo: Функция обработки формы для создания новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  postNewCard(cardNameInput.value, urlInput.value)
    .then(cardInfo => {
      const createdCard = createCard(cardInfo, openFullImage, putCardLike, deleteCardLike, deleteCard, userInfo);
      placesList.prepend(createdCard);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false);
    })

  closeModal(cardAddModal);
  cardForm.reset();
}

// @todo: Функция вставки информации в форму для редактирования профиля
function insertTextInEditForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// @todo: Функция вставки информации в форму для аватарки
function insertUrlInAvatarForm() {
  avatarUrlInput.value = profileImage.src;
}

// @todo: Логика кода

// @todo: Загрузить профиль пользователя и карточки
Promise
  .all([getUserInfo(), getInitialCards()])
    .then(promises => {
      userInfo = promises[0];
      cardsInfo = promises[1];

      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      profileImage.src = userInfo.avatar;
      profileImage.alt = 'На фото ' + userInfo.about;

      cardsInfo.forEach(cardInfo => {
        const newCard = createCard(cardInfo, openFullImage, putCardLike, deleteCardLike, deleteCard, userInfo);
        placesList.append(newCard);
      });
    });

// @todo: Включить валидацию форм
enableValidation(validationConfig);

// @todo: Открыть модальное окно
editButton.addEventListener('click', () => {
  insertTextInEditForm();
  clearInputs(editForm, editFormInputs, validationConfig);
  openModal(editModal);
});

cardAddButton.addEventListener('click', () => {
  clearInputs(cardForm, cardFormInputs, validationConfig);
  openModal(cardAddModal);
});

profileImage.addEventListener('click', () => {
  insertUrlInAvatarForm();
  clearInputs(avatarForm, avatarFormInputs, validationConfig);
  openModal(avatarEditModal);
});

// @todo: Закрыть модальное окно (опционально)
modals.forEach(modal => {
  closeModalOptional(modal);
});

// @todo: Обработать форму
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
editForm.addEventListener('submit', handleEditFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
