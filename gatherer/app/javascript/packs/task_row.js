export class TaskRow {
  constructor(task) {
    this.task = task
  }

  asHtml() {
    const row = $("<tr>").attr("id", `task_${this.task.id}`)
    row.append($("<td>", { class: "name" }).text(this.task.name))
    row.append($("<td>", { class: "size" }).text(this.task.size))
    const actionRow = $("<td>")
    if (!this.task.isFirst()) {
      actionRow.append($("<button>", {
        class: "up-button",
        click: () => { this.task.moveUp() }
      })
        .text("Up"))
    }
    if (!this.task.isLast()) {
      actionRow.append($("<button>", {
        class: "down-button",
        click: () => { this.task.moveDown() }
      })
        .text("Down"))
    }
    row.append(actionRow)
    return row
  }
}
