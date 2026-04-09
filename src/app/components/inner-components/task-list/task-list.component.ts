import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { TaskListColumn } from '../../../constants/task-list-colums.const';
import { Task } from '../../../models/task.model';
import { Status, StatusEnum } from '../../../types/status.type';
import { AvatarComponent } from '../../UI/avatar/avatar.component';
import { PriorityBadgeComponent } from '../../UI/priority-badge/priority-badge.component';

export interface BoardColumn {
  id: Status;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    LucideDynamicIcon,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    NgClass,
    DatePipe,
    DecimalPipe,
    PriorityBadgeComponent,
    AvatarComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  public tasks = input<Task[] | undefined>(undefined);
  public taskClicked = output<Task>();
  public taskEditClicked = output<Task>();
  public taskStatusChanged = output<{ taskId: number; newStatus: Status }>();

  public columns: BoardColumn[] = TaskListColumn;

  constructor() {
    effect(() => {
      const allTasks = this.tasks();
      if (allTasks) {
        const newCols: BoardColumn[] = TaskListColumn;
        allTasks.forEach((task) => {
          const status = task.status ?? StatusEnum.ToDo;
          let targetCol = newCols.find((c) => c.id === status);
          if (!targetCol) targetCol = newCols[0];
          targetCol.tasks.push(task);
        });
        this.columns = newCols;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id as Status;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.taskStatusChanged.emit({ taskId: task.id, newStatus: newStatus });
    }
  }

  onTaskClick(task: Task) {
    this.taskClicked.emit(task);
  }

  onEdit(task: Task) {
    this.taskEditClicked.emit(task);
  }
}
