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
