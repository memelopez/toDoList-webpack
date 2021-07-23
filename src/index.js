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
    console.log('Enter valid description for to-do');
  } else {
    // Add task
    UI.addTask(taskDescription);
  }
});

document.querySelector('#task-list').addEventListener('change', (e) => {
  const ulList = document.querySelector('#task-list');
  const itemChecked = e.target.parentElement;
  const nodes = Array.from(ulList.children);
  const index = nodes.indexOf(itemChecked);

  UI.taskCompleted(index);
})
