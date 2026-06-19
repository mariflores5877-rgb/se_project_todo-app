import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems();

function renderTodo(item) {
  const todo = new Todo(
    item,
    "#todo-template",
    (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    (isCompleted) => {
      todoCounter.updateTotal(false);
      if (isCompleted) todoCounter.updateCompleted(false);
    },
  );
  section.addItem(todo.getView());
}

addTodoButton.addEventListener("click", () => {
  addTodoPopupForm.open();
});

const addTodoPopupForm = new PopupWithForm("#add-todo-popup", (inputValues) => {
  const name = inputValues.name;
  const dateInput = inputValues.date;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);
  todoCounter.updateTotal(true);
  formValidator.resetValidation();
  addTodoPopupForm.close();
});

addTodoPopupForm.setEventListeners();
