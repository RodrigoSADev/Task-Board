import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-edit-task-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss',
})
export class EditTaskDialogComponent {
  formBuilder = inject(FormBuilder);
  editForm!: FormGroup;

  categories = [
    { value: 'home', viewValue: 'Casa' },
    { value: 'work', viewValue: 'Trabalho' },
    { value: 'study', viewValue: 'Estudo' },
    { value: 'personal', viewValue: 'Pessoal' },
    { value: 'other', viewValue: 'Outros' },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITask) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      title: [this.data.title, [Validators.required]],
      category: [this.data.category, [Validators.required]],
    });
  }
}
