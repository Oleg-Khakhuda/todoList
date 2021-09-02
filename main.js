refs = {
    getLocalStorage: document.querySelector('.todo__items'),
    todoOptions: document.querySelector('.todo__options'),
    inputText: document.querySelector('.todo__text'),
    addBtn: document.querySelector('.todo__add'),
    form: document.querySelector('.todo__input'),
}

function init() {
  const fromStorage = localStorage.getItem('todo');
    if (fromStorage) {
      refs.getLocalStorage.innerHTML = fromStorage;
    }
    refs.todoOptions.addEventListener('click', update);
    document.addEventListener('click', action)
}

function create(text) {
    return `<li class="todo__item" data-todo-state="active">
    <span class="todo__task">${num}. ${text}</span>
    <span class="todo__action todo__action_restore" data-todo-action="active"></span>
    <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
    <span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>`;
}

function save() {
    const saveTodoItems = refs.getLocalStorage.innerHTML;
    localStorage.setItem('todo', saveTodoItems)
}

function update() {
    const option = refs.todoOptions.value;
    refs.getLocalStorage.dataset.todoOption = option;
    refs.inputText.disabled = option !== 'active'
}

function add() {
  if (refs.inputText.disabled || !refs.inputText.value.length) {
    return;
  }
  refs.getLocalStorage.insertAdjacentHTML('beforeend', create(refs.inputText.value));
  refs.inputText.value = '';
}

function action(e) {
  const target = e.target;
  if (target.classList.contains('todo__action')) {
    const action = target.dataset.todoAction;
    const elemItem = target.closest('.todo__item');
    if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
      elemItem.remove();
    } else {
      elemItem.dataset.todoState = action;
    }
    save();
  } else if (target.classList.contains('todo__add')) {
    add();
    save();
  }
}

init();