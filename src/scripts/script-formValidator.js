export default class FormValidator {
    constructor(popupEl) {
        this.popupEl = popupEl;
        this.errorMessages = {
            valueMissing: 'Это обязательное поле',
            tooShort: 'Должно быть от 2 до 30 символов',
            typeMismatch: 'Здесь должна быть ссылка'
        };

    }
    // Функция валидации поля.
    checkInputValidity(input, error) {
        if (!input.validity.valid) {
            error.classList.add('active');
            for (let field in this.errorMessages) {
                if (input.validity[field]) {
                    error.textContent = this.errorMessages[field];
                    return;
                }
            }
        }
        error.textContent = ""; // Сбросить содержимое сообщения
        error.classList.remove('active'); // Сбросить визуальное состояние сообщения
    }

    // функция, меняющая состояние кнопки сабмита.
    setSubmitButtonState(inputs, button) {
        let valid = true;
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].validity.valid) {
                valid = false;
            }
        }
        if (valid) {
            button.classList.add('active');
            button.disabled = false;
        } else {
            button.classList.remove('active');
            button.disabled = true;
        }
        return valid;
    }
    // Функция добавления обработчиков.
    setEventListeners() {
        const inputs = this.popupEl.querySelectorAll('input');
        const popupForm = this.popupEl.querySelector('.popup__form');
        if (!popupForm) {
            return false;
        }
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('input', this.inputValidate.bind(this), false);
        }
    }

    inputValidate = (event) => {
        const popupForm = this.popupEl.querySelector('.popup__form');
        const popupButton = popupForm.querySelector('.button');
        const inputs = popupForm.querySelectorAll('input');
        if (event) {
            this.checkInputValidity(event.target, event.target.nextElementSibling);
        }
        this.setSubmitButtonState(inputs, popupButton);
    }
}
