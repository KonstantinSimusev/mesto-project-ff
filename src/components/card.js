// @todo: Класс поставленного лайка
const isActiveLikeClass = 'card__like-button_is-active';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export const createCard = (cardInfo, openFullImage, changeLike, openDeleteModal, userInfo) => {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  const totalLikes = card.querySelector('.card__like-button_total');

  cardImage.src = cardInfo.link;
  cardImage.alt = 'На фото ' + cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  totalLikes.textContent = cardInfo.likes.length;

  hideDeleteButton(cardInfo.owner._id, userInfo._id, deleteButton);
  showLikeIfExists(cardInfo.likes, userInfo._id, likeButton);

  cardImage.addEventListener('click', () => {
    openFullImage(cardInfo);
  });

  deleteButton.addEventListener('click', () => {
    openDeleteModal(card, cardInfo._id);
  });

  likeButton.addEventListener('click', evt => {
    changeLike(evt, isActiveLikeClass, cardInfo._id, totalLikes, toggleLike);
  });

  return card;
}

// @todo: Функция скрытия кнопки удаления карточки
const hideDeleteButton = (ownerId, userId, button) => {
  if (ownerId !== userId)
    button.remove();
}

// @todo: Функция отображения лайка, если лайк существует
const showLikeIfExists = (likes, userId, button) => {
  if (likes.some(like => like._id === userId))
    button.classList.add(isActiveLikeClass);
}

// @todo: Функция переключения лайков
const toggleLike = (evt) => {
  evt.target.classList.toggle(isActiveLikeClass);
}
