export class ProjectLoader {
  constructor(project) {
    this.project = project;
  }

  load() {
    return $.ajax(this.ajaxData());
  }

  ajaxData() {
    return {
      url: `/projects/${this.project.id}.js`,
      dataType: 'json'
    };
  }
}
