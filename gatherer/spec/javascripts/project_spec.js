import {Project} from '../../app/javascript/packs/project.js';
import {Task} from '../../app/javascript/packs/task.js';
import {TaskUpdater} from '../../app/javascript/packs/task_updater.js';
import td from 'testdouble/dist/testdouble';
import tdJasmine from 'testdouble-jasmine';
tdJasmine.use(td);

describe('Projects', () => {
  let project

  beforeEach(() => {
    project = new Project()
    project.appendTask(new Task('Start Project', 1))
    project.appendTask(new Task('Middle Project', 2))
    project.appendTask(new Task('End Project', 3))
  })

  it('can identify the first element of a project', () => {
    expect(project.firstTask().name).toEqual('Start Project')
    expect(project.firstTask().isFirst()).toBeTruthy()
    expect(project.firstTask().isLast()).toBeFalsy()
    expect(project.firstTask().index).toEqual(0)
  })

  it('can identify the last element of a project', () => {
    expect(project.lastTask().name).toEqual('End Project')
    expect(project.lastTask().isLast()).toBeTruthy()
    expect(project.lastTask().isFirst()).toBeFalsy()
    expect(project.lastTask().index).toEqual(2)
  })

  it('can move a task up', () => {
    const FakeUpdater = td.constructor(TaskUpdater);
    project.tasks[1].updater = new FakeUpdater();
    project.tasks[1].moveUp();

    expect(project.firstTask().name).toEqual('Middle Project');
    expect(project.tasks[1].name).toEqual('Start Project');
    expect(project.lastTask().name).toEqual('End Project');

    td.verify(FakeUpdater.prototype.update('up'));
  })

  it('can move a task down', () => {
    const FakeUpdater = td.constructor(TaskUpdater);
    project.tasks[1].updater = new FakeUpdater();
    project.tasks[1].moveDown();

    expect(project.firstTask().name).toEqual('Start Project');
    expect(project.tasks[1].name).toEqual('End Project');
    expect(project.lastTask().name).toEqual('Middle Project');
    expect().toVerify(FakeUpdater.prototype.update('down'));
  })

  it('handles asking for the first task to move up', () => {
    project.firstTask().moveUp()

    expect(project.firstTask().name).toEqual('Start Project')
    expect(project.tasks[1].name).toEqual('Middle Project')
    expect(project.lastTask().name).toEqual('End Project')
  })

  it('handles asking for the last task to move down', () => {
    project.lastTask().moveDown()

    expect(project.firstTask().name).toEqual('Start Project')
    expect(project.tasks[1].name).toEqual('Middle Project')
    expect(project.lastTask().name).toEqual('End Project')
  })
})
