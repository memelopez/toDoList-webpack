import Task from './task';

// Hardcoded array of tasks --> toDos (line6)
const firstTask = new Task('clean table', false, 1);
console.log(firstTask.task2string());
const toDos = [];
toDos.push(firstTask);

// UI Class: Handle UI Tasks
export default class UI {

  static addApp() {
    this.addTitle();
    this.addForm();
    this.addEmptyUL();
    this.addTasks(toDos);
  }

  static addTitle() {
    const appDiv = document.querySelector('#appDiv');

    const div4title = document.createElement('DIV');
    div4title.className = 'd-flex justify-content-start align-items-center border-bottom border-2 px-2 appItem';
    const title = document.createElement('p');
    title.className = 'fs-5 m-0';
    title.innerText = "Today's To Do";
    div4title.appendChild(title);

    appDiv.appendChild(div4title);
  }

  static addForm() {
    const appDiv = document.querySelector('#appDiv');

    const div4form = document.createElement('DIV');
    div4form.className = 'd-flex justify-content-start align-items-center border-bottom border-2 px-2 appItem';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add to your list...';
    input.className = 'form-control border-0 fst-italic p-0'
    div4form.appendChild(input);

    appDiv.appendChild(div4form);
  }

  static addEmptyUL() {
    const appDiv = document.querySelector('#appDiv');

    const div4list = document.createElement('DIV');
    const list = document.createElement('UL');
    list.id = 'task-list';
    list.className = 'p-0 m-0';
    div4list.appendChild(list);

    appDiv.appendChild(div4list);
  }

  static addTasks(tasks) {
    // Iterates over array tasks to populate HTML list
    tasks.forEach((task) => this.addTaskToList(task));
  }

  static addTaskToList(task) {
    const list = document.querySelector('#task-list');

    const item = document.createElement('LI'); // creates list item
    item.className = 'd-flex justify-content-around align-items-center border-bottom border-2 px-2 appItem';

    const checkbox = document.createElement('INPUT'); // creates checkbox
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = task.completed;
    checkbox.className = 'form-check-label p-2';
    item.appendChild(checkbox); // appends checkbox to item

    const text = document.createElement('P'); // creates p
    text.textContent = task.description;
    text.className = 'm-0 p-2';
    item.appendChild(text); // appends p to item

    const icon = document.createElement('I'); // creates icon
    icon.className = 'fas fa-ellipsis-v ms-auto p-2';
    item.appendChild(icon); // appends icon to item

    list.appendChild(item); // appends item to list
  }

}