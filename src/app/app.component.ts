import { Component } from '@angular/core';
import { TaskFormComponent } from './shared/task-form/task-form.component';
import { TaskListComponent } from './shared/task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
