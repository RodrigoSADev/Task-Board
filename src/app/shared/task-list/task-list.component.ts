import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskService = inject(TaskService);

  tasks = this.taskService.tasks;

  onRemoveTask(title: string, category: string) {
    this.taskService.removeTask(title, category);
  }
}
