/* eslint-disable import/no-cycle */
//  Module: related to the status updates with completed checkboxes
import UI from './uUIi';
import Store from './store';

const taskCompleted = (index, value) => {
  // Gets list from local storage
  const toDos = Store.getTasks();
  toDos.forEach((task) => {
    if (task.index === index) { // Finds the specific item that has been completed
      task.completed = value;
    }
  });

  // Set items to storage
  Store.setTasks(toDos);

  // Update list to UI
  UI.addTasksUI(toDos);
};

export default taskCompleted;