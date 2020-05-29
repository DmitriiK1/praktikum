class CardList {
    constructor(placeCardsEl, cardsArr) {
        this.placeCardsEl = placeCardsEl;
        this.cardsArr = cardsArr;
    }

    addCard(card) {
        this.cardsArr.push(card);
        // Отображение новой карточки
        this.placeCardsEl.appendChild(card.create());
    }
    render() {
        //  Отобразить все карточки
        for (let card of this.cardsArr) {
            this.placeCardsEl.appendChild(card.create());
        }
    }
}
