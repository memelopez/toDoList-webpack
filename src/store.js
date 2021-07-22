// Store Class: Encapsulates de locacl storage
export default class Sotre {
  // tasks
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static addTask(task) {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // index - saves the total of tasks created ever
  static getIndexTotal() {
    let total;
    if (localStorage.getItem('index') === null) {
      total = 0;
    } else {
      total = JSON.parse(localStorage.getItem('index'));
    }

    return total;
  }

  static setsIndexTotalPlusOne() {
    let total = this.getIndexTotal();
    total += 1;
    localStorage.setItem('index', JSON.stringify(total));
  }
}