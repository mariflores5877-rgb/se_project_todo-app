import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

function renderTodo(item) {
  const todo = new Todo(item, "#todo-template");
  todosList.append(todo.getView());
}

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

const addTodoPopupForm = new PopupWithForm("#add-todo-form", (inputValues) => {
  const name = inputValues.name;
  const dateInput = inputValues.date;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  formValidator.resetValidation();
  addTodoPopupForm.close();
});

addTodoPopupForm.setEventListeners();

initialTodos.forEach((item) => {
  renderTodo(item);
});
