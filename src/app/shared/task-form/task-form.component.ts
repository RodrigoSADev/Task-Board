import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ITask } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  formBuilder = inject(FormBuilder);
  taskService = inject(TaskService);

  categories = [
    {
      value: 'home',
      viewValue: 'Casa',
    },
    {
      value: 'work',
      viewValue: 'Trabalho',
    },
    {
      value: 'study',
      viewValue: 'Estudo',
    },
    {
      value: 'personal',
      viewValue: 'Pessoal',
    },
    {
      value: 'other',
      viewValue: 'Outros',
    },
  ];
  taskForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  onAddTask() {
    if (this.taskForm.valid) {
      const newTask = {
        title: this.taskForm.value.title || '',
        category: this.taskForm.value.category || '',
      } as ITask;
      this.taskService.addTask(newTask);
      this.taskForm.reset();
    }
  }
}
