import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ITask } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { FilterComponent } from '../filter/filter.component';
import { RemoveTaskDialogComponent } from '../remove-task-dialog/remove-task-dialog.component';

@Component({
  selector: 'app-task-list',
  imports: [MatButtonModule, MatIconModule, FilterComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskService = inject(TaskService);
  dialog = inject(MatDialog);

  tasks = this.taskService.tasks;
  selectedCategory = signal<string>('all');
  filteredTasks = computed(() => {
    if (this.selectedCategory() === 'all') {
      return this.tasks();
    }
    return this.tasks().filter(
      (task) => task.category === this.selectedCategory()
    );
  });

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
    const dialogRef = this.dialog.open(RemoveTaskDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.removeTask(title, category);
      }
    });
  }

  onFilterChange(category: string): void {
    this.selectedCategory.set(category);
  }
}
