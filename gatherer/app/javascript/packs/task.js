import {TaskUpdater} from '../../../app/javascript/packs/task_updater.js';

export class Task {
  constructor(name, size, id) {
    this.name    = name;
    this.size    = size;
    this.project = null;
    this.id      = id;
    this.updater = new TaskUpdater(this);
  }

  index() {
    return this.project.tasks.indexOf(this);
  }

  isFirst() {
    if (this.project) {
      return this.project.firstTask() === this;
    }
    return false;
  }

  isLast() {
    if (this.project) {
      return this.project.lastTask() === this;
    }
    return false;
  }

  moveUp() {
    if (this.isFirst()) {
      return;
    }
    this.project.swapTasksAt(this.index - 1, this.index);
    this.updater.update('up');
  }

  moveDown() {
    if (this.isLast()) {
      return;
    }
    this.project.swapTasksAt(this.index, this.index + 1);
    this.updater.update('down');
  }
}
