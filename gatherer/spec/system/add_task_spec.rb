require 'rails_helper'

RSpec.describe 'adding a new task' do
  let!(:project) { create(:project, name: 'Project Bluebook') }
  let!(:task_1) do
    create(:task, project: project, title: 'Search Sky', size: 1, project_order: 1)
  end
  let!(:task_2) do
    create(:task, project: project, title: 'Use Telescope', size: 1, project_order: 2)
  end
  let!(:task_3) do
    create(:task, project: project, title: 'Take Notes', size: 1, project_order: 3)
  end

  it 'can add and a task' do
    visit(project_path(project))
    fill_in('Task', with: 'Find UFOs')
    select('2', from: 'Size')
    click_on('Add Task')

    expect(current_path).to eq(project_path(project))
    within('#task_4') do
      expect(page).to have_selector('.name', text: 'Find UFOs')
      expect(page).to have_selector('.size', text: '2')
    end
  end

  it 'can re-order a task', :js do
    visit(project_path(project))
    within('#task_3') { click_on('Up') }

    expect(page).to have_selector(
      'tbody:nth-child(2) .name', text: 'Take Notes'
    )

    within('#task_2') do
      expect(page).to have_selector('.name', text: 'Take Notes')
    end
  end
end
