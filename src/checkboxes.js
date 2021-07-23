/* eslint-disable import/no-cycle */
//  Module: related to the status updates with completed checkboxes
import UI from './uUIi';
import Store from './store';

const taskCompleted = (position2chage, value) => {
  // Gets list from local storage
  const toDos = Store.getTasks();

  const task2modify = toDos[position2chage];
  task2modify.completed = value;
  toDos[position2chage] = task2modify;

  // Set items to storage
  Store.setTasks(toDos);

  // Update list to UI
  UI.addTasksUI(toDos);
};

export default taskCompleted;