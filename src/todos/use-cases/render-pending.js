import todoStore, { Filters } from "../../store/todo.store";

let element;

export const renderPendingTodos = (elementId) => {
  if (!element) {
    element = document.querySelector(elementId);
  }

  if (!element) {
    throw new Error(`el elemento ${elementId} not found`);
  }
  element.innerHTML = todoStore.getTodos(Filters.Pending).length;
};
