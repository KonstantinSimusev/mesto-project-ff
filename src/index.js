import './pages/index.css';
import { createCard, deleteCard } from './components/card/card.js';
import { initialCards } from './components/cards/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на экран
initialCards.forEach((card) => {
  const createdCard = createCard(card, deleteCard);
  placesList.append(createdCard);
});

export { cardTemplate }
