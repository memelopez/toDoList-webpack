// Store Class: Encapsulates de locacl storage
import Task from './task';

export default class Sotre {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}