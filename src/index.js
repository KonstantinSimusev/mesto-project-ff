// // ссылки на локальные картинки
// const addIconImage = new URL('./images/add-icon.svg', import.meta.url);
// const avatarImage = new URL('./images/avatar.jpg', import.meta.url);
// const closeImage = new URL('./images/close.svg', import.meta.url);
// const deleteIconImage = new URL('./images/delete-icon.svg', import.meta.url);
// const editIconImage = new URL('./images/edit-icon.svg', import.meta.url);
// const activeLikeImage = new URL('./images/like-active.svg', import.meta.url);
// const inactiveLikeImage = new URL('./images/like-inactive.svg', import.meta.url);
// const logoImage = new URL('./images/logo.svg', import.meta.url);

// // локальные картинки
// const localImages = [
//   { name: 'addIcon', link: addIconImage },
//   { name: 'avatar', link: avatarImage },
//   { name: 'close', link: closeImage },
//   { name: 'deleteIcon', link: deleteIconImage },
//   { name: 'editIcon', link: editIconImage },
//   { name: 'activeLike', link: activeLikeImage },
//   { name: 'inactiveLike', link: inactiveLikeImage },
//   { name: 'logo', link: logoImage },
// ]

import './pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardInfo, deleteCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardInfo.link;
  cardImage.alt = "На фото " + cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });

  return card;
}

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
}

// @todo: Вывести карточки на экран
initialCards.forEach((card) => {
  const createdCard = createCard(card, deleteCard);
  placesList.append(createdCard);
});
