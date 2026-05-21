export class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;

    this._formElement = formElement;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`,
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`,
    );
    inputElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }
  _toggleButtonState(inputList, buttonElement) {
    const hasInvalid = inputList.some((input) => !input.validity.valid);
    buttonElement.disabled = hasInvalid;
  }
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );
    const buttElement = this._formElement.querySelector(
      this._submitButtonSelector,
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttElement);
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._formElement.reset();

    const buttElement = this._formElement.querySelector(
      this._submitButtonSelector,
    );
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  }
}
