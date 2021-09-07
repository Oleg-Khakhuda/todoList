refs = {
    items: document.querySelector('.todo__items'),
    todoOptions: document.querySelector('.todo__options'),
    inputText: document.querySelector('.todo__text'),
    addBtn: document.querySelector('.todo__add'),
    form: document.querySelector('.todo__input'),
}

refs.todoOptions.addEventListener('click', updateStatus);
refs.addBtn.addEventListener('click', addMarkup);
document.addEventListener('click', action);

// Проверка localStorage 

function init() {
  const fromStorage = localStorage.getItem('todo');
    if (fromStorage) {
      refs.items.insertAdjacentHTML('beforeend', fromStorage);
    }
}

// Создает разметку задачи

function createMarkup(text) {
    return `<li class="todo__item" data-todo-state="active">
    <span class="todo__task">${text}</span>
    <button class="todo__action todo__action_restore" data-todo-action="active"></button>
    <button class="todo__action todo__action_complete" data-todo-action="completed"></button>
    <button class="todo__action todo__action_delete" data-todo-action="deleted"></button></li>`;
}

// Сохраняет в LocalStorage

function saveToLocalStorage() {
  const saveTodoItems = refs.items.innerHTML;
  localStorage.setItem('todo', saveTodoItems);
}

// Обновляет статус задачи

function updateStatus() {
  const option = refs.todoOptions.value;
  refs.items.dataset.todoOption = option;
  if (option !== 'active') {
    refs.inputText.setAttribute("disabled", "disabled")
  } else {
    refs.inputText.removeAttribute("disabled")
  }
}

// Добавляет задачу

function addMarkup() {
  const value = refs.inputText.value;
  if (refs.inputText.disabled || !value.length) {
    return;
  }
  refs.items.insertAdjacentHTML('beforeend', createMarkup(value));
  saveToLocalStorage();
  refs.inputText.value = '';
}

// Управляет статусом задачи

function action(e) {
  const target = e.target;
  if (target.classList.contains('todo__action')) {
    const action = target.dataset.todoAction;
    const elemItem = target.parentNode;
    if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
      elemItem.remove();
    } else {
      elemItem.dataset.todoState = action;
    }
    saveToLocalStorage();
  }
}

init();