import {Project} from '../../app/javascript/packs/project.js';
import {ProjectLoader} from '../../app/javascript/packs/project_loader.js';
import td from 'testdouble/dist/testdouble';
import tdJasmine from 'testdouble-jasmine';
tdJasmine.use(td);

describe('Project Loader', () =>{
  let input;

  beforeEach(() => {
    input = {
      project: { name: 'Project Runway' },
      tasks:   [
        { title: 'Start Project', size: 1 },
        { title: 'End Project', size: 1}
      ]
    };
  })

  afterEach(() => {
    td.reset();
  })

  it('uses the fake loader to load a Project', () => {
    const project = new Project(1);
    const FakeLoader = td.constructor(ProjectLoader);
    project.projectLoader = new FakeLoader();
    td.when(FakeLoader.prototype.load()).thenResolve(input);
    project.load().then(() => {
      expect(project.name).toEqual('Project Runway');
      expect(project.firstTask().name).toEqual('Start Project');
      expect(project.lastTask().name).toEqual('End Project');
    })
  })

  it('can generate correct data for a loader', () => {
    const loader = new ProjectLoader(new Project(1));

    expect(loader.ajaxData().dataType).toEqual('json')
    expect(loader.ajaxData().url).toEqual('/projects/1.js');
  })

  it('can create a project and tasks from Data', () => {
    const project = new Project(1);
    project.loadFromData(input);

    expect(project.name).toEqual('Project Runway');
    expect(project.firstTask().name).toEqual('Start Project');
    expect(project.lastTask().name).toEqual('End Project');
  })
})
