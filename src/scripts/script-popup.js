class Popup {
    constructor(popupEl, formValidator) {
        this.popupEl = popupEl;
        this.popupForm = this.popupEl.querySelector('.popup__form');
        this.closeBtn = this.popupEl.querySelector('.popup__close');
        this.formValidator = formValidator;
        if (this.formValidator) {
            this.formValidator.setEventListeners();
        }
        this.closeBtn.addEventListener('click', this.closePopup);
        if (this.popupForm) {
            this.popupForm.addEventListener('submit', this.popupInputForm);
        }
    }
    openPopup = () => {
        this.popupEl.classList.add('popup_is-opened');
    }
    closePopup = (e) => {
        this.popupEl.classList.remove('popup_is-opened');
        if (this.popupForm) {
            this.popupForm.reset();
            const errors = this.popupEl.querySelectorAll(".error");
            for (let i = 0; i < errors.length; i++) {
                errors[i].textContent = "";
                errors[i].classList.remove("active");
            }
            this.formValidator.inputValidate();
        }
    }
    popupInputForm = (event) => {
        event.preventDefault();
        const popupButton = this.popupForm.querySelector('.button');
        if (popupButton.disabled === true) {
            return;
        }
        const inputs = {}
        this.popupEl.querySelectorAll('input').forEach(element => {
            inputs[element.getAttribute('name')] = element.value;
        });
        this.popupInputCallback(inputs)

        this.closePopup();
    };
    setImage(imgSrc) {
        const targetImage = this.popupEl.querySelector('.popup-image__big');
        targetImage.setAttribute('src', imgSrc);
    }

}
