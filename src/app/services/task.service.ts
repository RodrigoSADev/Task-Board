import { effect, Injectable, signal } from '@angular/core';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly storageKey = 'tasks';
  tasks = signal<ITask[]>(this.loadTasks());

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks()));
    });
  }

  addTask(newTask: ITask): void {
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  removeTask(title: string, category: string): void {
    this.tasks.update((tasks) =>
      tasks.filter((task) => task.title !== title || task.category !== category)
    );
  }

  toggleTaskCompletion(title: string, category: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.title === title && task.category === category
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  private loadTasks(): ITask[] {
    const storedTasks = localStorage.getItem(this.storageKey);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
}
