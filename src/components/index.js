import '../pages/index.css';
import {
  doRequestGetInitialCards,
  doRequestGetUserInfo,
  doRequestPatchAvatarInfo,
  doRequestPatchUserInfo,
  doRequestPostNewCard,
  doRequestPutCardLike,
  doRequestDeleteCardLike,
  doRequestDeleteCard
} from './api.js';
import { enableValidation, clearValidation } from './validation.js';
import { createCard } from './card.js';
import { openModal, closeModal, addCloseModalOptionalListener } from './modal.js';

// @todo: DOM узлы
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const avatarForm = document.querySelector('.form_type_avatar');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar');

const editButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const avatarEditModal = document.querySelector('.popup_type_avatar');
const editModal = document.querySelector('.popup_type_edit');
const cardAddModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const deleteModal = document.querySelector('.popup_type_delete');

const editForm = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const deleteForm = document.querySelector('.form_type_delete');

const cardForm = document.querySelector('.form_type_new-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

const placesList = document.querySelector('.places__list');

const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

const modals = document.querySelectorAll('.popup');

// @todo: Информация о пользователе
let userInfo = {};

// @todo: Информация удаляемой карточки
let removeCard = '';
let removeCardId = '';

// @todo: Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

// ФУНКЦИИ

// @todo: Функция ожидания загрузки информации
const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

// @todo: Функция ожидания удаления карточки
const deleteRenderLoading = (isLoading, button) => {
  button.textContent = isLoading ? 'Удаление...' : 'Да';
};

// @todo: Функция открытия модального окна карточки
const openFullImage = (cardInfo) => {
  modalImage.src = cardInfo.link;
  modalImage.alt = 'На фото ' + cardInfo.name;
  modalCaption.textContent = cardInfo.name;

  openModal(imageModal);
}

// @todo: Функция изменения лайка
const changeLike = (evt, isActiveLikeClass, cardId, likeElement, toggleLike) => {
  const likeMethod = evt.target.classList.contains(isActiveLikeClass) ?
  doRequestDeleteCardLike(cardId) : doRequestPutCardLike(cardId);

  likeMethod
    .then(card => {
      likeElement.textContent = card.likes.length;
      toggleLike(evt);
    })
    .catch(error => {
      console.log(error);
    });
}

// @todo: Функция удаления карточки
const deleteCard = (evt, card, cardId) => {
  let submitter = evt.submitter;
  deleteRenderLoading(true, submitter);

  doRequestDeleteCard(cardId)
    .then(() => { 
      card.remove();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      deleteRenderLoading(false, submitter);
    })
}

// Функция открытия модального окна для удаления карточки
const openDeleteModal = (card, cardId) => {
  removeCard = card;
  removeCardId = cardId;
  openModal(deleteModal);
}

// @todo: Функция обработки формы для редактирования аватарки
const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  let submitter = evt.submitter;
  renderLoading(true, submitter);
  
  doRequestPatchAvatarInfo(avatarUrlInput.value)
    .then(user => {
      profileImage.src = user.avatar;
      profileImage.alt = 'На фото ' + user.about;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, submitter);
    })

  closeModal(avatarEditModal);
}

// @todo: Функция обработки формы для редактирования профиля
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();

  let submitter = evt.submitter;
  renderLoading(true, submitter);

  doRequestPatchUserInfo(nameInput.value, descriptionInput.value)
    .then(user => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, submitter);
    })

  closeModal(editModal);
}

// @todo: Функция обработки формы для создания новой карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  let submitter = evt.submitter;
  renderLoading(true, submitter);

  doRequestPostNewCard(cardNameInput.value, urlInput.value)
    .then(cardInfo => {
      const createdCard = createCard(cardInfo, openFullImage, changeLike, openDeleteModal, userInfo);
      placesList.prepend(createdCard);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, submitter);
    })

  closeModal(cardAddModal);
  cardForm.reset();
}

// @todo: Функция обработки формы удаления карточки
const handleDeleteFormSubmit = (evt) => {
  evt.preventDefault();

  deleteCard(evt, removeCard, removeCardId);
  closeModal(deleteModal);
}

// @todo: Функция вставки информации в форму для редактирования профиля
const insertTextInEditForm = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// @todo: Функция вставки информации в форму для аватарки
const insertUrlInAvatarForm = () => {
  avatarUrlInput.value = profileImage.src;
}

// ЛОГИКА КОДА

// @todo: Загрузить профиль пользователя и карточки
Promise
  .all([doRequestGetUserInfo(), doRequestGetInitialCards()])
    .then(responses => {
      userInfo = responses[0];

      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      profileImage.src = userInfo.avatar;
      profileImage.alt = 'На фото ' + userInfo.about;

      responses[1].forEach(cardInfo => {
        const newCard = createCard(cardInfo, openFullImage, changeLike, openDeleteModal, userInfo);
        placesList.append(newCard);
      });
    });

// @todo: Включить валидацию форм
enableValidation(validationConfig);

// @todo: Открыть модальное окно
editButton.addEventListener('click', () => {
  insertTextInEditForm();
  clearValidation(editForm, validationConfig);
  openModal(editModal);
});

cardAddButton.addEventListener('click', () => {
  clearValidation(cardForm, validationConfig);
  openModal(cardAddModal);
});

profileImage.addEventListener('click', () => {
  insertUrlInAvatarForm();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarEditModal);
});

// @todo: Закрыть модальное окно (опционально)
modals.forEach(modal => {
  addCloseModalOptionalListener(modal);
});

// @todo: Обработать форму
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
editForm.addEventListener('submit', handleEditFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
deleteForm.addEventListener('submit', handleDeleteFormSubmit);
