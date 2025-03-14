import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ITask } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { RemoveTaskDialogComponent } from '../remove-task-dialog/remove-task-dialog.component';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jest.Mocked<TaskService>;
  let dialog: jest.Mocked<MatDialog>;

  const mockTasks = [
    { title: 'Task 1', category: 'home', completed: false },
    { title: 'Task 2', category: 'work', completed: true },
    { title: 'Task 3', category: 'home', completed: false },
  ];

  beforeEach(async () => {
    taskService = {
      tasks: signal(mockTasks),
      toggleTaskCompletion: jest.fn(),
      updateTask: jest.fn(),
      removeTask: jest.fn(),
    } as unknown as jest.Mocked<TaskService>;

    dialog = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatDialog>;

    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        provideAnimations(),
        provideNoopAnimations(),
        { provide: TaskService, useValue: taskService },
        { provide: MatDialog, useValue: dialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Task Display', () => {
    it('should display tasks when tasks array is not empty', () => {
      const element = fixture.nativeElement;
      const taskElements = element.querySelectorAll('[data-test="task-item"]');
      expect(taskElements.length).toBe(mockTasks.length);
    });

    it('should render task titles correctly', () => {
      const element = fixture.nativeElement;
      const taskTitles = element.querySelectorAll('[data-test="task-title"]');

      expect(taskTitles.length).toBe(mockTasks.length);
      expect(taskTitles[0].textContent).toContain('Task 1');
      expect(taskTitles[1].textContent).toContain('Task 2');
    });

    it('should render correct icon for completed and uncompleted tasks', () => {
      const element = fixture.nativeElement;
      const toggleButtons = element.querySelectorAll(
        '[data-test="toggle-button"]'
      );

      expect(toggleButtons[0]).toBeTruthy();
      expect(toggleButtons[1]).toBeTruthy();
    });

    it('should render edit and delete action buttons for each task', () => {
      const element = fixture.nativeElement;
      const deleteButton = element.querySelector('[data-test="delete-button"]');
      const editButton = element.querySelector('[data-test="edit-button"]');

      expect(deleteButton).toBeTruthy();
      expect(editButton).toBeTruthy();
    });

    it('should show no tasks message when tasks array is empty', () => {
      taskService.tasks.set([]);
      fixture.detectChanges();

      const element = fixture.nativeElement;
      const noTasksMessage = element.querySelector(
        '[data-test="no-tasks-message"]'
      );
      expect(noTasksMessage?.textContent).toContain(
        'Nenhuma tarefa encontrada'
      );
    });
  });

  describe('Task Actions', () => {
    it('should call toggleCompletion when toggle button is clicked', () => {
      const element = fixture.nativeElement;
      const toggleButton = element.querySelector('[data-test="toggle-button"]');
      toggleButton?.click();

      expect(taskService.toggleTaskCompletion).toHaveBeenCalledWith(
        'Task 1',
        'home'
      );
    });

    it('should open edit dialog when edit button is clicked', () => {
      dialog.open.mockReturnValue({
        afterClosed: () => of({ title: 'Updated Task', category: 'home' }),
      } as any);

      const element = fixture.nativeElement;
      const editButton = element.querySelector('[data-test="edit-button"]');
      editButton?.click();

      expect(dialog.open).toHaveBeenCalledWith(EditTaskDialogComponent, {
        width: '400px',
        data: expect.any(Object),
      });
    });

    it('should open remove dialog when delete button is clicked', () => {
      dialog.open.mockReturnValue({
        afterClosed: () => of(true),
      } as any);

      const element = fixture.nativeElement;
      const deleteButton = element.querySelector('[data-test="delete-button"]');
      deleteButton?.click();

      expect(dialog.open).toHaveBeenCalledWith(RemoveTaskDialogComponent, {
        width: '400px',
      });
    });
  });

  describe('Filtering', () => {
    it('should filter tasks by category', () => {
      component.onFilterChange('home');
      fixture.detectChanges();

      const filteredTasks = component.filteredTasks();
      expect(filteredTasks.length).toBe(2);
      expect(
        filteredTasks.every((task) => task.category === 'home')
      ).toBeTruthy();
    });

    it('should show all tasks when category is "all"', () => {
      component.onFilterChange('all');
      fixture.detectChanges();

      expect(component.filteredTasks().length).toBe(mockTasks.length);
    });

    it('should show "no tasks found" message when filter returns empty results', () => {
      component.onFilterChange('invalid-category');
      fixture.detectChanges();

      const element = fixture.nativeElement;
      const noTasksMessage = element.querySelector(
        '[data-test="no-tasks-category-message"]'
      );
      expect(noTasksMessage?.textContent).toContain(
        'Nenhuma tarefa com essa categoria encontrada'
      );
    });
  });

  describe('Dialog Interactions', () => {
    it('should update task when edit dialog is confirmed', () => {
      const updatedTask: ITask = {
        title: 'Updated Task',
        category: 'home',
        completed: false,
      };
      dialog.open.mockReturnValue({
        afterClosed: () => of(updatedTask),
      } as any);

      component.onEditTask(mockTasks[0]);

      expect(taskService.updateTask).toHaveBeenCalledWith(
        mockTasks[0].title,
        mockTasks[0].category,
        updatedTask
      );
    });

    it('should remove task when remove dialog is confirmed', () => {
      dialog.open.mockReturnValue({
        afterClosed: () => of(true),
      } as any);

      component.onRemoveTask('Task 1', 'home');

      expect(taskService.removeTask).toHaveBeenCalledWith('Task 1', 'home');
    });

    it('should not remove task when remove dialog is cancelled', () => {
      dialog.open.mockReturnValue({
        afterClosed: () => of(false),
      } as any);

      component.onRemoveTask('Task 1', 'home');

      expect(taskService.removeTask).not.toHaveBeenCalled();
    });
  });
});
