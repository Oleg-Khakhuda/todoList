refs = {
    getLocalStorage: document.querySelector('.todo__items'),
    todoOptions: document.querySelector('.todo__options'),
    inputText: document.querySelector('.todo__text'),
    addBtn: document.querySelector('.todo__add'),
    form: document.querySelector('.todo__input'),
}

// refs.inputText.addEventListener('input', add)
refs.form.addEventListener('click', text)

function text(e) {
    const value = refs.inputText.value
    console.log(value);
}



function init() {
    const fromStorage = localStorage.getItem('todo');
    if (fromStorage) {
        refs.getLocalStorage.innerHTML = fromStorage
    }
    refs.todoOptions.addEventlistner('change', this.update);
    document.addEventListener('click', this.action.bing(this))
}

function create(text) {
    return `<li class="todo__item" data-todo-state="active">
    <span class="todo__task">${text}</span>
    <span class="todo__action todo__action_restore" data-todo-action="active"></span>
    <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
    <span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>`;
}

function save() {
    const saveTodoItems = refs.getLocalStorage.innerHTML;
    localStorage.setItem('todo', saveTodoItems)
}

function update() {
    const options = refs.todoOptions.value;
    refs.getLocalStorage.dataset.todoOption = option;
    refs.inputText.disabled = option !== 'active'
}

function add() {
    // const elemText = document.querySelector('.todo__text');
  if (refs.inputText.disabled || !refs.inputText.value.length) {
    return;
  }
  refs.getLocalStorage.insertAdjacentHTML('beforeend', this.create(refs.inputText.value));
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
    this.save();
  } else if (target.classList.contains('todo__add')) {
    this.add();
    this.save();
  }
}