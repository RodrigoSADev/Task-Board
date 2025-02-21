import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { RemoveTaskDialogComponent } from './remove-task-dialog.component';

describe('RemoveTaskDialogComponent', () => {
  let component: RemoveTaskDialogComponent;
  let fixture: ComponentFixture<RemoveTaskDialogComponent>;
  let dialogRef: MatDialogRef<RemoveTaskDialogComponent>;

  beforeEach(async () => {
    dialogRef = {
      close: jest.fn(),
    } as unknown as MatDialogRef<RemoveTaskDialogComponent>;

    await TestBed.configureTestingModule({
      imports: [RemoveTaskDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: dialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dialog title', () => {
    const element = fixture.nativeElement;
    const titleElement = element.querySelector('[data-test="dialog-title"]');
    expect(titleElement).toBeTruthy();
  });

  it('should render confirmation message in dialog content', () => {
    const element = fixture.nativeElement;
    const contentElement = element.querySelector(
      '[data-test="dialog-content"]'
    );
    expect(contentElement).toBeTruthy();
  });

  it('should render cancel and confirm buttons', () => {
    const element = fixture.nativeElement;
    const buttons = element.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it('should close dialog with false when cancel button is clicked', () => {
    const element = fixture.nativeElement;
    const cancelButton = element.querySelector('[data-test="cancel-button"]');
    cancelButton?.click();
    expect(dialogRef.close).toHaveBeenCalledWith('');
  });

  it('should close dialog with true when confirm button is clicked', () => {
    const element = fixture.nativeElement;
    const confirmButton = element.querySelector('[data-test="remove-button"]');
    confirmButton?.click();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
