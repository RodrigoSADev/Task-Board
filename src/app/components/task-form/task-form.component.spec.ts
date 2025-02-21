import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jest.Mocked<TaskService>;

  beforeEach(async () => {
    taskService = {
      addTask: jest.fn(),
    } as unknown as jest.Mocked<TaskService>;

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [
        provideAnimations(),
        { provide: TaskService, useValue: taskService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.taskForm.get('title')?.value).toBe('');
    expect(component.taskForm.get('category')?.value).toBe('');
  });

  it('should render form elements correctly', () => {
    const element = fixture.nativeElement;
    const form = element.querySelector('form');
    const titleInput = element.querySelector('[data-test="task-form-title"]');
    const categorySelect = element.querySelector(
      '[data-test="task-form-category"]'
    );
    const addButton = element.querySelector('[data-test="add-button"]');

    expect(form).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(categorySelect).toBeTruthy();
    expect(addButton).toBeTruthy();
  });

  it('should have required validators', () => {
    const titleControl = component.taskForm.get('title');
    const categoryControl = component.taskForm.get('category');

    expect(titleControl?.hasValidator(Validators.required)).toBeTruthy();
    expect(categoryControl?.hasValidator(Validators.required)).toBeTruthy();
  });

  it('should show error message when form is invalid and submitted', () => {
    component.isFormInvalid = true;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const errorMessage = element.querySelector('.text-danger');
    expect(errorMessage?.textContent).toContain(
      'Todos os campos são obrigatórios'
    );
  });

  it('should not show error message by default', () => {
    const element = fixture.nativeElement;
    const errorMessage = element.querySelector('.text-danger');
    expect(errorMessage).toBeFalsy();
  });

  it('should have predefined categories', () => {
    expect(component.categories.length).toBe(5);
    expect(component.categories).toContainEqual({
      value: 'home',
      viewValue: 'Casa',
    });
  });

  it('should render add button with icon', () => {
    const element = fixture.nativeElement;
    const icon = element.querySelector('[data-test="add-button-icon"]');

    expect(icon).toBeTruthy();
  });

  it('should trigger onAddTask when button is clicked', () => {
    const onAddTaskSpy = jest.spyOn(component, 'onAddTask');
    const element = fixture.nativeElement;
    const addButton = element.querySelector('[data-test="add-button"]');

    addButton.click();

    expect(onAddTaskSpy).toHaveBeenCalled();
  });

  describe('onAddTask', () => {
    it('should not add task when form is invalid', () => {
      component.onAddTask();

      expect(component.isFormInvalid).toBeTruthy();
      expect(taskService.addTask).not.toHaveBeenCalled();
    });

    it('should add task and reset form when form is valid', () => {
      component.taskForm.patchValue({
        title: 'Nova Tarefa',
        category: 'home',
      });

      component.onAddTask();

      expect(taskService.addTask).toHaveBeenCalledWith({
        title: 'Nova Tarefa',
        category: 'home',
      });
      expect(component.isFormInvalid).toBeFalsy();
      expect(component.taskForm.value).toEqual({
        title: null,
        category: null,
      });
    });

    it('should handle empty string values correctly', () => {
      component.taskForm.patchValue({
        title: '',
        category: '',
      });

      component.onAddTask();

      expect(component.isFormInvalid).toBeTruthy();
      expect(taskService.addTask).not.toHaveBeenCalled();
    });
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.taskForm.controls['title'].markAsTouched();
    component.taskForm.controls['category'].markAsTouched();

    expect(component.taskForm.valid).toBeFalsy();
    expect(
      component.taskForm.controls['title'].errors?.['required']
    ).toBeTruthy();
    expect(
      component.taskForm.controls['category'].errors?.['required']
    ).toBeTruthy();
  });
});
