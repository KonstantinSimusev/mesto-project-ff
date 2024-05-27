// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(link, name) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);

  card.querySelector(".card__image").src = link;
  card.querySelector(".card__title").textContent = name;

  card.querySelector(".card__delete-button").addEventListener("click", () => {
    const element = card.closest(".places__item");
    element.remove();
  });

  placesList.append(card);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на

initialCards.forEach((card) => {
  createCard(card.link, card.name);
});
