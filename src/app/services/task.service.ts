import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { Status } from '../types/status.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  public tasks = signal<Task[] | undefined>(undefined);
  public assigneeOptions = computed(() => {
    const tasks = this.tasks();
    if (!tasks) return [{ label: 'All', value: 'ALL' }];

    const allAssignees = tasks.map((task) => task.assignee);
    const uniqueNames = [...new Set(allAssignees)].filter((name) => !!name).sort();
    return [
      { label: 'All', value: 'ALL' },
      ...uniqueNames.map((name) => ({ label: name, value: name })),
    ];
  });

  loadForCurrentUser(): void {
    const user = this.authService.currentUser();
    if (user === null) {
      return;
    }

    this.http.get<Task[]>('assets/data/tasks.json').subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  updateTaskStatus(taskId: number, newStatus: Status): void {
    this.tasks.update((currentTasks) => {
      if (!currentTasks) return undefined;

      return currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
    });
  }

  addComment(taskId: number, author: string, userId: string, comment: string): void {
    this.tasks.update((currentTasks) => {
      if (!currentTasks) return undefined;

      return currentTasks.map((task) => {
        if (task.id === taskId) {
          const newComment = {
            author,
            userId,
            comment,
            createdAt: new Date().toISOString(),
          };
          return {
            ...task,
            comments: [newComment, ...(task.comments || [])],
          };
        }
        return task;
      });
    });
  }
}

