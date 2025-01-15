import { Component } from '@angular/core';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';
import { TaskListComponent } from '../../shared/task-list/task-list.component';

@Component({
  selector: 'app-main',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
