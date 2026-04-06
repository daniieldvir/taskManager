import { Component, computed, model, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../../models/task.model';
import { PriorityBadgeComponent } from '../../UI/priority-badge/priority-badge.component';
import { LucideDynamicIcon } from '@lucide/angular';
import { DetailRowComponent } from '../../UI/detail-row/detail-row.component';
import { CommendBoxComponent } from '../../UI/commend-box/commend-box.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    PriorityBadgeComponent,
    DatePipe,
    LucideDynamicIcon,
    DetailRowComponent,
    CommendBoxComponent,
  ],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetailsComponent {
  public isTaskModelOpen = model<boolean>(false);
  public task = input<Task | null>(null);
  public composerAvatarLabel = input<string>('');

  public commentSubmit = output<string>();

  protected tagRowChips = computed(() => {
    const t = this.task();
    if (!t?.tags?.length) {
      return undefined;
    }
    return t.tags.map((data) => ({ data, variant: 'tag-chip' as const }));
  });

  close() {
    this.isTaskModelOpen.set(false);
  }
}
