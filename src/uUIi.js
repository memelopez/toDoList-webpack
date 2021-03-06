/* eslint-disable import/no-cycle */
// UI Class: Handles UI Tasks
import Task from './task';
import Store from './store';
import taskCompleted from './checkboxes';
import dropsItem from './dragDrop';
import returnsUncompleted from './isCompleted';

export default class UI {
  static addApp() {
    this.addTitleUI();
    this.addFormUI();
    this.addEmptyUL();
    const toDos1 = Store.getTasks();
    this.addTasksUI(toDos1);
    this.addbottombtn();
  }

  static addTitleUI() {
    const appDiv = document.querySelector('#appDiv');

    const div4title = document.createElement('DIV');
    div4title.className = 'd-flex justify-content-start align-items-center border-bottom border-2 px-2 appItem';

    const title = document.createElement('p');
    title.className = 'fs-5 m-0';
    title.innerText = "Today's To Do";

    const icon = document.createElement('ICON');
    icon.className = 'fas fa-sync-alt ms-auto p-2';

    div4title.appendChild(title);
    div4title.appendChild(icon);

    appDiv.appendChild(div4title);
  }

  static addFormUI() {
    const appDiv = document.querySelector('#appDiv');

    const div4form = document.createElement('DIV');
    const form = document.createElement('FORM');
    form.className = 'd-flex justify-content-start align-items-center border-bottom border-2 px-2 appItem';
    form.action = 'submit';
    form.id = 'addTaskForm';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'taskDesc';
    input.placeholder = 'Add to your list...';
    input.className = 'form-control border-0 fst-italic p-0';

    const icon = document.createElement('ICON');
    icon.className = 'fas fa-sign-in-alt ms-auto p-2';

    const aSubmit = document.createElement('A');
    aSubmit.setAttribute('id', 'clickEnterIcon');

    form.appendChild(input);
    aSubmit.appendChild(icon);
    form.appendChild(aSubmit);
    div4form.appendChild(form);

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

  static addTasksUI(tasks) {
    // Get a hold of the UL
    const list = document.querySelector('#task-list');
    // Erase everything inside the list
    list.innerHTML = '';
    // Iterates over array tasks to populate HTML list
    tasks.forEach((task) => this.addTaskToList(task));
  }

  static addTaskToList(task) {
    const list = document.querySelector('#task-list');

    const item = document.createElement('LI'); // creates list item
    item.className = 'd-flex justify-content-around align-items-center border-bottom border-2 px-2 appItem draggable';
    item.setAttribute('draggable', 'true');

    // creates div for normal view
    const divNormal = document.createElement('DIV');
    divNormal.className = 'd-flex align-items-center normalView';

    const checkbox = document.createElement('INPUT'); // creates checkbox
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    checkbox.className = 'form-check-label p-2 blackCheckboxes';
    divNormal.appendChild(checkbox); // appends checkbox to item

    const text = document.createElement('P'); // creates p
    text.textContent = task.description;
    text.className = 'm-0 p-2';
    if (task.completed === true) {
      text.classList.add('text-decoration-line-through');
    }
    divNormal.appendChild(text); // appends p to item

    const ind = document.createElement('P'); // creates p
    ind.textContent = task.index;
    ind.className = 'd-none';
    divNormal.appendChild(ind);

    // Create div for edit view
    const divEdit = document.createElement('DIV');
    divEdit.className = 'd-none flex-fill align-items-center editView';

    const inputEdit = document.createElement('INPUT');
    inputEdit.setAttribute('type', 'text');
    inputEdit.className = 'form-control border-0 p-0';
    inputEdit.value = task.description;

    divEdit.appendChild(inputEdit);

    // Creates div for icons
    const div4Icons = document.createElement('DIV');
    div4Icons.className = 'ms-auto';

    const iconAccept = document.createElement('I'); // creates accpet icon
    iconAccept.className = 'fas fa-check-circle p-2 d-none acceptIcn';
    div4Icons.appendChild(iconAccept); // appends iaccwpt con to item

    const iconEdit = document.createElement('I'); // creates edit icon
    iconEdit.className = 'fas fa-ellipsis-v p-2 edtIcn';
    div4Icons.appendChild(iconEdit); // appends edit icon to item

    const iconRemove = document.createElement('I'); // creates icon
    iconRemove.className = 'fas fa-trash p-2 d-none removeIcn';
    div4Icons.appendChild(iconRemove); // appends icon to item

    item.appendChild(divNormal);
    item.appendChild(divEdit);
    item.appendChild(div4Icons);

    list.appendChild(item); // appends item to list
  }

  static addTask(description) {
    // gets index from storage
    const index = Store.getIndexTotal();
    // instantiates a new task
    const task = new Task(description, false, index);

    // Add task to UI
    this.addTaskToList(task);

    // Add task to local storage
    Store.addTask(task);
    Store.setsIndexTotalPlusOne();

    // Clear description input
    this.clearField();
  }

  static clearField() {
    document.querySelector('#taskDesc').value = '';
  }

  static taskCompleted(index, value) {
    taskCompleted(index, value);

    // reload page
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  static changeLiToEditMode(li) {
    let classesLi = li.className;
    classesLi = classesLi.replace('appItem', 'appItemEdit');
    li.className = classesLi;
    const childrenLi = li.children;

    // change clases of divs
    const normalView = childrenLi[0];
    let classesNV = normalView.className;
    classesNV = classesNV.replace('d-flex', 'd-none');
    normalView.className = classesNV;

    const editView = childrenLi[1];
    let classesE = editView.className;
    classesE = classesE.replace('d-none', 'd-flex');
    editView.className = classesE;

    const inputEdit = editView.querySelector('input');
    inputEdit.id = 'inputEdit';
    inputEdit.focus();

    // show appropriate icons
    const divIcons = childrenLi[2];
    const icons = divIcons.children;
    this.changeClassToElement(icons[0], 'd-none', '');
    icons[1].classList.add('d-none');
    this.changeClassToElement(icons[2], 'd-none', '');
  }

  static changeClassToElement(item, oldClass, newClass) {
    let classesItem = item.className;
    classesItem = classesItem.replace(oldClass, newClass);
    item.className = classesItem;
  }

  static removeTask(li) {
    const ulList = document.querySelector('#task-list');
    const nodes = Array.from(ulList.children);
    const index = nodes.indexOf(li);

    // remove li from UI
    li.remove();

    // remove from store
    Store.removeTask(index);

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  static updateTask(li, newDesc) {
    const ulList = document.querySelector('#task-list');
    const nodes = Array.from(ulList.children);
    const index = nodes.indexOf(li);

    const tasks = Store.getTasks();
    tasks[index].description = newDesc;

    // Set task with modification tu store
    Store.setTasks(tasks);

    // Reload page
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  static dragOverContainer(container, e) {
    dropsItem(container, e);
  }

  static indexTasksFromUI() {
    const tasksList = document.querySelector('#task-list');
    const tasksUI = tasksList.children;
    const newtasks = [];

    for (let i = 0; i < tasksUI.length; i += 1) {
      const desc = tasksUI[i].children[0].children[1].textContent;
      const check = tasksUI[i].children[0].children[0].checked;
      const todo = new Task(desc, check, i);
      newtasks.push(todo);
    }

    const newInd = newtasks.length;
    Store.setTasks(newtasks);
    Store.setIndexTo(newInd);
    // eslint-disable-next-line no-restricted-globals
    location.reload(); // Reload page
  }

  static addbottombtn() {
    const appDiv = document.querySelector('#appDiv');

    const btmDiv = document.createElement('DIV');
    btmDiv.className = 'd-flex justify-content-center align-items-center border bg-light btmDiv';

    const pBtm = document.createElement('P');
    pBtm.textContent = 'Clear all completed';
    pBtm.className = 'm-0 btmText';
    pBtm.id = 'pBtm';

    btmDiv.appendChild(pBtm);
    appDiv.appendChild(btmDiv);
  }

  static clearCompleted() {
    const tasks = Store.getTasks();

    const uncompletedTasks = tasks.filter(returnsUncompleted);

    Store.setTasks(uncompletedTasks);

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
}