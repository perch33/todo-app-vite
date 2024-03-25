/**
 *
 * @param {String} elementId
 */

import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderPendingTodos, renderTodos } from "./use-cases";

const ElementIDs = {
  ClearCompletedButton: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount()
  };

  const updatePendingCount = () => {
    renderPendingTodos(ElementIDs.PendingCountLabel);
  };

  //cuando la función se llama
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //referencias html

  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIDs.ClearCompletedButton
  );
  const filtersLI = document.querySelectorAll(ElementIDs.TodoFilters);
  //listener

  newDescriptionInput.addEventListener("keyup", (e) => {
    if (e.keyCode !== 13) return;
    if (e.target.value.trim().length === 0) return;

    todoStore.addTodo(e.target.value);
    displayTodos();
    e.target.value = "";
  });

  todoListUL.addEventListener("click", (e) => {
    const element = e.target.closest("[data-id]");

    todoStore.toggleTodo(element.getAttribute("data-id"));

    displayTodos();
  });

  todoListUL.addEventListener("click", (e) => {
    const isDestroyElement = e.target.className === "destroy";
    const element = e.target.closest("[data-id]");

    if (!element || !isDestroyElement) return;

    todoStore.deleteTodo(element.getAttribute("data-id"));

    displayTodos();
  });

  clearCompletedButton.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLI.forEach((element) => {
    element.addEventListener("click", (elemento) => {
      filtersLI.forEach((el) => el.classList.remove("selected"));
      elemento.target.classList.add("selected");

      switch (elemento.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.completed);
          break;
      }
      displayTodos();
    });
  });
};
