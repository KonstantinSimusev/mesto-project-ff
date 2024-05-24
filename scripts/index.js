// @todo: Темплейт карточки

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard() {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = 'Hello, World!';

  placesList.append(cardElement);
}

addCard();

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
