import { TaskRow } from "../../../app/javascript/packs/task_row.js"

export class ProjectTable {
  constructor(project, selector) {
    this.project  = project;
    this.selector = selector;
  }

  insert() {
    $(this.selector).html(this.asHtml())
  }

  asHtml() {
    const table = $("<table>");
    table.html("<thead> <tr><th>Name</th> <th>Size</th></tr> </thead>")
    const body = $("<tbody>");
    this.project.tasks.forEach(task => {
      body.append(new TaskRow(task).asHtml())
    })
    table.append(body);
    return table;
  }
}
