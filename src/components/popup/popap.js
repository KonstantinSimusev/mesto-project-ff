

function closePopapWithKey(evt) {
  if (evt.key.toLowerCase() === closeKey) 
    closeEditPopap();
}

function closePopapWithClick(evt) {
  if (evt.target === popap) {
    closeEditPopap();
  }
}

function openEditPopap() {
  editPopap.classList.add(popapOpenClass);
  insertTextInEditForm();
  document.addEventListener('keydown', closePopapWithKey);
  popap.addEventListener('click', closePopapWithClick);
}

function closeEditPopap() {
  editPopap.classList.remove(popapOpenClass);
  document.removeEventListener('keydown', closePopapWithKey);
}