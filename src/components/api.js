fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
  headers: {
    authorization: 'ff161c49-24fc-438f-b635-5dff7fb5cccd',
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
