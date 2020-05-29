/**
 * Работа принята.
 *
 * Удалил исправленные замечания, необходима небольшая доработка:
 * В классе Api необходимо создать методы, которые будут вызывать request с соответствующими url.
 * Таким образом мы инкапсулируем URL внутрь класса.
 * Пример:
 * api.get('/cohort10/cards')
 *   .then((result) => ...
 * Следует переделать в
 * api.getCards()
 *   .then...
 *
 * Отлично, теперь вы знаете, как делать запросы к серверу.
 * Реализованный функционал работает без ошибок.
 */
// Переменные
(function () {
  const placesList = document.querySelector('.places-list');
  const userPopupOpen = document.querySelector('.user-info__button_edit');
  const cardPopupOpen = document.querySelector('.card__button');
  const imagePopup = new Popup(document.querySelector('.popup-image'));

  const api = new Api('https://praktikum.tk', '18a021a8-48cf-47e9-a7a9-96c77236072e');

  //Загрузка первоначальных карточек с сервера

  api.getCards()
    .then((result) => {
      const cardsArr = result.map(function (cardObj) {
        return new Card(cardObj.name, cardObj.link, imagePopup);
      });
      const cardList = new CardList(placesList, cardsArr);
      cardPopup.popupInputCallback = function (inputs) {
        const card = new Card(inputs.name, inputs.link, imagePopup);
        cardList.addCard(card);
      }

      cardList.render();
    })
    .catch(error => console.log(error));

  api.getUser()
    .then((result) => {
      //console.log(result);
      const userInfo = new UserInfo(
        result.name,
        result.about,
        document.querySelector('.user-info__name'),
        document.querySelector('.user-info__job')
      );
      userPopup.popupInputCallback = function (inputs) {
        //Редактирование профиля

        api.updateUser(JSON.stringify({
          name: inputs.name,
          about: inputs.job
        }))
          .then(() => {
            userInfo.setUserInfo(inputs.name, inputs.job);
            userInfo.updateUserInfo();
          })
          .catch(error => console.log(error));

      }
      // Открытие Edit
      function openEdit() {
        const userData = userInfo.getUserInfo();
        userPopup.popupEl.querySelector('.popup__input_type_name').value = userData.name;
        userPopup.popupEl.querySelector('.popup__input_type_job').value = userData.job;
        userPopup.openPopup()
      };
      userInfo.updateUserInfo();
      userPopupOpen.addEventListener('click', openEdit);

    })

    .catch(error => console.log(error));

  const cardPopup = new Popup(
    document.querySelector('.popup-create'),
    new FormValidator(document.querySelector('.popup-create'))
  );

  const userPopup = new Popup(
    document.querySelector('.popup-edit'),
    new FormValidator(document.querySelector('.popup-edit'))
  );

  // Вызов функций

  cardPopupOpen.addEventListener('click', cardPopup.openPopup);

})();
