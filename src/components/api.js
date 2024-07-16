// @todo: Настройки запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'ff161c49-24fc-438f-b635-5dff7fb5cccd',
    'Content-Type': 'application/json'
  }
}

// @todo: Функция обработки ответа
const handleResponse = (url, options) => {
  return fetch(url, options)
    .then(respons => {
      if (respons.ok)
        return respons.json();

      return Promise.reject(`Ошибка: ${respons.status}`);
    });
}

// @todo: Функция получения информации о пользователе
const getUserInfo = () => {
  return handleResponse(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
}

// @todo: Функция получения карточек
const getInitialCards = () => {
  return handleResponse(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
}

// @todo: Функция отправки информации о пользователе
const patchUserInfo = (name, about) => {
  return handleResponse(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  });
}

// @todo: Функция отправки информации об аватарке
const patchAvatarInfo = (avatar) => {
  return handleResponse(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  });
}

// @todo: Функция отправки информации о созданной карточке
const postNewCard = (name, link) => {
  return handleResponse(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  });
}

// @todo: Функция отправки информации о лайке
const putCardLike = (cardId) => {
  return handleResponse(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  });
}

// @todo: Функция удаления информации о лайке
const deleteCardLike = (cardId) => {
  return handleResponse(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

// @todo: Функция изменения информации о лайке
const changeLike = (evt, isActiveLikeClass, cardId, likeElement, toggleLike) => {
  const likeMethod = evt.target.classList.contains(isActiveLikeClass) ?
  deleteCardLike(cardId) : putCardLike(cardId);

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
const deleteCard = (card, cardId) => {
  return handleResponse(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(() => { 
    card.remove();
  })
  .catch(error => {
    console.log(error);
  });
}


export {
  getInitialCards,
  getUserInfo,
  patchAvatarInfo,
  patchUserInfo,
  postNewCard,
  changeLike,
  deleteCard
}
