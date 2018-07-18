export class TaskUpdater {
  constructor(task) {
    this.task = task;
  }

  update(upOrDown) {
    const url = `/tasks/${this.task.id}/${upOrDown}.json`;
    $.ajax({
      url,
      beforeSend: xhr => {
        xhr.setRequestHeader(
          'X-CSRF-Token',
          $('meta[name="csrf-token"]').attr('content')
        )
      },
      data: { _method: 'PATCH' },
      type: 'POST'
    })
  }
}
