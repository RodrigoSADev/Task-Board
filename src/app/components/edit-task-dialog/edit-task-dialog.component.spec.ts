import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EditTaskDialogComponent } from './edit-task-dialog.component';

describe('EditTaskDialogComponent', () => {
  let component: EditTaskDialogComponent;
  let fixture: ComponentFixture<EditTaskDialogComponent>;
  let mockDialogData = {
    id: '1',
    title: 'Test Task',
    category: 'home',
    done: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskDialogComponent],
      providers: [
        provideAnimations(),
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dialog title correctly', () => {
    const element = fixture.nativeElement;
    const title = element.querySelector('[data-test="dialog-title"]');
    expect(title.textContent).toBe('Editar Tarefa');
  });

  it('should render form fields with correct labels', () => {
    const element = fixture.nativeElement;
    const taskFormField = element.querySelector(
      '[data-test="task-form-field"]'
    );
    const categoryFormField = element.querySelector(
      '[data-test="category-form-field"]'
    );
    expect(taskFormField).toBeTruthy();
    expect(categoryFormField).toBeTruthy();
    expect(taskFormField.textContent).toBe('Tarefa');
    expect(categoryFormField.textContent).toBe('Categoria');
  });

  it('should render input field with initial value', () => {
    const element = fixture.nativeElement;
    const titleInput = element.querySelector('[data-test="task-input"]');
    expect(titleInput.value).toBe('Test Task');
  });

  it('should render buttons correctly', () => {
    const element = fixture.nativeElement;
    const cancelButton = element.querySelector('[data-test="cancel-button"]');
    const saveButton = element.querySelector('[data-test="save-button"]');
    expect(cancelButton).toBeTruthy();
    expect(saveButton).toBeTruthy();
  });

  it('should initialize the form with data from dialog', () => {
    expect(component.editForm.get('title')?.value).toBe('Test Task');
    expect(component.editForm.get('category')?.value).toBe('home');
  });

  it('should have required validators', () => {
    const titleControl = component.editForm.get('title');
    const categoryControl = component.editForm.get('category');

    titleControl?.setValue('');
    categoryControl?.setValue('');

    expect(titleControl?.errors?.['required']).toBeTruthy();
    expect(categoryControl?.errors?.['required']).toBeTruthy();
  });

  it('should update form value when title input changes', () => {
    const element = fixture.nativeElement;
    const titleInput = element.querySelector('[data-test="task-input"]');
    titleInput.value = 'New Task Title';
    titleInput.dispatchEvent(new Event('input'));

    expect(component.editForm.get('title')?.value).toBe('New Task Title');
  });

  it('should have valid form when all fields are filled', () => {
    component.editForm.patchValue({
      title: 'New Task',
      category: 'work',
    });

    expect(component.editForm.valid).toBeTruthy();
  });

  it('should have predefined categories', () => {
    expect(component.categories).toHaveLength(5);
    expect(component.categories).toContainEqual({
      value: 'home',
      viewValue: 'Casa',
    });
    expect(component.categories).toContainEqual({
      value: 'work',
      viewValue: 'Trabalho',
    });
  });
});
