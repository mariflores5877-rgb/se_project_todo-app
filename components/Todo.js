class Todo {
  constructor(data, todoSelector, handleCheck, handleDelete) {
    this.name = data.name;
    this.completed = data.completed;
    this.date = data.date;
    this.id = data.id;
    this._templateElement = document.querySelector(todoSelector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this.completed);
    });
    this._todoCheckboxElement.addEventListener("change", () => {
      this.completed = !this.completed;
      this._handleCheck(this.completed);
    });
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameElement = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxElement =
      this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxElement.id = `todo-${this.id}`;
    this._todoLabel.setAttribute("for", `todo-${this.id}`);
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameElement.textContent = this.name;
    this._todoCheckboxElement.checked = this.completed;

    const dueDate = this.date instanceof Date ? this.date : new Date(this.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    this._setEventListeners();
    return this._todoElement;
  }
}

export { Todo };
