// @todo: Переменные
const isActiveLikeClass = 'card__like-button_is-active';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(cardInfo, openFullImage, putCardLike, deleteCardLike, deleteCard, userInfo) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeQuantity = card.querySelector('.card__like-button_quantity');

  cardImage.src = cardInfo.link;
  cardImage.alt = 'На фото ' + cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  likeQuantity.textContent = cardInfo.likes.length;

  hideDeleteButton(cardInfo, userInfo, deleteButton);
  showLike(cardInfo, userInfo, likeButton);

  cardImage.addEventListener('click', () => {
    openFullImage(cardInfo);
  });

  deleteButton.addEventListener('click', () => {
    deleteCard(cardInfo)
      .catch(error => {
        console.log(error);
      })

    card.remove();
  });

  likeButton.addEventListener('click', evt => {
    toggleLike(evt);
    
    if (evt.target.classList.contains(isActiveLikeClass)) {
      putCardLike(cardInfo)
        .then(cards => {
          likeQuantity.textContent = cards.likes.length;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      deleteCardLike(cardInfo)
        .then(cards => {
          likeQuantity.textContent = cards.likes.length;
        })
        .catch(error => {
          console.log(error);
        })
      }
  });

  return card;
}

// @todo: Функция скрытия кнопки удаления карточки
function hideDeleteButton(cardInfo, userInfo, button) {
  if (cardInfo.owner._id !== userInfo._id)
    button.remove();
}

// @todo: Функция отображения лайка
function showLike(cardInfo, userId, button) {
  if (cardInfo.likes.some(like => like._id === userId._id))
    button.classList.add(isActiveLikeClass);
}

// @todo: Функция переключения лайков
function toggleLike(evt) {
  evt.target.classList.toggle(isActiveLikeClass);
}
