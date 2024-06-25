// @todo: Переменные
const isActiveLikeClass = 'card__like-button_is-active';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(cardInfo, toggleLike, openFullImage, deleteCard) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = cardInfo.link;
  cardImage.alt = 'На фото ' + cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  likeButton.addEventListener('click', evt => {
    toggleLike(evt);
  });

  cardImage.addEventListener('click', () => {
    openFullImage(cardInfo);
  });

  deleteButton.addEventListener('click', () => {
    deleteCard(card);
  });

  return card;
}

// @todo: Функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle(isActiveLikeClass);
}

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
}

export {
  createCard,
  toggleLike,
  deleteCard,
}