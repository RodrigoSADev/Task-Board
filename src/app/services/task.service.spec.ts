import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new task', () => {
    const newTask = { title: 'Test Task', category: 'Test', completed: false };
    service.addTask(newTask);
    expect(service.tasks()).toContainEqual(newTask);
  });

  it('should update a task', () => {
    const initialTask = {
      title: 'Initial Task',
      category: 'Test',
      completed: false,
    };
    const updatedTask = {
      title: 'Updated Task',
      category: 'Test',
      completed: true,
    };

    service.addTask(initialTask);
    service.updateTask(initialTask.title, initialTask.category, updatedTask);

    expect(service.tasks()).toContainEqual(updatedTask);
    expect(service.tasks()).not.toContainEqual(initialTask);
  });

  it('should remove a task', () => {
    const task = {
      title: 'Task to Remove',
      category: 'Test',
      completed: false,
    };
    service.addTask(task);
    service.removeTask(task.title, task.category);

    expect(service.tasks()).not.toContainEqual(task);
  });

  it('should toggle task completion', () => {
    const task = { title: 'Toggle Task', category: 'Test', completed: false };
    service.addTask(task);
    service.toggleTaskCompletion(task.title, task.category);

    const toggledTask = service
      .tasks()
      .find((t) => t.title === task.title && t.category === task.category);
    expect(toggledTask?.completed).toBe(true);
  });
});
