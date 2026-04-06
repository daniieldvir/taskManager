import { Component, computed, inject, model, signal } from '@angular/core';
import { Task } from '../../../models/task.model';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { Status } from '../../../types/status.type';
import { TaskListComponent } from '../../inner-components/task-list/task-list.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { FilterComponent } from '../../UI/filter/filter.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { TaskDetailsComponent } from "../../inner-components/task-details/task-details";

@Component({
  selector: 'app-home-page',
  imports: [LoginPageComponent, TaskListComponent, FilterComponent, SidebarComponent, TaskDetailsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly authService = inject(AuthService);
  private readonly tasksService = inject(TaskService);
  private readonly assigneeFilter = signal<string>('ALL');

  public currentUser = computed(() => this.authService.currentUser());
  public tasks = computed(() => this.tasksService.tasks());
  public assigneeOptions = computed(() => this.tasksService.assigneeOptions());

  public filteredTasks = computed(() => {
    const all = this.tasks();
    const filter = this.assigneeFilter();
    if (!all || filter === 'ALL') {
      return all;
    }
    return all.filter((task) => task.assignee === filter);
  });

  public isTaskModelOpen = model<boolean>(false);
  private readonly selectedTaskId = signal<number | null>(null);

  public taskForModal = computed(() => {
    const id = this.selectedTaskId();
    const list = this.tasks();
    if (id === null || !list) {
      return null;
    }
    return list.find((t) => t.id === id) ?? null;
  });

  ngOnInit() {
    if (this.currentUser() !== null) {
      this.tasksService.loadForCurrentUser();
    }
  }

  public handelFilterTasks(assignee: string) {
    this.assigneeFilter.set(assignee);
  }

  public handleLogout() {
    this.authService.currentUser.set(null);
  }

  handelTaskStatusChanged(payload: { taskId: number; newStatus: Status }): void {
    this.tasksService.updateTaskStatus(payload.taskId, payload.newStatus);
  }

  handelTaskClicked(task: Task) {
    this.selectedTaskId.set(task.id);
    this.isTaskModelOpen.set(true);
  }

  onCommentSubmitted(message: string) {
    const task = this.taskForModal();
    const user = this.currentUser();
    if (task && user) {
      this.tasksService.addComment(task.id, user.name, user.userId, message);
    }
  }
}
