// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cards) {
  cards.forEach(card => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
  
    placesList.append(cardElement);
  });
}

createCard(initialCards);

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
