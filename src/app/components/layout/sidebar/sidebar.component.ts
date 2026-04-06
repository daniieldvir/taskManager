import { Component, computed, input, output } from '@angular/core';
import { Task } from '../../../models/task.model';
import { User } from '../../../models/user.model';
import { StatusEnum } from '../../../types/status.type';
import { AvatarComponent } from '../../UI/avatar/avatar.component';
import { LucideDynamicIcon } from '@lucide/angular';
import { StatsCardComponent } from '../../UI/stats-card/stats-card.component';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarComponent, StatsCardComponent, LucideDynamicIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public currentUser = input<User | null>(null);
  public tasks = input<Task[] | undefined>(undefined);
  readonly logOutClicked = output<void>();

  public StatusEnum = StatusEnum;

  public openCount = computed(() => {
    const taskForUser = this.tasks()?.filter((task) => task.assignee === this.currentUser()?.name);
    return taskForUser?.filter((t: Task) => t.status === StatusEnum.ToDo).length ?? 0;
  });

  public inProgressCount = computed(() => {
    const taskForUser = this.tasks()?.filter((task) => task.assignee === this.currentUser()?.name);
    return taskForUser?.filter((t: Task) => t.status === StatusEnum.InProgress).length ?? 0;
  });

  public doneCount = computed(() => {
    const taskForUser = this.tasks()?.filter((task) => task.assignee === this.currentUser()?.name);
    return taskForUser?.filter((t: Task) => t.status === StatusEnum.Done).length ?? 0;
  });

  protected handleLogOut(): void {
    this.logOutClicked.emit();
  }
}
