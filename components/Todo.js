class Todo {
  constructor(data, todoSelector) {
    this.name = data.name;
    this.completed = data.completed;
    this.date = data.date;
    this.id = data.id;
    this._templateElement = document.querySelector(todoSelector);
  }

  getView() {
    const todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameElement = todoElement.querySelector(".todo__name");
    const todoCheckboxElement = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

    todoNameElement.textContent = this.name;
    todoCheckboxElement.checked = this.completed;

    return todoElement;
  }

  _setEventListeners() {
    //Is there a problem with using todoElement
    //  as the private method on line 32 & 34 when we
    // already have _templateElement on line 11 ??
    //Let's try it out
    //
    const todoDeleteBtn =
      this._templateElement.querySelector(".todo__delete-btn");
    const todoCheckboxElement =
      this._templateElement.querySelector(".todo__completed");
  }
}
