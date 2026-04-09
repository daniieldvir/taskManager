import { Component, computed, inject, model, signal } from '@angular/core';
import { Task } from '../../../models/task.model';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { Status } from '../../../types/status.type';
import { TaskDetailsComponent } from '../../inner-components/task-details/task-details';
import { TaskListComponent } from '../../inner-components/task-list/task-list.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { FilterComponent } from '../../UI/filter/filter.component';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-home-page',
  imports: [
    LoginPageComponent,
    TaskListComponent,
    FilterComponent,
    SidebarComponent,
    TaskDetailsComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly authService = inject(AuthService);
  private readonly tasksService = inject(TaskService);

  private readonly assigneeFilter = signal<string>('ALL');
  private readonly selectedTaskId = signal<number | null>(null);

  public isTaskModelOpen = model<boolean>(false);
  public isEditingTask = signal(false);
  public loggedUser = computed(() => this.authService.loggedUser());
  public tasks = computed(() => this.tasksService.tasks());
  public readonly assigneesForAdd = this.tasksService.pureAssigneeOptions;

  public readonly assigneesForFilter = computed(() => [
    { label: 'All', value: 'ALL' },
    ...this.tasksService.pureAssigneeOptions(),
  ]);

  public filteredTasks = computed(() => {
    const all = this.tasks();
    const filter = this.assigneeFilter();
    if (!all || filter === 'ALL') {
      return all;
    }
    return all.filter((task) => task.assignee === filter);
  });

  public taskForModal = computed(() => {
    const id = this.selectedTaskId();
    const list = this.tasks();
    if (id === null || !list) {
      return null;
    }
    return list.find((t) => t.id === id) ?? null;
  });

  public ngOnInit() {
    if (this.loggedUser() !== null) {
      this.tasksService.loadForCurrentUser();
    }
  }

  public handelFilterTasks(assignee: string) {
    this.assigneeFilter.set(assignee);
  }

  public handleLogout() {
    this.authService.loggedUser.set(null);
  }

  public handelTaskStatusChanged(payload: { taskId: number; newStatus: Status }): void {
    this.tasksService.updateTaskStatus(payload.taskId, payload.newStatus);
  }

  public handelTaskClicked(task: Task) {
    this.selectedTaskId.set(task.id);
    this.isEditingTask.set(false);
    this.isTaskModelOpen.set(true);
  }

  public handelTaskEditClicked(task: Task) {
    this.selectedTaskId.set(task.id);
    this.isEditingTask.set(true);
    this.isTaskModelOpen.set(true);
  }

  public onCommentSubmitted(message: string) {
    const task = this.taskForModal();
    const loggedUser = this.loggedUser();
    if (task && loggedUser) {
      this.tasksService.addComment(task.id, loggedUser.name, loggedUser.userId, message);
    }
  }

  public onTaskSubmitted(newTask: Task) {
    this.tasksService.updateTask(newTask);
    this.isTaskModelOpen.set(false);
  }

  public onQuickAssignToMe(payload: { taskId: number; assignee: string }) {
    const task = this.taskForModal();
    if (!task || task.id !== payload.taskId) return;
    this.tasksService.updateTask({ ...task, assignee: payload.assignee });
  }
}
