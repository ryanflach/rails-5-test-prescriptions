class CreatesProject
  attr_accessor :name,
                :project,
                :task_string

  def initialize(name: '', task_string: '')
    @name        = name
    @task_string = task_string
    @success     = false
  end

  def success?
    @success
  end

  def build
    self.project  = Project.new(name: name)
    project.tasks = convert_string_to_tasks

    project
  end

  def create
    build
    result   = project.save
    @success = result
  end

  def convert_string_to_tasks
    task_string.split("\n").map do |raw_task|
      title, size = raw_task.split(':')

      Task.new(title: title, size: size_as_integer(size), project: project)
    end
  end

  def size_as_integer(size_string)
    [size_string.to_i, 1].max
  end
end
