import {ProjectLoader} from './project_loader.js';
import {Task} from './task.js';
import {ProjectTable} from '../../../app/javascript/packs/project_table.js';

export class Project {
  constructor(id) {
    this.tasks  = [];
    this.id     = id;
    this.loader = new ProjectLoader(this);
  }

  load() {
    return this.loader.load().then(data => this.loadFromData(data));
  }

  loadFromData(data) {
    this.name = data.project.name;
    data.project.tasks.forEach(taskData => {
      this.appendTask(new Task(
        taskData.title, taskData.size, taskData.project_order
      ))
    })
    return this
  }

  appendTask(task) {
    this.tasks.push(task);
    task.project = this;
  }

  firstTask() {
    return this.tasks[0];
  }

  lastTask() {
    return this.tasks[this.tasks.length - 1];
  }

  swapTasksAt(index1, index2) {
    const temp = this.tasks[index1];
    this.tasks[index1] = this.tasks[index2];
    this.tasks[index2] = temp;
    new ProjectTable(this, '.task-table').insert();
  }
}
