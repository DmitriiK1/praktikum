class Card {
  constructor(name, link, popup) {
    this.name = name;
    this.link = link;
    this.popup = popup;
  }
  create() {
    const placeCard = document.createElement("div");
    this.placeCardImage = document.createElement("div");
    this.placeCardDeleteIcon = document.createElement("button");
    const placeCardDescription = document.createElement("div");
    const placeCardName = document.createElement("h3");
    this.placeCardLikeIcon = document.createElement("button");

    placeCard.classList.add("place-card");
    this.placeCardImage.classList.add("place-card__image");
    this.placeCardImage.style.backgroundImage = `url(${this.link})`;

    this.placeCardDeleteIcon.classList.add("place-card__delete-icon");
    placeCardDescription.classList.add("place-card__description");
    this.placeCardLikeIcon.classList.add('place-card__like-icon');
    placeCardName.classList.add("place-card__name");
    placeCardName.textContent = this.name;

    placeCard.appendChild(this.placeCardImage);
    placeCard.appendChild(placeCardDescription);
    this.placeCardImage.appendChild(this.placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(this.placeCardLikeIcon);
    this.placeCardLikeIcon.addEventListener('click', this.like);
    this.placeCardDeleteIcon.addEventListener('click', this.remove);
    this.placeCardImage.addEventListener('click', this.open);
    return placeCard;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove = (event) => {
    const placeCard = event.target.closest('.place-card');//closest() возвращает ближайший родительский элемент (или сам элемент),
    //который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.
    const placesList = placeCard.parentNode;
    this.placeCardLikeIcon.removeEventListener('click', this.like);
    this.placeCardDeleteIcon.removeEventListener('click', this.remove);
    placesList.removeChild(placeCard);
  }
  open = (event) => {
    if (event.target.classList.contains('place-card__image')) {
      const backgroundImage = event.target.style.backgroundImage;
      this.popup.setImage(backgroundImage.split(/"/)[1]);
      this.popup.openPopup();
    }
  }
}
