import './style.css';
import UI from './uUIi';
import validateDescription from './validateDescription';

// When content loads
document.addEventListener('DOMContentLoaded', UI.addApp());

// Event: when form is submitted
document.querySelector('#addTaskForm').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const taskDescription = document.querySelector('#taskDesc').value.trim();
  if (!validateDescription(taskDescription)) {
    console.log('Error- empty description');
  } else {
    // Add task
    UI.addTask(taskDescription);
  }
});

document.querySelector('#task-list').addEventListener('change', (e) => {
  // checks if this is trigerring for the correct element
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    // Gets the state of the checked checkbox
    const checkboxState = e.target.checked;

    const ulList = document.querySelector('#task-list');
    const itemChecked = e.target.parentElement.parentElement;
    const nodes = Array.from(ulList.children);
    const index = nodes.indexOf(itemChecked);

    UI.taskCompleted(index, checkboxState);
  }
});

document.querySelector('#clickEnterIcon').addEventListener('click', () => {
  // Get form values
  const taskDescription = document.querySelector('#taskDesc').value.trim();
  if (!validateDescription(taskDescription)) {
    console.log('empty description');
  } else {
    // Add task
    UI.addTask(taskDescription);
  }
});

document.querySelector('#task-list').addEventListener('click', (e) => {
  const classesIcn = e.target.className;
  const classesArr = classesIcn.split(' ');

  if (classesArr.indexOf('edtIcn') !== -1) {
    UI.changeLiToEditMode(e.target.parentElement.parentElement);
  }
  if (classesArr.indexOf('removeIcn') !== -1) {
    UI.removeTask(e.target.parentElement.parentElement);
  }
  if (classesArr.indexOf('acceptIcn') !== -1) {
    const newDesc = document.querySelector('#inputEdit').value;
    UI.updateTask(e.target.parentElement.parentElement, newDesc);
  }
});

// drag drop events
const draggables = document.querySelectorAll('.draggable');
const container = document.querySelector('#task-list');

draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

container.addEventListener('dragover', (e) => {
  e.preventDefault();
  UI.dragOverContainer(container, e);
});

container.addEventListener('drop', () => {
  UI.indexTasksFromUI();
});