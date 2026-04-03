import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { TaskListComponent } from '../../inner-components/task-list/task-list.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { FilterComponent } from '../../UI/filter/filter.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Status } from '../../../types/status.type';

@Component({
  selector: 'app-home-page',
  imports: [LoginPageComponent, TaskListComponent, FilterComponent, SidebarComponent],
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
}
