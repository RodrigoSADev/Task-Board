import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-list',
  imports: [MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskService = inject(TaskService);
  dialog = inject(MatDialog);

  tasks = this.taskService.tasks;

  toggleCompletion(title: string, category: string): void {
    this.taskService.toggleTaskCompletion(title, category);
  }

  onEditTask(task: ITask): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '400px',
      data: { ...task },
    });

    dialogRef.afterClosed().subscribe((result: ITask) => {
      if (result) {
        this.taskService.updateTask(task.title, task.category, result);
      }
    });
  }

  onRemoveTask(title: string, category: string): void {
    this.taskService.removeTask(title, category);
  }
}
